import { IBaseEntity } from "../IBaseEntity";
import { IPropertyInIngredient } from "./IPropertyInIngredient";
import { IUnit } from "./IUnit";
import { I_IngredientProperty } from "./I_IngredientProperty";

export interface I_Ingredient extends IBaseEntity {
    name: string;
    unit: IUnit;
    propertiesInIngredient: IPropertyInIngredient[]
    price: number;

}