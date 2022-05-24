import React from "react";
import { ICartState } from "./ICartState";
import { ICartItem } from "./ICartItem";

export const initialCartState: ICartState = {
    cart: [],
    setCart: (cart: ICartItem[] | undefined) => { },
};

export const CartContext = React.createContext<ICartState>(initialCartState);
export const CartContextProvider = CartContext.Provider;