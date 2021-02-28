import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Home: React.FunctionComponent = () => {
    let history = useHistory();
    let auth = useAuth();
    return (
        <div>
            <h1>Welcome!</h1>
            <button
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </div>
    );
};

export default Home;
