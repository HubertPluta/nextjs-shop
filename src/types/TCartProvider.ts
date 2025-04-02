import { ReactNode } from "react"

export type TShoppingCartProvider = {
    children: ReactNode
}

export type TCartItem = {
    id: string,
    quantity: number,
    size: string,
    color: string
}

export type TShoppingCartContext = {
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    changeColor: (id: string, color: string) => void
    changeSize: (id: string, size: string) => void
    cartItems: TCartItem[]
}
