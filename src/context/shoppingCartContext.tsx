"use client";

import { createContext, useContext, useState } from "react";
import { TShoppingCartProvider, TShoppingCartContext, TCartItem } from "@/types/TCartProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children} : TShoppingCartProvider) {

    const [cartItems, setCartItems] = useState<TCartItem[] | []>(useLocalStorage('Shopping-cart').getItem() || []);

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: string) {
        setCartItems(currentItems => {
            if (cartItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1}];
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1};
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(currentItems => {
            if (cartItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1};
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id: string) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        })
    }

    function changeColor(id: string, color: string) {
        setCartItems(currentItems => 
            currentItems.map(item =>
                item.id === id ? { ...item, color: color } : item
            )
        );
    }
    
    function changeSize(id: string, size: string) {
        setCartItems(currentItems => 
            currentItems.map(item =>
                item.id === id ? { ...item, size: size } : item
            )
        );
    }


    return (
        <ShoppingCartContext.Provider 
            value={{
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart,
                changeColor,
                changeSize,
                cartItems
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}