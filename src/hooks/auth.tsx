import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";

enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    PARENT = "PARENT",
}
interface AccessTokenData {
    userId: number;
    email: string;
    roles: Role[];
}

const login = async (username: string, password: string) => {
    const result = await axios.post<AccessTokenData>(
        "/login",
        {
            username,
            password,
        },
        {
            baseURL: "http://localhost:7070",
        }
    );

    return result;
};

const logout = async () => {
    await axios.get("/logout", {
        baseURL: "http://localhost:7070",
    });
};

const auth = {
    isAuthenticated: false,
    async signin(username: string, password: string) {
        try {
            const response = await login(username, password);
            auth.isAuthenticated = true;
            return response.data;
        } catch (error: unknown) {
            auth.isAuthenticated = false;
            return null;
        }
    },
    async signout() {
        try {
            auth.isAuthenticated = false;
            await logout();
        } catch (error) {
            console.log(error);
        }
    },
};

const authContext = createContext<ProvideAuthType>(undefined!);

export const ProvideAuth: React.FunctionComponent = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState<AccessTokenData | null>(null);

    const signin = async (username: string, password: string) => {
        const user = await auth.signin(username, password);
        if (user) {
            setUser(user);
            return true;
        }

        return false;
    };

    const signout = async () => {
        await auth.signout();
        setUser(null);
    };

    return {
        user,
        signin,
        signout,
    };
}

type ProvideAuthType = ReturnType<typeof useProvideAuth>;
