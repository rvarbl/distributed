import { IBaseEntity } from "../IBaseEntity";

export interface IAppUser extends IBaseEntity{
    personName?: string;
    email?: string;
    token?: string;
    refreshToken?: string;
}