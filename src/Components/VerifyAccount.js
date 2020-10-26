import React, { Component } from "react";

export class VerifyAccount extends Component {
  componentDidMount() {
    console.log(this.props.match.params.email);

    //this.props.match.params.id;
    let userEmail = this.props.match.params.email;
    console.log("user account to be verify is " + userEmail);

    //we will make a call to verify account

    //based on response we will render either login form or change password form
  }

  render() {
    return <div></div>;
  }
}

export default VerifyAccount;
