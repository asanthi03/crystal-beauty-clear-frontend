import { useState } from "react"

export default function ImageSlider(props) {
    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-green-500 w-full lg:w-[70%] aspect-square relative object-cover border">
                <img src={activeImage} className="w-full  h-full cursor-pointer" alt="" />
                <div className="hidden lg:flex w-full bg-white border-t absolute bottom-0 justify-center items-center">
                    {
                        images.map(
                            (index, key) => {
                                return (
                                    <img key={index} src={images[key]} alt="" className="h-[100px] aspect-square mx-[0.5rem] my-[0.5rem] cursor-pointer" onClick={
                                        () => {
                                            setActiveImage(images[key])
                                        }
                                    } />
                                )
                            }
                        )
                    }
                </div>
                <div className="lg:hidden absolute bottom-[-100px] w-full h-[100px] flex justify-center items-center">
                    {
                        images.map(
                            (index, key) => {
                                return (
                                    <img key={index} src={images[key]} alt="" className="h-[70px] rounded-full cursor-pointer" onClick={
                                        () => {
                                            setActiveImage(images[key])
                                        }
                                    } />
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}