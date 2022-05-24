import React from "react";
import { IAppUser } from "../domain/identity/IAppUser";
import { IAppState } from "./IAppState";

export const initialState: IAppState = {
     setUser: (user: IAppUser | undefined) =>{},
};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider;