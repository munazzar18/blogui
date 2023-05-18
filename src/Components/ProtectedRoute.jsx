import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("token", token)
        if (!token) {
            navigate('/login')
        }      
    }, [token])
    

    return children;
};

export default ProtectedRoute;