import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";

export default function HomePage() {
    return (
        <div className="w-full h-screen max-h-screen">
            <Header />
            <div className="w-full min-h-[calc(100vh-75px)]">
                <Routes path="/">
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path='/products' element={<ProductsPage/>} />
                    <Route path='/*' element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    )
}