import ApiClient from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

// Configuração API client
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

const apiClient = new ApiClient(BASE_URL);

// serviço específico
class UserService {
    static async getUsers() {
        return apiClient.get(API_ENDPOINTS.USERS.BASE);
    }

    static async getUserById(id: string) {
        return apiClient.get(API_ENDPOINTS.USERS.BY_ID(id));
    }

    static async updateUser(id: string, userData: any) {
        return apiClient.put(API_ENDPOINTS.USERS.BY_ID(id), userData);
    }
}

class AuthService {
    static async login(credentials: { email: string; password: string }) {
        return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    }

    static async logout() {
        return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    }
}

export { apiClient, UserService, AuthService, API_ENDPOINTS };