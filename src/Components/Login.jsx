import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
    const { onLogin } = useContext(AuthContext);

    return (
        <>
            <div className='mt-16 flex justify-center items-center'>
                <input type="text" placeholder="Enter your Email" className="input input-bordered input-warning w-full max-w-xs" />
            </div>
            <div className='mt-2 flex justify-center items-center'>
                <input type="text" placeholder="Enter your Password" className="input input-bordered input-warning w-full max-w-xs" />
            </div>
            <div className='mt-2 flex justify-center items-center'>
                <button className="btn btn-outline btn-warning" onClick={onLogin}>Login</button>
            </div>
        </>
    )
}

export default Login