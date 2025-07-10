import { useEffect, useState } from "react";
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../../utils/cart"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (cartLoaded == false) {
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    }, [cartLoaded]
    )


    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-full lg:w-[50rem]">
                {

                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-[300px] lg:w-full lg:h-[100px] lg:ml-5 my-[10px] flex flex-col lg:flex-row items-center justify-center  bg-white shadow-2xl relative">
                                <button className="absolute right-4 top-[5px] lg:mt-5 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full flex justify-center items-center shadow-black shadow-2xl cursor-pointer">
                                    <MdDelete className="h-[20px] w-[20px]" onClick={() => {
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                    }} />
                                </button>
                                <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover mt-5 lg:mt-0" />

                                <div className="h-full w-[250px] text-xl font-bold flex flex-col pl-5 gap-1 items-center justify-center overflow-hidden">{item.name}
                                    <span className="text-sm text-gray-500 font-bold flex">{item.altNames}</span>
                                    <span className="text-md text-black font-bold flex mt-2">LKR: {item.price}</span>
                                </div>

                                <div className="flex flex-row my-2 lg:my-0">
                                    <div className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-1" onClick={() => {
                                        addToCart(item, -1)
                                        setCartLoaded(false)
                                    }}>-</div>
                                    <div className="h-full w-[80px] flex justify-center items-center text-xl font-bold">{item.quantity}</div>
                                    <div className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
                                        addToCart(item, 1)
                                        setCartLoaded(false)
                                    }}>+</div>
                                </div>

                                <div className="h-full w-[200px] flex my-5 lg:my-0 justify-center lg:justify-end items-center text-xl font-bold">LKR: {(item.quantity * item.price).toFixed(2)}</div>


                            </div>
                        )
                    })
                }
                <div className="w-full flex justify-end mt-10">
                    <h1 className=" text-end pr-10 text-xl font-black">Total: </h1>
                    <h1 className="w-[200px] text-end pr-10 text-xl font-black">LKR {getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end mt-10">
                    <h1 className="text-end pr-10 text-xl font-black">Discount: </h1>
                    <h1 className="w-[200px] text-end pr-10 text-xl border-b-2 font-black">{(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end mt-10">
                    <h1 className="text-end pr-10 text-xl font-black">Net Total: </h1>
                    <h1 className="w-[200px] text-end border-double border-b-4 pr-10 text-xl font-black">LKR {getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end mt-5">
                    <button className="w-[170px] text-xl text-center mt-8 pr-2 font-black bg-pink-400 text-black h-[50px] rounded-lg cursor-pointer shadow" onClick={() => {
                        navigate("/checkout",
                            {
                                state: {
                                    items: cart
                                }
                            }
                        )
                    }}>
                        Checkout
                    </button>

                </div>

            </div>

        </div>
    )
}