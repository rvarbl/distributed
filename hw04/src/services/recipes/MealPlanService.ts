import { IMealPlan } from "../../domain/recipes/IMealPlan";
import { BaseService } from "../BaseService";

export class MealPlanService extends BaseService<IMealPlan>{
    constructor() {
        super("recipes/mealplan")
    }
}