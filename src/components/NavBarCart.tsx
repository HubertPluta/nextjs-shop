"use client";

import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "@/context/shoppingCartContext";
import { useEffect, useState } from "react";

export default function NavBarCart() {
    const { cartItems } = useShoppingCart();
    const [clientCartCount, setClientCartCount] = useState<number | null>(null);

    useEffect(() => {
        setClientCartCount(cartItems.length);
    }, [cartItems]);

    return (
        <Link href={"/cart"} className="flex items-center">
            <Image 
                src={"/cart.svg"}
                alt="koszyk"
                width={30}
                height={30}
            />

            <div className={`bg-red-500 w-5 h-5 flex justify-center items-center text-white rounded-full -translate-x-2.5 translate-y-4 
                ${clientCartCount && clientCartCount > 0 ? "opacity-70" : "opacity-0"}
                `}>
                {clientCartCount !== null && clientCartCount > 0 ? clientCartCount : ""}
            </div>
        </Link>
    );
}