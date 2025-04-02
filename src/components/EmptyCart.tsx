import Link from "next/link";
import Image from "next/image";

export default function EmptyCart() {
    return (
       <div className="p-10 flex justify-center items-center flex-col mb-20">
            <Image 

                src={"/empty-cart.png"}
                alt="pusty koszyk"
                width={350}
                height={350}

            />

            <div className="text-center flex flex-col gap-5">
                <h1 className="text-4xl font-bold">Upss! Twój koszyk jest pusty :(</h1>
                <Link href={"/"} className="underline text-cyan-700">Wróć i dodaj cos do koszyka!</Link>
            </div>
       </div>
    );
}