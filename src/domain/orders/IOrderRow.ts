import { IBaseEntity } from "../IBaseEntity";
import { I_Ingredient } from "../recipes/I_Ingredient";

export interface IOrderRow extends IBaseEntity {
    ingredientId?: string
    ingredient?: I_Ingredient;
    rowPriceEur: number;
}