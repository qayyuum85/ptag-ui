import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

interface LocationState {
    from: {
        pathname: string;
    };
}

const Login: React.FunctionComponent = (props) => {
    let history = useHistory();
    let location = useLocation<LocationState>();
    let auth = useAuth();
    const txtUsernameRef = useRef<HTMLInputElement>(null);
    const txtPasswordRef = useRef<HTMLInputElement>(null);

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = txtUsernameRef.current!.value;
        const password = txtPasswordRef.current!.value;
        const isLoggedIn = await auth.signin(username, password);

        if (!isLoggedIn) {
            return;
        }

        console.log("from", from);
        if (from.pathname === "/") {
            history.replace("/home");
            return;
        }

        history.replace(from);
    };

    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <form onSubmit={formSubmitHandler}>
            <div>
                <label htmlFor="txtUsername">Username</label>
                <input
                    type="text"
                    name="txtUsername"
                    id="txtUsername"
                    ref={txtUsernameRef}
                />
            </div>
            <div>
                <label htmlFor="txtPassword">Password</label>
                <input
                    type="password"
                    name="txtPassword"
                    id="txtPassword"
                    ref={txtPasswordRef}
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default Login;
