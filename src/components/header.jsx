import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="bg-gradient-to-r shadow-lg h-[75px] w-full flex justify-start lg:justify-center items-center bg-pink-100">
            <GiHamburgerMenu className="text-2xl ml-5 lg:hidden" onClick={
                () => {
                    setIsOpen(true);
                }
            } />
            <div className="hidden lg:flex w-[500px] h-full items-center justify-between text-pink-700 text-lg font-medium">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contactUs">Contact Us</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/cart" className="absolute right-[7rem]"><FaCartShopping /></Link>
            </div>
            {
                isOpen && (
                    <div className="fixed top-0 left-0 w-full h-screen z-[9999] flex">
                        <div className="w-[300px] h-full bg-white flex flex-col justify-start items-start p-4">
                            <GiHamburgerMenu className="text-3xl" onClick={() => setIsOpen(false)} />
                            <Link to="/" className="text-xl my-5">Home</Link>
                            <Link to="/products" className="text-xl my-5">Products</Link>
                            <Link to="/contactUs" className="text-xl my-5">Contact Us</Link>
                            <Link to="/reviews" className="text-xl my-5">Reviews</Link>
                            <Link to="/cart" className="text-xl my-5">Cart</Link>
                        </div>
                    </div>
                )
            }
        </header>
    )
}