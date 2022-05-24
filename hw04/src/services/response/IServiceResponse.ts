import type { IErrorResponse } from "./IErrorResponse";

export interface IServiceResponse<TData> {
    status: number;
    data?: TData;
    errorMessage?: string;
    errorResponse?: IErrorResponse;
}