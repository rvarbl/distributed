export interface IErrorResponse {
    type: string;
    title: string,
    status: number;
    traceId: string;
    errors: Map<string, string[]>
}