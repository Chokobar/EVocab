import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseRouter } from "./components/Base/BaseRouter";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

export const App = () => {
    return (
        <HashRouter>
          <BaseRouter />
        </HashRouter>
    );
};

export default App; 