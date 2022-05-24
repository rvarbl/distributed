import { useContext } from "react";
import { IOrder } from "../../domain/orders/IOrder";
import { IOrderRow } from "../../domain/orders/IOrderRow";
import { AppContext } from "../../state/AppContext";
import { BaseService } from "../BaseService";
import httpClient from "../HttpClient";

export class OrderService extends BaseService<IOrder>{
    constructor(){
        super("orders/order")
    }

}