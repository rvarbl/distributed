import { I_Ingredient } from "../../domain/recipes/I_Ingredient";

export interface ICartItem {
    amount: number;
    item?: I_Ingredient;
}