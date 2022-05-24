import { AxiosError } from "axios";
import { useContext } from "react";
import Logout from "../components/identity/Logout";
import { IAppUser } from "../domain/identity/IAppUser";
import { AppContext } from "../state/AppContext";
import httpClient from "./HttpClient";
import { AuthenticationService } from "./identity/AuthenticationService";

export class BaseService<TEntity>{
    appState = useContext(AppContext);
    authService = new AuthenticationService();

    constructor(private path: string) {
    }

    async getAll(): Promise<TEntity[]> {
        try {
            let response = await httpClient.get(`/${this.path}`, {
                headers: {
                    "Authorization": "Bearer " + this.appState.user?.token,
                    "Accept-Language": this.appState.culture ?? "en-US"
                }
            });
            let result = response.data as TEntity[];
            return result;
        } catch (error) {
            let response = (error as AxiosError).response;
            if (response !== undefined
                && response.status === 401
                && this.appState.user?.refreshToken !== null
            ) {
                try {
                    let refreshResponse = await this.authService.refreshToken();
                    this.appState.setUser(refreshResponse.data as IAppUser)
                    let response = await httpClient.get(`/${this.path}`, {
                        headers: { "Authorization": "Bearer " + this.appState.user?.token }
                    });
                    let result = response.data as TEntity[];
                    return result;
                } catch (error) {

                    console.log(error);
                }
            }
        }
        return [];
    }

    async get(id: string): Promise<TEntity | null> {
        try {
            let response = await httpClient.get(`/${this.path}/${id}`, {
                headers: {
                    "Authorization": "Bearer " + this.appState.user?.token,
                    "Accept-Language": this.appState.culture ?? "en-US"
                }
            });
            let result = response.data as TEntity;
            return result;
        } catch (error) {
            let response = (error as AxiosError).response;
            if (response !== undefined
                && response.status === 401
                && this.appState.user?.refreshToken !== null
            ) {
                try {
                    let refreshResponse = await this.authService.refreshToken();
                    this.appState.setUser(refreshResponse.data as IAppUser)
                    let response = await httpClient.get(`/${this.path}`, {
                        headers: {
                            "Authorization": "Bearer " + this.appState.user?.token,
                            "Accept-Language": this.appState.culture ?? "en-US"
                        }
                    });
                    let result = response.data as TEntity;
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return null;
    }

    async post(entity: TEntity) {
        console.log("add");
        let response;
        try {
            response = await httpClient.post(`/${this.path}`, entity,
                {
                    headers: {
                        "Authorization": "Bearer " + this.appState.user?.token,
                        "Accept-Language": this.appState.culture ?? "en-US"
                    }
                }
            );
            let result = response.data as TEntity;
            return result;
        }
        catch (error) {
            let response = (error as AxiosError).response;
            if (response !== undefined
                && response.status === 401
                && this.appState.user?.refreshToken !== null
            ) {
                try {
                    let refreshResponse = await this.authService.refreshToken();
                    this.appState.setUser(refreshResponse.data as IAppUser)
                    let response = await httpClient.post(`/${this.path}`, {
                        headers: {
                            "Authorization": "Bearer " + this.appState.user?.token,
                            "Accept-Language": this.appState.culture ?? "en-US"
                        }
                    });
                    let result = response.data as TEntity;
                    return result;
                } catch (error) {
                    return(Logout())
                }
            }
        }
    }
}