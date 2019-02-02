import React from "react";
import { Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import Login from "./Login.jsx";
import withLoading from "./withLoading.jsx";
import axios from "axios";
import { authKey, getAuthToken } from "../Helper/Utility.js";

const Index = () => <h2>fromIndex</h2>;
const Public = () => <h2>From public</h2>;
const Protected = () => <h2>from protected</h2>;

class BaseRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        const hasToken = getAuthToken();
        console.log(`has token? ${hasToken}`);
        if (hasToken) {
            axios.post("/api/auth/verify", {
                headers: {
                    authKey: [getAuthToken()]
                }
            })
            .then((response) => {
                if (response.data) {
                    console.log("logged in");
                    this.setState({
                        isLoggedIn: true
                    })
                } else {
                    console.log("You are not verify as log in.");
                    this.logOut();
                }
            })
            .catch((error) => {
                console.log(error);
                this.logOut();
            });
        };
    };

    changeLoginState = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        });
    };

    logOut = () => {
        localStorage.clear();
        this.changeLoginState();
        <Redirect to={{ pathname: '/'}} />
    }

    AuthButton = withRouter(({history}) => (
            this.state.isLoggedIn ? (
                <div>
                    Welcome!
                    <button onClick={() => { this.logOut(() => history.push('/'))}}>
                        Sign Out
                    </button>
                </div>
            ) :
            (<p>You are not log in</p>)
    ));
    
    PrivateRoute = ({ component: Component, ...rest}) => {
        return (
            <Route {...rest} render={(props) => {
                return (
                    this.state.isLoggedIn 
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
                )
            }} />
        )
    };

    RouterPassingLoginState = ({ component: Component, ...rest}) => {
        return (
            <Route {...rest} render={(props) => {
                return (
                        <Component {...props} changeLoginState={this.changeLoginState}/>
                )
            }} />
        )
    };

    loggedInRoute = () => {
        return (
            <div>
                IsLoggedIn
                <this.AuthButton />
            </div>
        );
    };

    notLoggedInRoute = () => {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/public/">public</Link>
                        </li>
                        <li>
                            <Link to="/protected/">protected</Link>
                        </li>
                    </ul>
                </nav>
                <this.AuthButton />
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/public" exact component={Public} />
                    <this.RouterPassingLoginState path="/login" component={Login} />
                    <this.PrivateRoute path="/protected" component={Protected} />
                    <Route path="*" component={()=>(<div>No Page You Are Looking For.</div>)} />
                </Switch>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? this.loggedInRoute() : this.notLoggedInRoute()}
            </div>
        );
    };
}

export default BaseRoute;