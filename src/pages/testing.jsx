import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";


export default function Testing() {
    const [file, setFile] = useState(null);
    
    function handleUpload() {
        mediaUpload(file).then(
            (url)=>
            console.log(url)
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0])
                }
            } />

            <button onClick={handleUpload} className="bg-green-400 p-2 text-white rounded-lg">Upload File</button>
        </div>
    )







}
//     const [number , setNumber] = useState(0)
//     const [status , setStatus] = useState("Pending")

//     function increment(){
//         let newValue = number + 1;
//         setNumber(newValue)
//     }

//     function decrement(){
//         let newValue = number - 1;
//         setNumber(newValue)
//     }

//     return(
//         <div className="w-full h-screen bg-amber-700 flex flex-col justify-center items-center">
//             <span className="text-3xl font-bold">{number}</span>
//             <div className="w-full flex justify-center items-center">
//                 <button onClick={increment} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer mr-7">Plus</button>
//                 <button onClick={decrement} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer ml-7">Minus</button>
//             </div>


//             <span className="text-3xl font-bold">{status}</span>
//             <div className="w-full flex justify-center items-center">
//                 <button onClick={()=>{
//                     setStatus("Passed")
//                 }} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer mr-7">Pass</button>
//                 <button onClick={()=>{
//                     setStatus("Failed")
//                 }} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer ml-7">Fail</button>
//             </div>
//         </div>
//     )
// }