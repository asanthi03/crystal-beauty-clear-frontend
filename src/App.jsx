import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/adminPage';
import LoginPage from "./pages/loginPage";
import Testing from './pages/testing';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/client/homePage';


function App() {
  return (
    <BrowserRouter>
    <Toaster position = "top-right"/>
    <Routes path="/*">
      <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/testing" element={<Testing/>}/> 
      <Route path="/*" element={<HomePage/>}/> 
      {/* <Route path="/*" element={<h1>404 Not Found</h1>}/> */}


    </Routes>

    </BrowserRouter>
  )
}

export default App
