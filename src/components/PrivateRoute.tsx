import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const PrivateRoute: React.FunctionComponent<{path: string}> = ({
    children,
    ...rest
}) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
