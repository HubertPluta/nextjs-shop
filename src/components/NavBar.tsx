import Link from "next/link"
import Image from "next/image"
import NavBarCart from "./NavBarCart"

export default function NavBar () {
    return (
        <nav className="flex justify-evenly items-center bg-stone-300 p-3">
            <div className="w-1/3 flex justify-center">
                <Link href={"/"}>
                    <Image   
                        src={"/logo.png"}
                        alt="logo"
                        width={50}
                        height={50}
                    />
                </Link>
            </div>

            <div>
                <ul className="flex gap-3 w-1/3">
                    <li className="hover:underline cursor-pointer"><Link href={"/?filter=newest"}>Nowe</Link></li>
                    <li className="hover:underline cursor-pointer"><Link href={"/?filter=recommended"}>Polecane</Link></li>
                    <li className="hover:underline cursor-pointer"><Link href={"/?filter=men"}>Mężczyźni</Link></li>
                    <li className="hover:underline cursor-pointer"><Link href={"/?filter=girl"}>Kobiety</Link></li>
                </ul> 
            </div>

            <div className="flex gap-5 w-1/3 justify-center">


                <div className="flex items-center">
                    <input type="text" className="rounded-3xl border pl-5 pt-2 pb-2 outline-0" placeholder="Wyszukaj produktu..."/>
                    <button className="cursor-pointer">
                        <Image 
                            className="-translate-x-8 w-5 h-5"
                            src={"/search.png"}
                            alt="lupa"
                            width={30}
                            height={10}
                        />
                    </button>
                </div>

                <NavBarCart />
            </div>
        </nav>
    )
}