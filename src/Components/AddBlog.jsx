import React,{ useState, useContext } from 'react'
import BlogContext from '../context/BlogContext';

const AddBlog = (props) => {

    

    const {addBlog} = useContext(BlogContext);

    const [blog, setBlogs] = useState({
        title:"",
        description:""
    })

    const handleClick = (e) => {
        e.preventDefault();
        addBlog(blog.title, blog.description);
        setBlogs({
            title:"",
            description:""
        })
        props.showAlert("Added Successfully" , "success");
    }

    const onChange = (e) => {
        setBlogs({...blog,[e.target.name] : e.target.value})
    }

    
    return (
  
<>
<div className="form-control w-full max-w-xs">
<h1 className="my-3">Add a Blog</h1>
<label className="label">
  <span className="label-text">Title</span>
</label>
<input type="text" onChange={onChange} id="title" value={blog.title} name="title" minLength={3} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
</div>

<div className="form-control w-full max-w-xs">
<label className="label">
  <span className="label-text">Description</span>
</label>
<textarea onChange={onChange} id="description" value={blog.description} name="description" minLength={5} placeholder="Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs textarea-primary" ></textarea>
</div>
 <button disabled={blog.title.length<3 || blog.description.length<5} onClick={handleClick} className="btn btn-wide my-3">Add Blog</button>
 </>


    )
}

export default AddBlog
