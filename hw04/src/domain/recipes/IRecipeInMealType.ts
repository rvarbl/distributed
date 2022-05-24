import { IBaseEntity } from "../IBaseEntity";
import { IRecipe } from "./IRecipe";

export interface IRecipeInMealType extends IBaseEntity {
    recipe: IRecipe;
}