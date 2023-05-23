import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            
            navigate('/login')
        }     
        //eslint-disable-next-line 
    }, [token]) 
    

    return children;
};

export default ProtectedRoute;