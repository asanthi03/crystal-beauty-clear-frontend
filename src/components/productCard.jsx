import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.product

    return(
        <Link to = {"/overview/" + product.productId} className="w-[250px] h-[350px] m-4 shadow-2xl">
            <img className="w-full h-[200px] object-cover" src={product.images[0]} alt="" />
            <div className="w-full h-[150px] flex flex-col justify-center px-5">
                <p className="text-[13px] text-gray-500">{product.productId}</p>
                <p className="text-[20px] font-semibold">{product.name}</p>
                <p className="text-[22px] text-pink-900">{product.price.toFixed(2)}
                    &nbsp;
                    <span className="line-through text-gray-600 text-[18px]">{product.price<product.labeledPrice&&product.labeledPrice.toFixed(2)}</span>
                </p>

            </div>

        </Link>
    )
}