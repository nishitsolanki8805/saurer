import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NonAuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.capitalizeFirstLetter.bind(this);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname);
    currentage = currentage.replaceAll("-", " ");

    // document.title = currentage + " | SAURER.";
    currentage = currentage?.split("/");

    let currentage1 = currentage[1] || ' ';

    document.title =
      "  SAURER. | " +
      currentage1.charAt(0).toUpperCase() +
      currentage1.slice(1);
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default withRouter(NonAuthLayout);
