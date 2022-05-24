import { IBaseEntity } from "../IBaseEntity";

export interface IUnit extends IBaseEntity{
    unitName: string;
    unitAlias: string;
}