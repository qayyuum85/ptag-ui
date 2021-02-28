import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

interface LocationState {
    from: {
      pathname: string;
    };
  }

const Login: React.FunctionComponent = (props) => {
    const txtUsernameRef = useRef<HTMLInputElement>(null);
    const txtPasswordRef = useRef<HTMLInputElement>(null);

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // const username = txtUsernameRef.current!.value;
        // const password = txtPasswordRef.current!.value;
        login();
    };

    let history = useHistory();
    let location = useLocation<LocationState>();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };

    let login = () => {
        auth.signin(() => {
            console.log('from', from)
            if (from.pathname === '/') {
                history.replace('/home');
                return;
            }

            history.replace(from);
        });
    };

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
                    type="text"
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
