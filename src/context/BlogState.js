import BlogContext from '../context/BlogContext'
import { useState, useContext } from "react";
import AuthContext from '../context/AuthContext';

  const BlogState = (props) => {
    const host = 'http://localhost:3500';
    const blogsInitial = [];
    const [blogs, setBlogs] = useState(blogsInitial);
    const { token } = useContext(AuthContext);
  
    // Get all Blogs
    const getBlogs = async () => {
      // API CALL
      const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      setBlogs(json);
    };
  
    // Add a Blog
    const addBlog = async (title, description) => {
      // API CALL
      const response = await fetch(`${host}/api/blogs/addblog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ title, description }),
      });
      const blog = await response.json();
      
      setBlogs(blogs.concat(blog));
    };
  
    // Delete a blog
    const deleteBlog = async (id) => {
      // API CALL
      const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = response.json();
      const delBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(delBlogs);
    };
  
    // Edit a blog
    const editBlog = async (id, title, description) => {
      // API CALL
      const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ title, description }),
      });
      const json = await response.json();
      let newBlogs = JSON.parse(JSON.stringify(blogs));
      // Login to edit in Client
      for (let index = 0; index < newBlogs.length; index++) {
        const element = newBlogs[index];
        if (element._id === id) {
          newBlogs[index].title = title;
          newBlogs[index].description = description;
          break;
        }
      }
      setBlogs(newBlogs);
    };
  
    return (
      <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, editBlog, getBlogs }}>
        {props.children}
      </BlogContext.Provider>
    );
  };
  
  export default BlogState;
  