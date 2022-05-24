import { IBaseEntity } from "../IBaseEntity";
import { I_IngredientInRecipe } from "./I_IngredientInRecipe";

export interface IRecipe extends IBaseEntity {
    name: string;
    description?: string;
    content?: string;
    ingredientsInRecipe?: I_IngredientInRecipe[];
}