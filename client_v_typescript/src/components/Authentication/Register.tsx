import * as React from "react";
import axios from "axios";
import { addingKey, authKey } from "../Helper/UserUtilities";
import { Redirect } from "react-router-dom";

declare namespace RegisterUser {
    interface Props {
        login: any,
    }
    interface State {
        email: string,
        password: string,
        username: string
    }
}

export class RegisterUser extends React.Component<RegisterUser.Props,RegisterUser.State>{
    constructor(props: RegisterUser.Props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
        }
    }

    onChangeText = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    }

    onSubmitText = (event: any) => {
        axios.post("/api/users/register", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
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
    
    render(){
        return (
            <form onSubmit={this.onSubmitText}>
                <div className="form-group">
                    <input 
                        name="username"
                        className="col-sm-3 form-control" 
                        placeholder="your username here" 
                        value={this.state.username} 
                        onChange={this.onChangeText}
                    ></input>
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
        )
    }
}