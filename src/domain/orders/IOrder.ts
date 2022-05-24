import { IBaseEntity } from "../IBaseEntity";
import { IOrderRow } from "./IOrderRow";


export interface IOrder extends IBaseEntity {
    orderName: string;
    orderMadeAt?: Date;
    orderCompleted?: Date;
    orderRows?: IOrderRow[];

    orderPrice?: number;

}