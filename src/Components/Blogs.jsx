import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../context/BlogContext';
import AuthContext from '../context/AuthContext';
import CategoryContext from '../context/CategoryContext';

const Blogs = (props) => {
  const { token } = useContext(AuthContext);
  const { categories, getCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const { blogs, getBlogs, editBlog, deleteBlog } = useContext(BlogContext);

  useEffect(() => {
    if (token) {
       getBlogs();
       getCategory()
    } else {
      navigate('/login');
    }
  }, [token]);

  const [blog, setBlog] = useState({
    id: '',
    etitle: '',
    edescription: '',
    ecategory:""
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateBlog = (currentBlog) => {
    ref.current.click();
    setBlog({
      id: currentBlog._id,
      etitle: currentBlog.title,
      edescription: currentBlog.description
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editBlog(blog.id, blog.etitle, blog.edescription);
    refClose.current.click();
    props.showAlert('Updated Successfully', 'success');
  };

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  return (
    <>
      
{/* The button to open modal */}

<label htmlFor="my-modal-3" ref={ref} ></label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" ref={refClose}>✕</label>
    

    <div className="form-control w-full max-w-xs">
    
    <label className="label" htmlFor="etitle">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={blog.etitle}
                onChange={onChange}
                id="etitle"
                name="etitle"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label"></label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="edescription">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                value={blog.edescription}
                onChange={onChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                id="edescription"
                name="edescription"
              />
              <label className="label"></label>
              <button className="btn btn-wide" onClick={handleClick} ref={refClose} >Update</button>
            </div>
  </div>
</div>

      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} blog={blog} updateBlog={updateBlog} showAlert={props.showAlert} className="flex max-w-xl flex-col items-start justify-between">
            {/* <BlogItem  key={blog.id} blog={blog} updateBlog={updateBlog} showAlert={props.showAlert} /> */}
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={blog.datetime} className="text-gray-500">
                  {blog.date}
                </time>
                <label
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {blog.category[0].content}
                  {/* {category(blog)} */}
                </label>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={"/MyBlogs/" + blog._id}>
                    <span className="absolute inset-0" />
                    {blog.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <button className="btn" onClick={() => { updateBlog(blog); }}>
                      <span className="absolute inset-0" />
                      Edit
                      {blog.updateBlog}
                    </button>
                  </p>
                  <button className="my-2 btn" onClick={() => { deleteBlog(blog._id); }}>
                    Delete
                      <span className="absolute inset-0" />
                      {blog.deleteBlog}
                    </button>
                </div>
              </div>
              </article>
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default Blogs;
