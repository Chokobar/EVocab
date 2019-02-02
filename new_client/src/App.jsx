import React from 'react';
import ReactDOM from 'react-dom';
import testComponent from './componenets/testComponent.jsx';
import test2 from './componenets/test2.jsx';

const App = () => {
    return (
        <div>
            <test2 />
        </div>
    );
  };
  
ReactDOM.render(<App />, document.getElementById("root"));

export default App;