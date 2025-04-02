"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TItem } from "@/types/TItem";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ConnectError from "./ConnectErorr";

export default function Item() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<TItem[] | null>(null);
  const [erorr, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if(!res.ok) throw new Error("Błąd pobrania danych");
        const result : TItem[] = await res.json()
        setData(result)
      } catch(err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
     }

    fetchData()
  }, [])

  if (loading) return <Loader padding="10" height="4" width="4" />;
  if (erorr) return <ConnectError />;

  const filterParam = searchParams.get("filter");

  let filteredData = data?.filter(item => {
    if (filterParam === "men") return item.gender === "men"
    if (filterParam === "girl") return item.gender === "girl"
    return item
  })
  if (filterParam === "newest") filteredData = filteredData?.sort((a,b) => new Date(b.dateOfAdd as string).getTime() - new Date(a.dateOfAdd as string).getTime()).slice(0,5)

  return (
    <div className="flex flex-wrap justify-center items-center p-5 gap-5">
      {filteredData && filteredData.length > 0 ? (
       filteredData?.map((item) => (
        <div key={item.id} className="bg-stone-300 rounded-2xl p-3">
          <Link href={`/products/${item.id}?color=${item.color[0]}&size=${item.size[0]}`} className="p-4">
              <Image
                  className="aspect-[16 / 9] h-80 w-80 rounded-2xl pb-6"
                  src={item.imageUrl}
                  alt={item.name}
                  width={200}
                  height={400}
              />
          </Link>
              <h1>{item.name}</h1>
              <p>{item.price} zł</p>

        </div>
       )) 
      )
       : <h1>Nie znaleziono żadnych produktów</h1>  
    
    }
    </div>
  );
}
