import * as React from "react";
import { Hello } from "../Example/Hello";
import { TodoLists } from "../Example/TodoLists";

export const Home = () => {
    return (
        <div>
            <Hello greeting="Purkin" />
            <TodoLists />
        </div>
    );
}