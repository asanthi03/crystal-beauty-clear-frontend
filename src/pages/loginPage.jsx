import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        console.log("Email: " , email);
        console.log("Password: " , password);


        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log("Login Successful", response.data);
                toast.success("Login Successful")
                localStorage.setItem("token" , response.data.token)

                const user = response.data.user;
                if(user.role == "admin"){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
            }
        ).catch(
            (error)=>{
                console.log("Login Failed", error);
                // toast.error(error.data.message || "Login Unsuccessful")
            }
        ) //menna

        console.log("Login button clicked");
    }


    return(
        <div className="w-full h-screen bg-red-900 bg-[url(/login-bg.jpg)] bg-center bg-cover flex">
        <div className=" w-[50%] h-full border border-amber-900">

        </div>
        <div className= "w-[50%] h-full border border-amber-500 flex justify-center items-center">
            <div className="w-[450px] h-[550px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                <input
                onChange={(e)=>{
                    setEmail(e.target.value);
                }
                } type="email" placeholder="email" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                <input onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder="password" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                <button onClick={handleLogin} className="w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer">Login Here</button>

            </div>
        </div>
        </div>
    )
}