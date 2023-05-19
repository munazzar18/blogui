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


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <NavBar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
