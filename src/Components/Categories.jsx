import {React , useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CategoryContext from '../context/CategoryContext';


const Categories = () => {

    const {categories, getCategory } = useContext(CategoryContext);
    const { token } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
           getCategory();
        } else {
          navigate('/login');
        }
      }, [token]);


  return (
    <div>
           {categories.map((category) => (
      <li key={category._id}>{category.content}</li>
    ))}
    </div>
  )
}

export default Categories