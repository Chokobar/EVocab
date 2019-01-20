import * as React from "react";
import { Hello } from "../Common/Hello";
import { AddingVocab } from "../Common/AddingVocab";
import { checkingLogin, authKey, getToken } from "../Helper/UserUtilities";
import axios from "axios";

declare namespace Home {
    interface Props{

    }
    interface State{
        isLoggedIn: boolean;
    }
}

export class Home extends React.Component<Home.Props,Home.State>{
    constructor(props: Home.Props){
        super(props);
        this.state = {
            isLoggedIn: checkingLogin()
        }
    }

    displayWhenLoggedIn = () => {
        if (this.state.isLoggedIn) {
            axios.get("/api/users/me", {
                headers: {
                    [authKey]: getToken()
                }
            }).then((res) => {
                if (!res.data) return null;
                <Hello greeting={res.data.username} />
            }).catch(err => {
                console.log(err);
            });

            axios.get("/api/vocab/getVocab",{
                headers: {
                    [authKey]: getToken()
                }
            }).then((res) => {
                if (!res.data) return 
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
            
        } else
        return (
            <div>
                <Hello greeting="You need to Log in First!" />
                <AddingVocab />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.displayWhenLoggedIn()}
            </div>
        )
    }
}