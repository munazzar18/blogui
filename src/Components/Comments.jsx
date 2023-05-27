import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'


const Comments = () => {

    const {blogId} = useParams();
    const [comments, setComments] = useState([]);

    console.log(comments)

    const getComments = async (blogId) => {
    
        const host = 'http://localhost:3500';
    
        //API CALL 
        const response = await fetch(`${host}/api/blogs/${blogId}/comments`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          return json;
        }

    useEffect(() => {
        getComments(blogId).then(setComments)
   }, [blogId]);


 

  return (
    <div>
        
        {comments.map((comment) => (
          <div className="alert my-4 shadow-lg bg-blend-lighten"  key={comment._id}>{comment.content}
         </div>
        ))}
      
    </div>
  )
}

export default Comments