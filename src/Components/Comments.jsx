import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Comments = () => {
    const { token } = useContext(AuthContext);
    let {blogId} = useParams();
    const [comments, setComments] = useState([]);
    const host = 'http://localhost:3500';

    const getComments = async (blogId) => {
      try {
        
        const response = await fetch(`${host}/api/blogs/${blogId}/comments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
  
        return json;
      } catch (err) {
        console.log(err.message);
        throw new Error("Failed to fetch comments");
      }
    };

     // Delete a comment
     const deleteComment = async (blogId, id) => {
      // API CALL
      const response = await fetch(`${host}/api/blogs/${blogId}/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json();
      const delComment = comments.filter((comment) => comment._id !== id);
      setComments(delComment);
    };

    useEffect(() => {
        getComments(blogId).then(setComments)
   }, [blogId]);


  return (
    <div>
        
        {comments.map((comment) => (
          <div className="alert my-4 shadow-lg bg-blend-lighten"  key={comment._id}>{comment.content}
           <button className="btn btn-circle btn-outline" onClick={()=>{deleteComment(blogId,  comment._id)}} >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
         </div>
        ))}
      
    </div>
  )
}

export default Comments