import './App.css'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Movie from "./pages/Movie/Movie";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
      if(!currentUser) {
        return <Navigate to="/login" />
      }
      return children
    }

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute children={<Home/>} /> 
            } />
            <Route path='/movie:id' element={
              <ProtectedRoute  children={<Movie/>} />
            } />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
