import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { ProvideAuth } from "./hooks/auth";
import Home from "./layout/Home";
import Login from "./layout/Login";

function App() {
    return (
        <div className="App">
            <ProvideAuth>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/login"></Redirect>}
                        ></Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute path="/home">
                            <Home />
                        </PrivateRoute>
                        <Route render={() => <Redirect to={{pathname: "/"}} />} />
                    </Switch>
                </Router>
            </ProvideAuth>{" "}
        </div>
    );
}

export default App;
