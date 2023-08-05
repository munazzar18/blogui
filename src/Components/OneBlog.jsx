import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import AuthContext from '../context/AuthContext';
import Comments from './Comments';


const getBlog = async (blogId) => {
    const host = 'https://blogui-server.vercel.app';
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
    const [blog, setBlog] = useState(null);
    const initialComment = { content: '' };
    let [comment , setComment] = useState(initialComment);
    let [refetch, setRefetch]  = useState(false);
    const navigate = useNavigate();

    const host = 'https://blogui-server.vercel.app';
    const createComment = async ( content, blogId) => {
      //api call
      const response = await fetch(`${host}/api/blogs/${blogId}/comments`, {
        
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
            body: JSON.stringify({ content }),
          });
          const newComment = await response.json();
          
           setComment(newComment);
        };  

        const handleClick = async (e) => {
          e.preventDefault();
          await createComment(comment.content, blogId);
          setComment({content: ''});
          setRefetch(!refetch);
        };

      const onChange = (e) => {
          setComment({ ...comment, [e.target.name]: e.target.value });
        };

    useEffect(() => {
           getBlog(blogId).then(setBlog)
      }, [blogId]);


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
        <input type="text" 
        value={comment.content}
        onChange={onChange}
        id="content"
        name="content" placeholder="Comment" className="my-4 input input-bordered w-full max-w-xs" />
        : <p>Please login to comment</p>}
        <div>
          <button className='btn btn-outline' onClick={handleClick} >Add Comment</button>
        </div>
        </div>
       
        <Comments refetch={refetch} blogId={blogId}  Comments={comment} /> 
        </div>
   
  )
}

export default OneBlog