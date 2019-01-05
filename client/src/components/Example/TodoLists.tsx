import * as React from 'react';
import {TodoItem} from './TodoItem';

interface ITodoListsProps{
    
}

interface ITodoListsState{
    textInForm: string,
    listItems: any[];
}

export class TodoLists extends React.Component<ITodoListsProps,ITodoListsState>{
    
    constructor(props: ITodoListsProps){
        super(props);
        this.state = {
            textInForm: "",
            listItems: [],
        }

    }

    onChangeText = (event: any) => {
        this.setState(
            {textInForm: event.target.value}
        )
    }

    onSubmitText = (event: any) => {
        event.preventDefault();
        this.state.textInForm === "" ? 
        console.log("you didn't fill anything") :
        this.setState({
            listItems: [...this.state.listItems, this.state.textInForm],
            textInForm: ""
        })
    }
    
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmitText}>
                    <div className="form-group">
                        <label className="col-sm-12">What activity you wanna do?</label>
                        <input 
                            className="col-sm-3 form-control" 
                            placeholder="enter activity" 
                            value={this.state.textInForm} 
                            onChange={this.onChangeText}
                        ></input>
                        <button type="submit" className="col-sm-3 btn btn-danger">Submit</button>
                        <TodoItem listItems={this.state.listItems} />
                    </div>
                </form>
            </div>
        )
    }
}