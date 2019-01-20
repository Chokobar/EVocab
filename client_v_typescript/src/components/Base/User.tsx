import * as React from "react";
import { LoginUser } from "../Authentication/Login";
import { checkingLogin, logOut } from "../Helper/UserUtilities";

declare namespace User {
    interface Props {

    }
    interface State {
        email: string,
        password: string,
        isLoggedIn: boolean
    }
}

export class User extends React.Component<User.Props,User.State>{
    constructor(props: User.Props){
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoggedIn: false
        }
    }

    onChangeText = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    };

    onSubmitText = (event: any) => {
        alert(this.state.email+" "+this.state.password);
        event.preventDefault();
    };

    logingOut = () => {
        this.setState({ isLoggedIn: !logOut()})
    };

    logingIn = () => {
        this.setState({ isLoggedIn: true})
    }

    loggedInChecking = () => {
        const isLoggedIn = checkingLogin();
        if (isLoggedIn) return (
            <div>
                <p>Guessing</p>
                <button onClick={this.logingOut}>LogOut</button>
            </div>
        ); else
        return (
            <LoginUser login={this.logingIn} />
        )
    };
    
    render(){

        return (
            <div>
                {this.loggedInChecking()}
            </div>
        )
    }
}