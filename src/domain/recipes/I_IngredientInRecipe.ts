import { IBaseEntity } from "../IBaseEntity";
import { I_Ingredient } from "./I_Ingredient";

export interface I_IngredientInRecipe extends IBaseEntity {
    ingredient: I_Ingredient;
    amount: number;
}