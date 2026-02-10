import api from "@/lib/api";

export interface User {
    _id: string;
    email: string;
    full_name?: string;
    isActive: boolean;
    roles: string[];
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export const authService = {
    login: async (username: string, password: string): Promise<AuthResponse> => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const { data } = await api.post<AuthResponse>("/auth/login", formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return data;
    },

    register: async (email: string, password: string, fullName: string): Promise<User> => {
        const { data } = await api.post<User>("/auth/register", {
            email,
            password,
            full_name: fullName,
        });
        return data;
    },

    getCurrentUser: async (): Promise<User> => {
        const { data } = await api.get<User>("/auth/me");
        return data;
    },
};
