import { IBaseEntity } from "../IBaseEntity";
import { IRecipe } from "./IRecipe";

export interface IRecipeInMealPlan extends IBaseEntity {
    recipe: IRecipe;
}