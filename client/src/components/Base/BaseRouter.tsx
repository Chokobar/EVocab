import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "../Base/Home";

const Index = () => <Home />
const User = () => <h2>Coming Soon</h2>

export const BaseRouter = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user/">User</Link>
                    </li>
                    </ul>
                </nav>

                <Route path="/" exact component={Index} />
                <Route path="/user/" component={User} />
            </div>
        </Router>
    );
};
