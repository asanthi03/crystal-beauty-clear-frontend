import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import toast from "react-hot-toast"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../../utils/cart"

export default function ProductOverview() {
    const params = useParams()
    if (params.id == null) {
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")
    const navigate = useNavigate();

    useEffect(
        () => {
            if (status == "loading") {

                console.log("This is the product id: " + params.id);

                //api mekedi krl thyenneee... product list eken product ekk click kraama... productOverview page ekt ewnw eh click krpu product eke id ekth ekka.... eetpsse eh id ek argena mekedima product eke data argena thywne back end ekt req krl... eetpsse eh gnna data tika api thygena inwne meh "product" kyna eke... anna eh data thma api buy now btn ek click krddi pass krl thyenne... ahhhh hri... ehnn ai ek wdntte... mkk hri awlk athi kohe hri... 

                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                    (res) => {
                        console.log(res)
                        setProduct(res.data.product)
                        setStatus("loaded")
                    }
                ).catch(
                    () => {
                        toast.error("Product is not available!")
                        setStatus("error")
                    }
                )
            }
        }, [status]
    )

    return (
        <div className="w-full h-full">
            {
                status == "loading" && <Loader />
            }
            {
                status == "loaded" &&
                <div className="w-full h-full flex flex-col lg:flex-row">
                     <h1 className="lg:hidden text-3xl font-bold text-center mb-[3rem]">{product.name}{" | "} <span className="text-xl text-gray-500 text-center">{product.altNames.join(" | ")}</span></h1>
                    
                    <div className="w-full lg:w-[50%] lg:h-full">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-full lg:w-[40%] pt-[100px] h-full p-[3rem]">
                        <h1 className="hidden lg:block text-3xl font-bold text-center mb-[3rem]">{product.name}{" | "} <span className="text-xl text-gray-500 text-center">{product.altNames.join(" | ")}</span></h1>
                        <div className="w-full flex justify-center mb-[1rem]">
                            {product.labeledPrice > product.price ? (
                                <>
                                    <h2 className="text-3xl mx-5">LKR {product.price.toFixed(2)}</h2>
                                    <h2 className="text-3xl line-through text-gray-500">LKR {product.labeledPrice.toFixed(2)}</h2>


                                </>
                            ) : (

                                <h2>{product.price}</h2>
                            )

                            }


                        </div>
                        <h2 className="text-3xl font-semibold text-center text-gray-500 mb-[1rem]">LKR: {product.price}</h2>
                        <p className="text-xl text-center text-gray-500 mb-[2.5rem]">{product.description}</p>

                        <div className="w-full flex justify-center mb-[40px]">
                            <button className="text-[1.1rem] font-bold border border-pink-700 bg-pink-700 text-white w-[200px] h-[50px] rounded-lg hover:bg-amber-50 hover:text-pink-900 transition-all duration-300 ease-in-out mr-[2rem]" onClick=
                                {() => {
                                    addToCart(product, 1)
                                    toast.success("Product added to Cart")
                                    console.log(getCart());
                                }}>Add to Cart </button>

                            <button onClick={()=>{
                                navigate("/checkout", {
                                    state : {
                                        items: [
                                            {
                                                productId: product.productId,
                                                name: product.name,
                                                altNames: product.altNames,
                                                price: product.price,
                                                labeledPrice: product.labeledPrice,
                                                image: product.images[0],
                                                quantity: 1
                                            }
                                        ]
                                    }
                                })
                                console.log(product)
                            }} className="text-[1.1rem] font-bold border border-pink-900 bg-pink-900 text-white w-[200px] h-[50px] rounded-lg hover:bg-amber-50 hover:text-pink-900 transition-all duration-300 ease-in-out">Buy Now</button>

                        </div>
                    </div>
                </div>
            }
            {
                status == "error" && <div>
                    ERROR
                </div>
            }
        </div>
    )
}