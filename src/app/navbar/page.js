import Link from "next/link"
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight} from "react-icons/md";



const Navbar = () => {
    return (
        <>

            <div>
                <div className="flex items-center space-x-4 flex-row-reverse gap-2 px-3">
                    <Link className="text-gray-600 hover:text-gray-900" href="#">
                        Help
                    </Link>
                    <Link className="text-gray-600 hover:text-gray-900" href="#">
                        Orders & Returns
                    </Link>
                    <span className="text-gray-600">Hi, John</span>
                </div>
            </div>
            <nav className="bg-white py-4">
                <div className="max-w-7xl px-4 flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">ECOMMERCE</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-6">
                            <Link className="text-gray-600 hover:text-gray-900" href="#">
                                Categories
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900" href="#">
                                Sale
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900" href="#">
                                Clearance
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900" href="#">
                                New stock
                            </Link>
                            <Link className="text-gray-600 hover:text-gray-900" href="#">
                                Trending
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <CiSearch className="text-2xl" />
                        <IoCartOutline className="text-2xl" />
                    </div>

                </div>
                <div className="bg-gray-100 flex justify-center items-center">
                    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-center">
                        <MdKeyboardArrowLeft /> <span className="text-sm text-black">Get 10% off on business sign up</span><MdKeyboardArrowRight />
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar

