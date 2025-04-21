import { useState } from "react";


export default function Testing(){
    const [number , setNumber] = useState(0)
    const [status , setStatus] = useState("Pending")

    function increment(){
        let newValue = number + 1; 
        setNumber(newValue)
    }

    function decrement(){   
        let newValue = number - 1; 
        setNumber(newValue)    
    }

    return(
        <div className="w-full h-screen bg-amber-700 flex flex-col justify-center items-center">
            <span className="text-3xl font-bold">{number}</span>
            <div className="w-full flex justify-center items-center">
                <button onClick={increment} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer mr-7">Plus</button>
                <button onClick={decrement} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer ml-7">Minus</button>
            </div>


            <span className="text-3xl font-bold">{status}</span>
            <div className="w-full flex justify-center items-center">
                <button onClick={()=>{
                    setStatus("Passed")
                }} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer mr-7">Pass</button>
                <button onClick={()=>{
                    setStatus("Failed")
                }} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer ml-7">Fail</button>
            </div>
        </div>
    )
}