import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import AuthContext from '../context/AuthContext';


const getBlog = async (blogId) => {
    const host = 'http://localhost:3500';
    // API CALL
    const response = await fetch(`${host}/api/blogs/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    return json;
  };

const OneBlog = () => {
    const {blogId} = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
           getBlog(blogId).then(setBlog)
      }, []);


  return (
    
        
        <div className="grid place-items-start ml-20 mr-10">
        <span className="font-semibold mt-4 underline" >Title</span> 
        <div>
        <h1 className="text-7xl font-bold">{blog && <div>{blog.title}</div>}</h1>
        </div>

        <div className="py-2 mt-4">
        <span className="font-semibold my-2 underline "> Description</span>
        <p className="text-xl text-justify	">{blog && <div> {blog.description} </div> } </p>
        {token?
        <input type="text" placeholder="Comment" className="my-4 input input-bordered w-full max-w-xs" />
        : <p>Please login to comment</p>}
        </div>
        </div>
   
  )
}

export default OneBlog