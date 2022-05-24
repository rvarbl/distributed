import { IRecipe } from "../../domain/recipes/IRecipe";
import { BaseService } from "../BaseService";

export class RecipeService extends BaseService<IRecipe>{
    constructor(){
        super("recipes/Recipe")
    }

    
}