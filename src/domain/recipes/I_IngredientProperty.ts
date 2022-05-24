import { IBaseEntity } from "../IBaseEntity";
import { IUnit } from "./IUnit";

export interface I_IngredientProperty extends IBaseEntity {
    ingredientPropertyName: string;
    unit: IUnit;
}