import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";


export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modalDisplaying, setModalDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState([]);

    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(
                    (response) => {
                        console.log(response.data)
                        setOrders(response.data)
                        setLoaded(true)
                    }
                )
            }
        }, [loaded]
    )

    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId , {
            status : status
        }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(
        () => {
            toast.success("Order updated successfully")
            setLoaded(false);
            setDisplayingOrder(null);
            setModalDisplaying(false);
        }
    )
}

return (
    <div className="w-full h-full flex ">
        {
            loaded ?
                <div className="w-full h-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Customer Email</th>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                orders.map(
                                    (order, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="border-b-2 border-black text-center cursor-pointer hover:bg-gray-500 hover:text-white"

                                            >
                                                <td className="p-2">{order.orderId}</td>
                                                <td className="p-2">{order.email}</td>
                                                <td className="p-2">{order.name}</td>
                                                <td className="p-2">{order.address}</td>
                                                <td className="p-2">{order.phoneNumber}</td>
                                                <td className="p-2">
                                                    <select value={order.status} onChange={
                                                        (e) => {
                                                            changeOrderStatus(order.orderId, e.target.value)
                                                        }
                                                    }>
                                                        <option value={"Pending"} className="text-black hover:text-black">Pending</option>
                                                        <option value={"Delivered"} className="text-black hover:text-black">Delivered</option>
                                                        <option value={"Cancelled"} className="text-black hover:text-black">Cancelled</option>
                                                        <option value={"Processing"} className="text-black hover:text-black">Processing</option>
                                                    </select>
                                                </td>
                                                <td className="p-2">{order.total}</td>
                                                <td className="p-2">{new Date(order.date).toDateString()}</td>
                                                <td className="p-2">
                                                    <button className="bg-gray-800 text-white p-2 rounded-lg"
                                                        onClick={() => {
                                                            setModalDisplaying(true)
                                                            setDisplayingOrder(order)
                                                        }}>Details</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    {
                        modalDisplaying &&
                        <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                            <div className="relative w-[600px] max-w-[700px] h-[600px] bg-white max-h-[600px]">
                                <div className="w-full h-[150px]">
                                    <h1 className="text-md font-bold p-2">Order Id: {displayingOrder.orderId}</h1>
                                    <h1 className="text-md font-bold p-2">Order Date: {new Date(displayingOrder.date).toDateString()}</h1>
                                    <h1 className="text-md font-bold p-2">Order Status: {displayingOrder.status}</h1>
                                    <h1 className="text-md font-bold p-2">Order Total: {displayingOrder.total}</h1>
                                </div>
                                <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                    {
                                        displayingOrder.billItems.map((item, index) => {
                                            return (
                                                <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-5 flex justify-between items-center relative">
                                                    <img src={item.image} className="h-full aspect-square object-cover" />
                                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                        <h1 className="text-xl font-bold">{item.productName}</h1>
                                                        <h2 className="text-lg text-gray-500">LKR: {item.price}</h2>
                                                        <h2 className="text-lg text-gray-500">Quantity: {item.quantity}</h2>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className="absolute w-[30px] h-[30px] right-[-10px] top-[-10px] rounded-full shadow  shadow-black bg-white flex justify-center items-center" onClick={() => {
                                    setModalDisplaying(false)
                                }}>
                                    <IoMdClose />
                                </button>
                            </div>

                        </div>
                    }
                </div>
                :
                <Loader />
        }
    </div>
)
}


//723274571932-1atrr54s32k0l24t09p5uutu8esni67t.apps.googleusercontent.com