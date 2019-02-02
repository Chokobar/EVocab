import React from "react";
import { addingAuthKey, authKey } from "../Helper/Utility.js";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: "",
            password: "",
        }
    }

    onChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        axios.post("/api/auth", {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            if (response.data) {
                console.log("You have just logged in!");
                addingAuthKey(response.headers[authKey]);
                this.setState({
                    redirectToReferrer: true
                })
                this.props.changeLoginState();
            } else {
                console.log("You are rejected to log in please contact admin.")
            }
        })
        .catch((error) => {
            console.log(error)
        });

        event.preventDefault();
    }

    logInForm = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input 
                        name="email"
                        className="col-sm-3 form-control" 
                        placeholder="your email here" 
                        value={this.state.email} 
                        onChange={this.onChangeText}
                    ></input>
                    <input 
                        name="password"
                        className="col-sm-3 form-control" 
                        placeholder="your password here" 
                        value={this.state.password} 
                        onChange={this.onChangeText}
                    ></input>
                    <button type="submit" className="col-sm-3 btn btn-danger">Submit</button>
                </div>
            </form>
        );
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                {this.logInForm()}
            </div>
        )
    }
}
