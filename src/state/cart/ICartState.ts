import { ICartItem } from "./ICartItem";

export interface ICartState {
    cart?: ICartItem[] | undefined;
    setCart: (cart: ICartItem[] | undefined) => void,
}