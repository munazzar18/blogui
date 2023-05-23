import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../context/BlogContext';
import AddBlog from './AddBlog';
import BlogItem from './BlogItem';
import AuthContext from '../context/AuthContext';

const Blogs = (props) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { blogs, getBlogs, editBlog } = useContext(BlogContext);

  useEffect(() => {
    if (token) {
      getBlogs();
    } else {
      navigate('/login');
    }
  }, [token]);

  const [blog, setBlog] = useState({
    id: '',
    etitle: '',
    edescription: '',
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateBlog = (currentBlog) => {
    ref.current.click();
    setBlog({
      id: currentBlog._id,
      etitle: currentBlog.title,
      edescription: currentBlog.description,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editBlog(blog.id, blog.etitle, blog.edescription, blog.etag);
    refClose.current.click();
    props.showAlert('Updated Successfully', 'success');
  };

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddBlog showAlert={props.showAlert} />
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


      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Blogs</h2>
          {blogs ? (
            blogs.map((blog) => <BlogItem key={blog._id} blog={blog} updateBlog={updateBlog} showAlert={props.showAlert} />)
          ) : (
            <p>No blogs to display</p>
          )}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
