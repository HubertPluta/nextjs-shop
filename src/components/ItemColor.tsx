"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TItem } from "@/types/TItem";
import Loader from "./Loader";

export default function ItemColor ({id} : {id : string}) {

    const searchParams = useSearchParams();
    const [data, setData] = useState<TItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`);
                if (!res.ok) throw new Error("Błąd z połączeniem");
                const result : TItem = await res.json(); 
                setData(result);
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    },[id])

    if (loading) return <Loader padding="3" width="4" height="4" />;
    if (error) return <p>Błąd: {error}</p>;
    if (!data) return <Loader padding="3" width="4" height="4" />;


    const selectedSize = searchParams.get("size") || data?.size[0];
    const selectedColor = searchParams.get("color") || data?.color[0];
        

    return (
        <>
            {data?.color.map((color: string, index: number) => (
            <Link
              key={index}
              href={`?color=${color}&size=${selectedSize}`}
              className={`p-[.2rem_1rem] duration-100 ease-in shadow rounded-2xl cursor-pointer hover:bg-gray-300 ${color === selectedColor && "bg-gray-300"}`}
            >
              {color}
            </Link>
          ))}


        </>
    );
}