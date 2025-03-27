export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
}
  
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
    details?: any;
    timestamp?: string;
}
  
export interface ApiRequestConfig {
    headers?: Record<string, string>;
    params?: any;
    timeout?: number;
    auth?: {
        username: string;
        password: string;
    };
}
  
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';