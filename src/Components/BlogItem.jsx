import React, {useContext} from 'react'
import BlogContext from '../context/BlogContext';


const BlogItem = (props) => {
    
    const context = useContext(BlogContext);
    const {deleteBlog} = context;
    const {blog, updateBlog } = props;
    return (
       
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
            <div className="card-actions justify-end">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text"> {blog.description} </p>
                <button className="btn btn-outline btn-error" onClick={()=>{updateBlog(blog); props.showAlert("Updated Successfully", "success");}}>Update Blog</button>
                <button className="btn btn-outline btn-error" onClick={()=>{deleteBlog(blog._id); props.showAlert("Deleted Successfully" , "success");}}>Delete Blog</button>
            </div>
            </div>
        </div>
        
    )
}


export default BlogItem



  

