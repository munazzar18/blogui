import React, { useState, useContext, useEffect } from 'react';
import BlogContext from '../context/BlogContext';
import CategoryContext from '../context/CategoryContext';

const AddBlog = (props) => {
  const { addBlog } = useContext(BlogContext);
  const { categories, getCategory } = useContext(CategoryContext);
  const [blog, setBlog] = useState({
    title: '',
    description: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  // eslint-disable-next-line
  useEffect(() => {
    getCategory(); // Fetch categories when the component mounts
  }, []);  // eslint-disable-next-line

  const handleClick = (e) => {
    e.preventDefault();
    addBlog(blog.title, blog.description, selectedCategory);
    setBlog({
      title: '',
      description: '',
    });
    setSelectedCategory("");
    props.showAlert('Added Successfully', 'success');
  };

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const onDrop = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <h1 className="flex justify-center my-3 text-3xl font-bold">Add a Blog</h1>
     
      <div className="flex justify-center">
      <select
        className="select select-primary w-full max-w-xs"
        value={selectedCategory}
        onChange={onDrop}
        id="category"
        name="category"
        >
    <option disabled value="">Pick a category</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>{category.content}</option>
    ))}
  </select>
</div>

      <div className="flex flex-row justify-center flex-wrap form-control my-3 items-center">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          onChange={onChange}
          id="title"
          value={blog.title}
          name="title"
          minLength={3}
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      <div className="flex flex-row justify-center form-control my-3 items-center">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          onChange={onChange}
          id="description"
          value={blog.description}
          name="description"
          minLength={5}
          placeholder="Description"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs textarea-primary"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          disabled={blog.title.length < 3 || blog.description.length < 5}
          onClick={handleClick}
          className="btn btn-wide my-3"
        >
          Add Blog
        </button>
      </div>
    </>
  );
};

export default AddBlog;
