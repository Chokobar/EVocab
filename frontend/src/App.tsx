import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./components/Hello";
import { TodoLists } from "./components/TodoLists";

export const App = () => {
    return (
      <div>
        <Hello greeting="Purkin" />
        <TodoLists />
      </div>
    );
  };

export default App;