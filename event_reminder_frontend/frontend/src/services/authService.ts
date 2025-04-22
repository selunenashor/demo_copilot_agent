import apiClient from './api';

// Định nghĩa kiểu dữ liệu dựa trên api.yaml (có thể tách ra file types.ts riêng nếu cần)
interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}

// Các hàm gọi API liên quan đến Authentication
export const registerUser = (userData: any) => {
    return apiClient.post('/register', userData);
};

export const loginUser = (credentials: any): Promise<{ data: LoginResponse }> => {
    return apiClient.post('/login', credentials);
};

export const logoutUser = () => {
    return apiClient.post('/logout');
};

export const getCurrentUser = (): Promise<{ data: User }> => {
    return apiClient.get('/user');
};
