import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { FaUsers, FaStore, FaFileInvoice } from "react-icons/fa"
import AdminProductsPage from "./admin/products"
import AddProductForm from "./admin/addProductForm"
import EditProductForm from "./admin/editProductForm"
import AdminOrdersPage from "./admin/adminOrders"
import { useEffect, useState } from "react"
import Loader from "../components/loader"
import axios from "axios"
import toast from "react-hot-toast"

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token == null){
      toast.error("You are not logged in");
      navigate("/login");
    }else{
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
        header : {
          Authorization : "Bearer " + token,
        },
      }).then((response) =>{
        if(response.data.user.role == "admin"){
          setUserValidated(true);
        }else{
          toast.error("You are not an admin");
          navigate("/login");
        }
      })
    }
  }),[]

  return (
    <div className="w-full h-screen bg-gray-300 flex">
      {userValidated ? (
        <>
          <div className="w-[300px] h-full bg-black">
            <Link to="/admin" className="flex justify-center items-center w-[80%] h-[40px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 hover:bg-orange-500">
              Dashboard
            </Link>
            <Link to="/admin/users" className="flex justify-center items-center w-[80%] h-[40px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 hover:bg-orange-500">
              <FaUsers className="m-2" />Users
            </Link>
            <Link to="/admin/products" className="flex justify-center items-center w-[80%] h-[40px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 hover:bg-orange-500">
              <FaStore className="m-2" />Products
            </Link>
            <Link to="/admin/orders" className="flex justify-center items-center w-[80%] h-[40px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 hover:bg-orange-500">
              <FaFileInvoice className="m-2" />Orders
            </Link>
          </div>
          {/* /Checking */}
          <div className="h-full bg-amber-50 w-[calc(100%-300px)] rounded-xl p-2">
            <Routes>
              <Route path="/users" element={<h1>Users</h1>} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/addProducts" element={<AddProductForm />} />
              <Route path="/editProducts" element={<EditProductForm />} />
            </Routes>
          </div>
        </>
      ) : (<Loader />
      )}
    </div>
  )
}