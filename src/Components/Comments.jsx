import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router'


const Comments = () => {

    const {blogId} = useParams();
    const { token } = useContext(AuthContext);
    const [comments, setComments] = useState(null);

    const getComments = async (blogId) => {
    
        const host = 'http://localhost:3500';
    
        //API CALL 
        const response = await fetch(`${host}/api/blogs/${blogId}/comments`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'auth-token' : token
            }
          });
          const json = await response.json();
          console.log(json)
          setComments(json);
        }

    useEffect(() => {
        getComments(blogId)
   }, [token]);


  return (
    <div>
        <ul>
        {/* {comments.map((comment) => (
      <li key={comment._id} comment={comment} value={comment.content}>{comment.content}</li>
    ))} */}
        </ul>
    </div>
  )
}

export default Comments