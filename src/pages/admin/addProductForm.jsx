import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../../utils/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        if (!productId || !name || !price) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);
        try {
            // Upload images
            const promisesArray = [];
            for (let i = 0; i < images.length; i++) {
                promisesArray.push(mediaUpload(images[i]));
            }
            
            const result = await Promise.all(promisesArray);
            
            const altNamesInArray = altNames.split(",").map(name => name.trim());
            const product = {
                productId: productId,
                name: name,
                altNames: altNamesInArray,
                price: parseFloat(price),
                labeledPrice: parseFloat(labeledPrice),
                description: description,
                stock: parseInt(stock),
                images: [result]
            };

            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to add products");
                return;
            }

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                headers: {
                    Authorization: "Bearer " + token
                },
            });
            
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Product adding failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full rounded-lg bg-red-50 flex justify-center items-center">
            <div className="w-[550px] h-[650px] bg-white rounded-lg shadow-lg flex flex-col items-center pb-[10px] pt-[10px]">
                <h1 className="text-3xl font-bold text-gray-900 m-[10px]">Add Product</h1>
                
                <input
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Product Id" 
                    required
                />

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Product Name" 
                    required
                />

                <input
                    value={altNames}
                    onChange={(e) => setAltNames(e.target.value)}
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Alternative Names (comma separated)" 
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number" 
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Price" 
                    required
                />

                <input
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                    type="number" 
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Labeled Price" 
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-[400px] h-[80px] border border-gray-600 rounded-xl p-2 m-3" 
                    placeholder="Description" 
                />

                <input 
                    type="file"
                    onChange={(e) => setImages(e.target.files)}
                    multiple
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    accept="image/*"
                />

                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number" 
                    className="w-[400px] h-[40px] border border-gray-600 rounded-xl text-center m-3" 
                    placeholder="Stock" 
                />

                <div className="w-[400px] h-[80px] flex justify-between items-center rounded-lg">
                    <Link 
                        to="/admin/products" 
                        className="bg-red-500 text-white font-bold p-[10px] w-[200px] rounded-lg text-center hover:bg-red-800"
                    >
                        CANCEL
                    </Link>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className="bg-green-500 text-white font-bold p-[10px] w-[200px] ml-2 rounded-lg text-center hover:bg-green-800 disabled:bg-gray-400"
                    >
                        {isLoading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}