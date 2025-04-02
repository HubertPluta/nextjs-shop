"use client"

import { useShoppingCart } from "@/context/shoppingCartContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSearchParams } from "next/navigation";

export default function AddCartButton({ id } : {id: string}) {

    const searchParams = useSearchParams();

    const selectedSize = searchParams.get("size") || "";
    const selectedColor = searchParams.get("color") || "";

    const {
        increaseCartQuantity,
        getItemQuantity,
        changeColor,
        changeSize
    } = useShoppingCart();

    const { setItem } = useLocalStorage("Shopping-cart");
    
    

    return (
        <button className="cursor-pointer rounded-2xl bg-black text-white p-[.2rem_1rem] m-[1rem_0rem] hover:bg-stone-700 duration-180 ease-in" onClick={() => {
            increaseCartQuantity(id);
            changeColor(id, selectedColor);
            changeSize(id, selectedSize);
            setItem({id, quantity: getItemQuantity(id) + 1, size: selectedSize, color: selectedColor });
        }}>Dodaj do koszyka
         </button>
    );
}