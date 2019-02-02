import * as React from "react";
import ReactDOM from "react-dom";

class testComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
        hey
      </form>
    );
  }
}
export default testComponent;