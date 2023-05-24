import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import AuthContext from '../context/AuthContext';


const getBlog = async (blogId, token) => {
    const host = 'http://localhost:3500';
    // API CALL
    const response = await fetch(`${host}/api/blogs/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
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
        if (token) {
           getBlog(blogId, token).then(setBlog);
        
        } else {
          navigate('/login');
        }
      }, [token]);


  return (
    <div>
        {blog && <div>{blog.title}</div>}
    </div>
  )
}

export default OneBlog