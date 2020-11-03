import React, { Component } from "react";
import UserRegService from "../Service/UserRegService";
import Changepassword from "./Changepassword";
import Login from "./Login";

export class VerifyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: false,
      showChangePwdForm: false,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.email);

    //this.props.match.params.id;
    let userEmail = this.props.match.params.email;
    console.log("user account to be verify is " + userEmail);

    UserRegService.fetchUserByEmail(userEmail).then(
      (resp) => {
        let isUserLocked = resp.data.locked;
        console.log("is User Locked?? " + isUserLocked);

        let doesPwdChanged = resp.data.pwdChanged;
        console.log("doesPwdChanged " + doesPwdChanged);

        localStorage.setItem("email", userEmail);

        // if user is unlocked and password not changed then render Change password component
        if (!isUserLocked && !doesPwdChanged) {
          this.setState({ showChangePwdForm: true });
        } else {
          this.setState({ showLoginForm: true });
        }

        // if user is unlocked and password already changed then render Login component
      },
      (error) => {
        console.log(error);
      }
    );

    //we will make a call to verify account

    //based on response we will render either login form or change password form
  }

  render() {
    return (
      <div>
        {this.state.showChangePwdForm && <Changepassword />}
        {this.state.showLoginForm && <Login />}
      </div>
    );
  }
}

export default VerifyAccount;
