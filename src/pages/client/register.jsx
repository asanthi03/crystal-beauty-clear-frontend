import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleRegister() {
        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        // Prepare data for API (excluding confirmPassword)
        const { confirmPassword, ...userData } = formData;

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", userData)
            .then((response) => {
                console.log("Registration Successful", response.data);
                toast.success("Registration Successful");
                localStorage.setItem("token", response.data.token);
                navigate("/");
                setLoading(false);
            })
            .catch((error) => {
                console.log("Registration Failed", error);
                toast.error(error.response?.data?.message || "Registration Failed");
                setLoading(false);
            });
    }

    return (
        <div className="w-full h-screen bg-red-900 bg-[url(/login-bg.jpg)] bg-center bg-cover flex">
            <div className="w-[50%] h-full border border-amber-900"></div>

            <div className="w-[50%] h-full border border-amber-500 flex justify-center items-center">
                <div className="w-[450px] h-[650px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-white text-2xl font-bold mb-6">Create Your Account</h2>

                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="First Name"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Last Name"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Phone Number"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3"
                    />

                    <button
                        onClick={handleRegister}
                        className="w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Register"}
                    </button>
                    <button onClick={loginWithGoogle} className="mt-[20px] w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer flex items-center justify-center">
                        <GrGoogle className="mr-[10px]" />
                        {
                            loading ? "Loading..." : "Login with Google"
                        }
                    </button>

                    <p className="text-white">
                        Already have an account?
                        &nbsp;
                        <span className="text-green-400 font-bold hover:text-shadow-yellow-300">
                            <Link to={"/login"}>Login Here</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}