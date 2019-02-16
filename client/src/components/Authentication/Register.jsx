import React from "react";
import { addingAuthKey, authKey } from "../Helper/Utility.js";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: "",
            email: "",
            password: "",
            repassword: ""
        }
    }

    componentDidUpdate() {
        if (this.state.redirectToReferrer) {
            this.props.changeLoginState();
        }
    }

    onChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        axios.post("/api/users/register", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        })
        .then((response) => {
            if (response.data) {
                console.log("You have just registered!");
                addingAuthKey(response.headers[authKey]);
                this.setState({
                    redirectToReferrer: true
                });
            } else {
                console.log("You are rejected to register please contact admin.")
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
                        name="username"
                        className="col-sm-3 form-control" 
                        placeholder="your display name here" 
                        value={this.state.username} 
                        onChange={this.onChangeText}
                    ></input>
                    <input 
                        name="password"
                        type="password"
                        className="col-sm-3 form-control" 
                        placeholder="your password here" 
                        value={this.state.password} 
                        onChange={this.onChangeText}
                    ></input>
                    <input 
                        name="repassword"
                        type="password"
                        className="col-sm-3 form-control" 
                        placeholder="your password again" 
                        value={this.state.repassword} 
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
