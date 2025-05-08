import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.product

    return(
        <Link className="w-[250px] h-[350px] bg-amber-600 m-4 border">
            <img src={product.images[0]} alt="" />

        </Link>
    )
}