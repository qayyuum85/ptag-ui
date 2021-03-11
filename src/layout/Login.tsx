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
        <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    Login to your account
                </h1>
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <label htmlFor="txtUsername">Username</label>
                        <input
                            type="text"
                            name="txtUsername"
                            id="txtUsername"
                            ref={txtUsernameRef}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div>
                        <label htmlFor="txtPassword">Password</label>
                        <input
                            type="password"
                            name="txtPassword"
                            id="txtPassword"
                            ref={txtPasswordRef}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <button type="submit"
                            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
