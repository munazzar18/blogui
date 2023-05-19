import React from 'react'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';


const NavBar = () => {

    const { onLogout } = useContext(AuthContext);
     
  return (
    <>
  <div className="navbar bg-neutral text-neutral-content ">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            Blog UI
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>

  )
}

export default NavBar