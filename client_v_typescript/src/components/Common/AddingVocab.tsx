import * as React from 'react';
import { ItemListing } from './ItemListing';

interface AddingVocabProps{
    
}

interface AddingVocabState{
    wording: string,
    meaning: string,
    listItems: any[];
}

export class AddingVocab extends React.Component<AddingVocabProps,AddingVocabState>{
    
    constructor(props: AddingVocabProps){
        super(props);
        this.state = {
            wording: "",
            meaning: "",
            listItems: [],
        }

    }

    onChangeText = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    }

    onSubmitText = (event: any) => {
        event.preventDefault();
        (this.state.wording || this.state.meaning) === "" ? 
        console.log("you didn't fill anything") :
        this.setState({
            listItems: [this.state.wording, this.state.meaning],
            wording: "",
            meaning: ""
        })
    }
    
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmitText}>
                    <div className="form-group">
                        <input 
                            name="wording"
                            className="col-sm-3 form-control" 
                            placeholder="ENTER WORDING" 
                            value={this.state.wording} 
                            onChange={this.onChangeText}
                        ></input>
                        <input 
                            name="meaning"
                            className="col-sm-3 form-control" 
                            placeholder="ENTER MEANING" 
                            value={this.state.meaning} 
                            onChange={this.onChangeText}
                        ></input>
                        <button type="submit" className="col-sm-3 btn btn-danger">Submit</button>
                        <ItemListing listItems={this.state.listItems} />
                    </div>
                </form>
            </div>
        )
    }
}