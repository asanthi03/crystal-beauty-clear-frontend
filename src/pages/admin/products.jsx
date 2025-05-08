import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit, FaPlus } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false) // Changed to boolean
    const [isLoading, setIsLoading] = useState(false)
    const navigate  = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            if (!isLoaded && !isLoading) {
                setIsLoading(true)
                try {
                    const response = await axios.get(
                        import.meta.env.VITE_BACKEND_URL + "/api/product"
                    )
                    setProducts(response.data)
                    setIsLoaded(true)
                } catch (error) {
                    console.error("Error fetching products:", error)
                    toast.error("Failed to load products")
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchProducts()
    }, [isLoaded, isLoading])

    async function deleteProduct(id) {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Please login to delete product")
            return
        }
        
        try {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
                {
                    headers: {  // Fixed to 'headers' (plural)
                        Authorization: "Bearer " + token  // Added space after Bearer
                    }
                }
            )
            toast.success("Product deleted successfully")
            setIsLoaded(false) // Trigger refetch
        } catch (error) {
            console.error("Delete error:", error)
            toast.error(error.response?.data?.message || "Error deleting product")
        }
    }

    return (
        <div className="w-full h-full bg-blue-200 rounded-lg relative">
            <Link 
                to={"/admin/addProducts"} 
                className="text-white absolute hover:text-black bg-gray-800 p-5 text-2xl rounded-full cursor-pointer hover:bg-gray-500 right-5 bottom-5"
            >
                <FaPlus />
            </Link>

            {isLoading ? (
                <Loader />
            ) : isLoaded ? (
                products.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-amber-200">
                                <th className="p-2">ProductId</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Labeled Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr 
                                    key={index} 
                                    className="border-b-2 border-black text-center cursor-pointer hover:bg-gray-500 hover:text-white"
                                >
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                                    <td className="p-2">
                                        <div className="w-full h-full flex justify-center gap-6">
                                            <FaTrash 
                                                onClick={() => deleteProduct(product.productId)}
                                                className="text-[25px] hover:text-red-500 cursor-pointer" 
                                            />
                                            
                                                <FaEdit onClick={()=>{
                                                    navigate("/admin/editProducts",
                                                        {
                                                            state: product
                                                        }
                                                    )
                                                }} className="text-[25px] hover:text-blue-500 hover:animate-bounce cursor-pointer" />
                                         
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center p-8">No products found</div>
                )
            ) : null}
        </div>
    )
}