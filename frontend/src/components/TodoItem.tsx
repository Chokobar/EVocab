import * as React from 'react';

interface ITodoItemProps {
    listItems: any[];
}

export const TodoItem = (props: ITodoItemProps) => {
    return (
        <div>
            <ul className="list-group">
                {props.listItems.map((value ,index)=>{
                     return <li key={value} className="list-group-item col-sm-3">{value}</li>
                })}
            </ul>
        </div>
    )
}