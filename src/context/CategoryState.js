
import { useState } from "react";
import CategoryContext from './CategoryContext'


  const CategoryState = (props) => {

    const CategoryInitial = [];
    const [categories, setCategories] = useState(CategoryInitial);


    const host = 'https://blogui-server.vercel.app';    
  
    // Get all categories
    const getCategory = async () => {
      // API CALL
      const response = await fetch(`${host}/api/category/allcategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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

