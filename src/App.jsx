import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AuthProvider from "./Components/AuthProvider";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import NavBar from "./Components/NavBar";
import { useState } from "react";
import Alert from "./Components/Alert"
import BlogState from "./context/BlogState";
import AddBlog from "./Components/AddBlog";
import MyBlogs from "./Components/MyBlogs";
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import CategoryState from "./context/CategoryState"

function App() {
  const [alert, setAlert] = useState(null);

const showAlert = (message, type)=> {
 setAlert({
   msg : message,
   type : type
 })
 setTimeout( ()=> {
   setAlert(null);
 }, 1500);
}
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogState>
          <CategoryState>
      <NavBar/>
      <Alert alert={alert}/>
        <Routes>
          <Route path="/" element= {<ProtectedRoute><Home showAlert={showAlert} /></ProtectedRoute>} />
          <Route path="/AddBlog" element= {<ProtectedRoute>< AddBlog showAlert={showAlert} /></ProtectedRoute>} />
          <Route path="/MyBlogs" element= {<ProtectedRoute><MyBlogs showAlert={showAlert} /></ProtectedRoute>} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
        </Routes>
        </CategoryState>
        </BlogState>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
