
import { useContext, useState } from "react";
import AuthContext from './AuthContext';
import CategoryContext from './CategoryContext'


  const CategoryState = (props) => {

    const CategoryInitial = [];
    const [categories, setCategories] = useState(CategoryInitial);


    const host = 'http://localhost:3500';    
    const { token } = useContext(AuthContext);
  
    // Get all categories
    const getCategory = async () => {
      // API CALL
      const response = await fetch(`${host}/api/category/allcategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      setCategories(json);
    }
    return (
        <CategoryContext.Provider value={{ categories, getCategory }}>
          {props.children}
        </CategoryContext.Provider>
      );
}


export default CategoryState

