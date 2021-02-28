import React, { useState, useContext, createContext } from "react";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: Function) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: Function) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
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
    const [user, setUser] = useState<string | null>(null);

    const signin = (cb: Function) => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = (cb: Function) => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout,
    };
}

type ProvideAuthType = ReturnType<typeof useProvideAuth>;
