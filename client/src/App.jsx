import React from 'react';
import { HashRouter, Route, Link} from "react-router-dom";
import BaseRouter from './components/Base/BaseRoute.jsx';

const App = () => {
    return (
      <HashRouter>
        <BaseRouter />
      </HashRouter>
    );
  };

 export default App;