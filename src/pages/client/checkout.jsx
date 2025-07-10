import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";


export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state.items)
    const [cartRefresh, setCartRefresh] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate();



    function getTotal() {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity
        })
        return total
    }

    function getTotalForLabelledPrice() {
        let total = 0;
        cart.forEach((product) => {
            total += product.labeledPrice * product.quantity
        })
        return total
    }

    function placeOrder() {
        const orderData = {
            name: "Asanthi",
            address: "Kurunegala",
            phoneNumber: "0717171458",
            billItems: []
        }
        for (let i = 0; i < cart.length; i++) {
            orderData.billItems[i] = {
                productId: cart[i].productId,
                quantity: cart[i].quantity
            }
        }
        const token = localStorage.getItem("token")
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order/", orderData, {
            headers: {
                Authorization: "Bearer " + token
            },
        }).then(() => {
            toast.success("Order place successfully")
            navigate('/');
        }).catch((error) => {
            console.log(error);
            toast.error("Order placement failed")
        })
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-[50rem] pt-7">
                {/* meh map() kyna eke krnneeee... cart kyna array eke thyna indexes ekin eka glola wena wenama dewk tikk krn ynw.... "iterate" krnw... ethkot ekk itereate weddi meh kotasa krnw... ehma hma ehktma krnw.... cart array eke100 thibboth 100 paarak iterate wenw... eh iterate weddi glona ekin ek meh function ehkt pass krnw... meh thyenne normal standard JS function ekk.. meke wrddkuth na... api use krnne arrow function ekk ne.... very good... mmmmmmwwaahhh... eh aluth standard ek JS wl... meh dn daapu dektma api kynw anonymous functions kyl mkd mewt namak daala nthi hind...hri... ethkot meh daana function ek athult values pass krnw... 1st param ek thma ara iterate krna idex eke thyna mk hri value ek nttn data ek... mekedi apit hmbenne JS object... ek apit kmthi nmkin gnna plwn meh pththen... onama JS function ehkt ehmne.... hrid.. hri bbha.. ek thma ar functiuon eke item kyl argena thyenne mkd meaningful hind... ethkot item. kyl awshya value ek read krgnna plwn... ahh hri... index ek kynne eke pass krna second value ekk... eh dn read krnne array eke keeweni index ekd kyna ek dngnna... ai api ekth dgnne... ek ddgnna hethuwak thma meh key kyl attribute ekk enw meh map athule daanna one... ekt maath hriytma hethuwa wdiya dnne na ehm dmme nhiwunama console eke podi warning ekk enw key ek assign krl na map ehkt ek aniwryai wge kthawak... ahh hri.. dan yn bbha error ekt wela giya.. bbha gdk dewl kiyla dunna ne mt... hliiii*/}
                {

                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[120px] pl-5 my-[10px] flex items-center bg-white shadow-2xl relative">
                                <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full flex justify-center items-center shadow-black shadow-2xl cursor-pointer">
                                    <MdDelete className="h-[20px] w-[20px]" onClick={() => {
                                        const newCart = cart.filter((product) => product.productId !== item.productId)
                                        setCart(newCart)
                                    }} />
                                </button>
                                <img src={item.image} className="h-full aspect-square object-cover" />

                                <div className="h-full w-[350px] text-xl font-bold flex flex-col pl-5 gap-1 justify-center overflow-hidden">{item.name}
                                    <span className="text-sm text-gray-500 font-bold flex">{item.altNames}</span>
                                    <span className="text-md text-black font-bold flex mt-2">LKR: {item.price}</span>
                                </div>
                                <div className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-1" onClick={() => {
                                    const newCart = cart
                                    newCart[index].quantity -= 1
                                    if (newCart[index].quantity <= 0) newCart[index].quantity = 1
                                    setCart(newCart)
                                    setCartRefresh(!cartRefresh)
                                }}>-</div>
                                <div className="h-full w-[80px] flex justify-center items-center text-xl font-bold">{item.quantity}</div>
                                <div className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
                                    const newCart = cart
                                    newCart[index].quantity += 1
                                    setCart(newCart)
                                    setCartRefresh(!cartRefresh)
                                }}>+</div>
                                <div className="h-full w-[100px] flex justify-end items-center text-xl font-bold">{(item.quantity * item.price).toFixed(2)}</div>

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
                <div className="w-full flex justify-end">
                    <h1 className="w-[300px] text-xl text-end pr-5 mt-10 font-medium">Name</h1>
                    <input type="name" className="w-[300px] text-xl border-b-2 text-end pr-2 mt-10" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[300px] text-xl text-end pr-5 mt-5 font-medium">Address</h1>
                    <input type="address" className="w-[300px] text-xl border-b-2 text-end pr-2 mt-5" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div><div className="w-full flex justify-end">
                    <h1 className="w-[300px] text-xl text-end pr-5 mt-5 font-medium">Phone Number</h1>
                    <input type="phoneNumber" className="w-[300px] text-xl border-b-2 text-end pr-2 mt-5" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="w-full flex justify-end mt-5">
                    <button className="w-[170px] text-xl text-center mt-8 pr-2 font-black bg-pink-400 text-black h-[50px] rounded-lg cursor-pointer shadow" onClick={placeOrder}>
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    )
}