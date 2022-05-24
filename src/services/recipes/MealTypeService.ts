import { IMealType } from "../../domain/recipes/IMealType";
import { BaseService } from "../BaseService";

export class MealTypeService extends BaseService<IMealType>{
    constructor() {
        super("recipes/mealtype")
    }


}