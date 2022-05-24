import { IBaseEntity } from "../IBaseEntity";
import { IRecipeInMealType } from "./IRecipeInMealType";

export interface IMealType extends IBaseEntity {
    childMealTypes: IMealType[];
    mealTypeName: string;
    recipesInMealType: IRecipeInMealType[];
}