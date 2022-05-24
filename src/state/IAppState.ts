import { IAppUser } from "../domain/identity/IAppUser";

export interface IAppState {
    user?: IAppUser;
    culture?: string;

    setUser: (user: IAppUser | undefined) => void;
    
}