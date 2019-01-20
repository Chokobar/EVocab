import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
      <div>
        <p>React here!</p>
        <button type="button" class="btn btn-success">Success</button>
      </div>
    );
  };

  export default App;
  
  ReactDOM.render(<App />, document.getElementById("root"));