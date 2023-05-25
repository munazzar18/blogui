import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const { onLogin, token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    const success = onLogin(email, password);
    if (!success) {
      props.showAlert("Invalid email or password", "error");
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 1500);
    }
  };

  // If user is already logged in, redirect to another page
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="label">
                  <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
