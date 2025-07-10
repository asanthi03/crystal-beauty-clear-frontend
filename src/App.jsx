import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/adminPage';
import LoginPage from "./pages/loginPage";
import Testing from './pages/testing';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/client/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  return (
    <GoogleOAuthProvider clientId="723274571932-1atrr54s32k0l24t09p5uutu8esni67t.apps.googleusercontent.com">
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
    </GoogleOAuthProvider>
  )
}

export default App
