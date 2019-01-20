import * as React from "react";
import axios from "axios";
import { authKey, addingKey } from "../Helper/UserUtilities";
import { Link } from "react-router-dom";
import { RegisterUser } from "./Register";

declare namespace LoginUser {
    interface Props {
        login: any;
    }
    interface State {
        email: string,
        password: string,
        isRegister: boolean
    }
}

export class LoginUser extends React.Component<LoginUser.Props,LoginUser.State>{
    constructor(props: LoginUser.Props){
        super(props);
        this.state = {
            email: "",
            password: "",
            isRegister: false
        }
    }

    onChangeText = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    }

    onSubmitText = (event: any) => {
        axios.post("/api/auth", {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
                console.log(res);
                const isSuccess = addingKey(res.headers[authKey]);
                if (isSuccess) {
                    this.props.login();
                    return true;
                }
                return false
            })
        .catch(err => console.log(err));

        event.preventDefault();
    }

    onChangeRegisterState = () => {
        this.setState({ isRegister: !this.state.isRegister })
    }

    logInForm = () => {
        return (
            <form onSubmit={this.onSubmitText}>
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

    registerForm = (props: LoginUser.Props) => {
        return (
            <div>
                <RegisterUser login={props.login} />
            </div>
        );
    };
    
    render(){
        return (
            <div>
                {this.state.isRegister ? this.registerForm(this.props) : this.logInForm()}
                <button onClick={this.onChangeRegisterState}>
                        {this.state.isRegister ? "Log In" : "Register"}
                </button>
            </div>
        );
    }
}