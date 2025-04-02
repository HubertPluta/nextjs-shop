"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TItem } from "@/types/TItem";
import Loader from "./Loader";

export default function ItemSize ({id} : {id : string}) {

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

    if (loading) return <Loader padding="2" width="4" height="4" />;
    if (error) return <p>Błąd: {error}</p>;
    if (!data?.color) return <Loader padding="2" width="4" height="4" />;

    const selectedColor = searchParams.get("color") || data?.color[0];
    const selectedSize = searchParams.get("size") || data?.size[0];
        

    return (
        <>
            {data?.size.map((size: string, index: number) => (
                <Link
                key={index}
                href={`?color=${selectedColor}&size=${size}`}
                className={`p-[.2rem_1rem] duration-100 ease-in shadow rounded-2xl cursor-pointer hover:bg-gray-300 ${size === selectedSize && "bg-gray-300"}`}
                >
                {size}
                </Link>
            ))}


        </>
    );
}