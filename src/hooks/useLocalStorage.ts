"use client";

import { TCartItem } from "@/types/TCartProvider";


export function useLocalStorage(key: string) {

    const getItem = (): TCartItem[] => {
        if (typeof window === "undefined") return [];
        
        const data = window.localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    };

    const setItem = (value: TCartItem) => {
        if (typeof window === "undefined") return;
        const data = getItem();
        
        let updated = false;

        const newData = data.map((item) => {
            if (item.id === value.id) {
                updated = true;
                return { ...item, quantity: value.quantity, color: value.color, size: value.size };
            }
            return item;
        });

        if (!updated) {
            newData.push(value);
        }

        window.localStorage.setItem(key, JSON.stringify(newData));
    };

    const removeItem = (id: string) => {
        if (typeof window === "undefined") return;
        const data = getItem();

        const newData = data.filter(item => {
            return item.id !== id;
        })


        window.localStorage.setItem(key, JSON.stringify(newData))
    }

    return { getItem, setItem, removeItem };
}