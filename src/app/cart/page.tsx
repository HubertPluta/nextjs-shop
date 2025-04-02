// cart
"use client";

import { TItem } from "@/types/TItem";
import { useEffect, useState } from "react";
import { useShoppingCart } from "@/context/shoppingCartContext";
import Image from "next/image";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Loader from "@/components/Loader";
import ConnectError from "@/components/ConnectErorr";
import EmptyCart from "@/components/EmptyCart";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button"

export default function Cart() {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
    changeColor,
    changeSize
  } = useShoppingCart();

  const { setItem, removeItem } = useLocalStorage("Shopping-cart");

  const [data, setData] = useState<TItem[] | null>(null);
  const [erorr, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error("Błąd pobrania danych");
        const result: TItem[] = await res.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader padding="10" width="4" height="4" />;
  if (erorr) return <ConnectError />;

  const filterData = data?.filter((item) => {
    return cartItems.find((cartItems) => cartItems.id === item.id);
  });

  return (
    <div className="min-h-[84vh] flex justify-center items-center gap-5 w-[100%]">
      <div
        className={`flex gap-5 p-4 w-[70%] flex-wrap ${
          filterData?.length == 0 && "justify-center"
        }`}
      >
        {filterData && filterData.length > 0 ? (
          filterData.map((item, i) => (
            <div
              key={item.id}
              className="flex gap-5 bg-stone-300 p-3 rounded-2xl grow-1 basis-100"
            >
              <div>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={280}
                  height={280}
                  className="aspect-4/3 rounded-2xl"
                />

                <div className="flex items-center gap-5 pt-5">
                  <div className="flex items-center border-gray-400 border-2 gap-2 rounded-3xl">
                    {/* add item */}
                    <button
                      className="rounded-full text-2xl flex justify-center items-center p-3 cursor-pointer hover:bg-stone-200 duration-100 ease-in"
                      onClick={() => {
                        increaseCartQuantity(item.id);
                        setItem({
                          id: item.id,
                          quantity: getItemQuantity(item.id) + 1,
                          color: cartItems[i].color,
                          size: cartItems[i].size
                        });
                        toast(`Dodano produkt ${item.name} do koszyka`, {
                          type: "success",
                          description: new Date().toLocaleString(),
                        });
                      }}
                    >
                      <Image
                        src={"/plus.png"}
                        alt="plus"
                        width={15}
                        height={15}
                      />
                    </button>

                    {/* quanity */}
                    <h3>{getItemQuantity(item.id)}</h3>

                    {/* remove one item */}

                    <button
                      className="rounded-full text-2xl flex justify-center items-center p-3 cursor-pointer hover:bg-stone-200 duration-100 ease-in"
                      onClick={() => {
                        decreaseCartQuantity(item.id);
                        if (getItemQuantity(item.id) - 1 === 0) {
                          removeItem(item.id);
                          toast(`Usunięto produkt ${item.name} z koszyka`, {
                            type: "warning",
                            description: new Date().toLocaleString(),
                          });
                        } else {
                          setItem({
                            id: item.id,
                            quantity: getItemQuantity(item.id) - 1,
                            color: cartItems[i].color,
                            size: cartItems[i].size
                          });
                          toast(
                            `Usunięto jeden produkt ${item.name} z koszyka`,
                            {
                              type: "warning",
                              description: new Date().toLocaleString(),
                            }
                          );
                        }
                      }}
                    >
                      <Image
                        src={"/minus-sign.png"}
                        alt="minus"
                        width={15}
                        height={15}
                      />
                    </button>
                  </div>

                  {/* remove item */}
                  <div className="flex items-center">
                    <button
                      className="cursor-pointer h-10"
                      onClick={() => {
                        removeFromCart(item.id);
                        removeItem(item.id);
                        toast(`Usunięto produkt ${item.name} z koszyka`, {
                          type: "warning",
                          description: new Date().toLocaleString(),
                        });
                      }}
                    >
                      <Image
                        src={"/delete.png"}
                        alt="delete"
                        width={40}
                        height={40}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* info */}
              <div>
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <p className="text-xl">{item.price} zł</p>
                <p className="text-xl"><span className="font-bold">Rozmiar:</span> {cartItems[i].size}</p>
                <div className="pt-3 pb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="default" className="cursor-pointer">Zmien rozmiar</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Dostępne rozmiary
                          </h4>
                        </div>
                        <div className="grid gap-2">
                            {item.size.map((size, index) => (
                              <Button className="cursor-pointer" key={index} onClick={() => {
                                changeSize(item.id, size);
                                setItem(
                                  {
                                    id: item.id,
                                    quantity: getItemQuantity(item.id),
                                    size,
                                    color: cartItems[i].color
                                  }
                                )
                              }}>{size}</Button>
                            ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <p className="text-xl"><span className="font-bold">Kolor:</span> {cartItems[i].color}</p>
                <div className="pt-3 pb-3">
                <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="default" className="cursor-pointer">Zmien kolor</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Dostępne kolory
                          </h4>
                        </div>
                        <div className="grid gap-2">
                            {item.color.map((color, index) => (
                              <Button className="cursor-pointer" key={index} onClick={() => {
                                changeColor(item.id, color);
                                setItem(
                                  {
                                    id: item.id,
                                    quantity: getItemQuantity(item.id),
                                    size: cartItems[i].size,
                                    color
                                  })
                              }}>{color}</Button>
                            ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyCart />
        )}
      </div>

      {filterData?.length != 0 && (
        <div className="w-150 max-h-[100%] sticky">dawda</div>
      )}
    </div>
  );
}
