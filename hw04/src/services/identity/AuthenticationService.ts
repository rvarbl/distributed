import { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../components/Home";
import { IRegister } from "../../domain/identity/IRegister";
import { AppContext } from "../../state/AppContext";
import httpClient from "../HttpClient";
import { IErrorResponse } from "../response/IErrorResponse";
import { IJWTResponse } from "../response/IJwtResponse";
import { IServiceResponse } from "../response/IServiceResponse";

export class AuthenticationService {
    path: string = "/identity/authentication";
    appState = useContext(AppContext);

    async get() {
        let response = await httpClient.get(`${this.path}/get`);
        console.log(response.status);
    }

    async login(email: string, password: string): Promise<IServiceResponse<IJWTResponse>> {
        console.log("login");
        let response;
        try {
            let loginInfo = { email, password }
            response = await httpClient.post(`${this.path}/login`, loginInfo);
        }
        catch (error) {
            let axiosError = error as AxiosError;
            return {
                status: axiosError.response!.status,
                errorResponse: axiosError.response?.data as IErrorResponse
            };
        }

        console.log("login success");
        return {
            status: response.status,
            data: response.data as IJWTResponse,
        };
    }

    async register(registerDto: IRegister) {
        console.log("register");
        let response;
        try {
            response = await httpClient.post(`${this.path}/register`, registerDto);
        }
        catch (error) {
            let axiosError = error as AxiosError;
            return {
                status: axiosError.response!.status,
                errorResponse: axiosError.response?.data as IErrorResponse
            };
        }

        return {
            status: response.status,
            data: response.data as IJWTResponse,
        };
    }

    async refreshToken(): Promise<IServiceResponse<IJWTResponse>> {
        let response;
        let token = this.appState.user?.token;
        let refreshToken = this.appState.user?.refreshToken;
        try {
            let tokenInfo = { jwt: token, refreshToken: refreshToken }
            response = await httpClient.post(`${this.path}/refreshtoken`, tokenInfo);
        }
        catch (error) {
            let axiosError = error as AxiosError;
            return {
                status: axiosError.response!.status,
                errorResponse: axiosError.response?.data as IErrorResponse
            };
        }

        return {
            status: response.status,
            data: response.data as IJWTResponse,
        };
    }

    
}