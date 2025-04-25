import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function AdminProductsPage(){

    const [products , setProducts] = useState([])
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                }
            )
        },
        []
    )



    

    return(
        <div className="w-full h-full bg-blue-200 rounded-lg relative">
            <Link to={"/admin/addProducts"} className="text-white absolute hover:text-black bg-gray-800 p-5 text-2xl rounded-full cursor-pointer hover:bg-gray-500 right-5 bottom-5 ">
            <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">ProductId</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>

                    </tr>
                </thead>
                <tbody>
                {
            products.map(
                (products , index)=>{
                    console.log("Mapping" + products.name)
                    return(
                        // <h1 key={index}>
                        //     {products.productId + " " + index}
                        //     </h1>
                        <tr key={index} className="border-b-2 border-black text-center cursor-pointer hover:bg-gray-800 hover:text-white">
                            <td className="p-2">{products.productId}</td> 
                            <td className="p-2">{products.name}</td> 
                            <td className="p-2">{products.price}</td> 
                            <td className="p-2">{products.labeledPrice}</td> 
                            <td className="p-2">{products.stock}</td> 

                        </tr>
                    )
                }
            )
        }
                </tbody>

            </table>
        
        </div>
    )
}