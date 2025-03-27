import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError, ApiRequestConfig, HttpMethod } from './apiTypes';

class ApiClient {
    private axiosInstance: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios.create({
        baseURL: this.baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {

        // Interceptor de request
        this.axiosInstance.interceptors.request.use((config) => {
                // lógica antes do request
                // adicionar tokens de autenticação
                const token = localStorage.getItem('authToken');
                if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
        });

        // Interceptor de response
        this.axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            // Tratamento padrão de erros
            const apiError: ApiError = {
            message: error.message,
            status: error.response?.status,
            code: error.code,
            details: error.response?.data,
            timestamp: new Date().toISOString(),
            };
            return Promise.reject(apiError);
        }
        );
    }

    public async request<T>(
        method: HttpMethod,
        endpoint: string,
        data?: any,
        config?: ApiRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
        const axiosConfig: AxiosRequestConfig = {
            method,
            url: endpoint,
            data,
            ...config,
        };

        const response: AxiosResponse<T> = await this.axiosInstance.request(axiosConfig);

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
        } catch (error) {
        throw this.handleError(error);
        }
    }

    private handleError(error: unknown): ApiError {
        if (axios.isAxiosError(error)) {
        return {
            message: error.message,
            status: error.response?.status,
            code: error.code,
            details: error.response?.data,
            timestamp: new Date().toISOString(),
        };
        }

        return {
        message: 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        };
    }

    // Métodos HTTP simplificados
    public async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('GET', endpoint, undefined, config);
    }

    public async post<T>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('POST', endpoint, data, config);
    }

    public async put<T>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('PUT', endpoint, data, config);
    }

    public async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', endpoint, undefined, config);
    }

    public async patch<T>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('PATCH', endpoint, data, config);
    }
}

export default ApiClient;