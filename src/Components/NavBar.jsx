import React from 'react'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const { token } = useContext(AuthContext);
    const { onLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const  handleBlog = () => {
      if(token){
        navigate('/MyBlogs') 
      } else {
        navigate('/login')
      }
    }
    const  HandleAddBlog  = () => {
      if (token){
        navigate('/AddBlog')
      } else {
        navigate('/login')
      }
    }
     
  return (
    <>
  <div className="navbar bg-neutral text-neutral-content ">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            Blog UI
          </a>
        </div>
        <div className="flex-none">
        <a className="btn" onClick={HandleAddBlog}>Add Blog</a>
        </div>
        <div className="flex-none">
        <a className="btn" onClick={handleBlog} >My Blogs</a>
        </div>
        <div className="flex-none">
          {token?<button className="btn" onClick={onLogout}>Log Out</button>:
          <button className="btn" onClick={onLogout}></button>
          }
        </div>
       
       </div>
    </>

  )
}

export default NavBar