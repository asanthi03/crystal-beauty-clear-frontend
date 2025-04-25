import { Link } from "react-router-dom";

export default function AddProductForm(){
    return(
        <div className="w-full h-full rounded-lg bg-red-50 flex justify-center items-center">
            <div className="w-[500px] h-[550px] bg-white rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-900 m-[10px]">Add Product</h1>
                <input className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Product Id" />
                <input className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Product Name"/>
                <input className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Price"/>
                <input className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Labeled Price"/>
                <textarea className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Description"/>
                <input className="w-[350px] h-[40px] border border-gray-600 rounded-xl text-center m-3" placeholder="Stock"/>

                <div className="w-[350px] h-[80px] flex justify-between items-center rounded-lg">
                    <Link to={"/admin/products"} className="bg-red-500 text-white font-bold p-[10px] w-[200px] rounded-lg text-center hover:bg-red-800">CANCEL</Link>
                    <button className="bg-green-500 text-white font-bold p-[10px] w-[200px] ml-2 rounded-lg text-center hover:bg-green-800">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}