import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaS } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const loginWithGoogle = useGoogleLogin(
        {
            onSuccess: (res) => {
                setLoading(true)
                // Remove quotes around the environment variable
                axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token
                }).then(
                    (response) => {
                        console.log("Login Successful", response.data);
                        toast.success("Login Successful")
                        localStorage.setItem("token", response.data.token)

                        const user = response.data.user;
                        if (user.role == "admin") {
                            navigate("/admin")
                        } else {
                            navigate("/")
                        }
                        setLoading(false)
                    }
                ).catch(error => {
                    console.error("Error:", error);
                });
            }
        }
    )

    function handleLogin() {
        setLoading(true)


        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login Successful", response.data);
                toast.success("Login Successful")
                localStorage.setItem("token", response.data.token)

                const user = response.data.user;
                if (user.role == "admin") {
                    navigate("/admin")
                } else {
                    navigate("/")
                }
                setLoading(false)
            }
        ).catch(
            (error) => {
                console.log("Login Failed", error);
                toast.error(error.data.message && "Login Unsuccessful")
                setLoading(false)
            }
        )

        console.log("Login button clicked");
    }


    return (
        <div className="w-full h-screen bg-red-900 bg-[url(/login-bg.jpg)] bg-center bg-cover flex">
            <div className=" w-[50%] h-full border border-amber-900">

            </div>
            <div className="w-[50%] h-full border border-amber-500 flex justify-center items-center">
                <div className="w-[450px] h-[550px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }
                        } type="email" placeholder="email" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder="password" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                    <button onClick={handleLogin} className="w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer">
                        {
                            loading ? "Loading..." : "Login"
                        }
                    </button>
                    <button onClick={loginWithGoogle} className="mt-[20px] w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer flex items-center justify-center">
                        <GrGoogle className="mr-[10px]" />
                        {
                            loading ? "Loading..." : "Login with Google"
                        }
                    </button>
                    <p className="text-white">
                        Don't have an account yet?
                        &nbsp;
                        <span className="text-green-400 font-bold hover:text-shadow-yellow-300">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </p>

{/* checking 3  */}
                </div>
            </div>
        </div>
    )
}