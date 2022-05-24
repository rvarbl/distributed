import { IBaseEntity } from "../IBaseEntity";
import { I_IngredientProperty } from "./I_IngredientProperty";

export interface IPropertyInIngredient extends IBaseEntity {
    ingredientProperty: I_IngredientProperty;
    amount: number;
}