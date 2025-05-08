import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gradient-to-r shadow-lg h-[75px] w-full flex justify-center items-center bg-pink-100">
            <div className="w-[500px] h-full flex items-center justify-between text-pink-700 text-lg font-medium">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contactUs">Contact Us</Link>
                <Link to="/reviews">Reviews</Link>
            </div>
        </header>
    )
}