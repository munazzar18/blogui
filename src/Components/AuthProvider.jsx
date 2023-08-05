import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';

const host = 'https://blogui-server.vercel.app';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(`${host}/api/auth/login`, requestOptions);
      if (!response.ok) {
        throw new Error('Authentication failed.');
      }

      const data = await response.json();
      const authToken = data.authToken;
      setToken(authToken);
      navigate('/');
    } catch (error) {
      console.log('Login failed:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
      setToken(null)
      navigate('/login');

  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
