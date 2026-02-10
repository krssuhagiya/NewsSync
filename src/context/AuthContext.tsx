import React, { createContext, useContext, useEffect, useState } from "react";
import { User, authService } from "@/services/auth-service";
import api from "@/lib/api";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            // Set default header
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error("Auth check failed:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token: string) => {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        checkAuth();
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
