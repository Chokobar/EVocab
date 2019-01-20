import * as React from "react";
import { Route, Link } from "react-router-dom";
import { Home } from "../Base/Home";
import { User } from "../Base/User";
import { RegisterUser } from "../Authentication/Register";

const Index = () => <Home />
const Profile = () => <User />

export const BaseRouter = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile/">Profile</Link>
                    </li>
                </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/profile/" component={Profile} />
            <Route path="/register/" component={RegisterUser} />
        </div>
    );
};
