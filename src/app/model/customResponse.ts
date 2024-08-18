
export interface CustomResponse<TData = unknown> {
    Message: string;
    Data: TData | null;
    Success: boolean;
}