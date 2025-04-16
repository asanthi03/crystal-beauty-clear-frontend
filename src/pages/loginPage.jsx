export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-red-900 bg-[url(/login-bg.jpg)] bg-center bg-cover flex">
        <div className=" w-[50%] h-full border border-amber-900">

        </div>
        <div className= "w-[50%] h-full border border-amber-500 flex justify-center items-center">
            <div className="w-[450px] h-[550px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                <input type="email" placeholder="email" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                <input type="password" placeholder="password" className="w-[350px] h-[40px] border border-white rounded-xl text-center m-3" />
                <button className="w-[350px] h-[40px] bg-green-800 text-white m-3 rounded-xl cursor-pointer">Login Here</button>

            </div>
        </div>
        </div>
    )
}