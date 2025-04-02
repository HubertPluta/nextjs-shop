"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function ConnectError() {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center p-5 bg-red-300">
            <h1 className="font-bold">Błąd połączenia</h1>

            <div className="flex flex-col items-center">
                    <p>Odsież strone</p>
                <button 
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => router.refresh()}
                >
                    <Image
                    
                        src={"/reload.png"}
                        alt="Odświeżenie strony"
                        width={50}
                        height={50}

                    />
                </button>
            </div>
        </div>
      );

}