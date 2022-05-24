import { IBaseEntity } from "../IBaseEntity";
import { IRecipe } from "./IRecipe";
import { IRecipeInMealPlan } from "./IRecipesInMealPlan";

export interface IMealPlan extends IBaseEntity{
    mealPlanName: string;
    mealPlanDescription: string;
    recipesInMealPlan: IRecipeInMealPlan[];
}