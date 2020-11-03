import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Router } from "@material-ui/icons";
import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import UserRegService from "../Service/UserRegService";
import Header from "./Header";

export class Changepassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      cpassword: "",
      doesPwdChanged: false,
    };
    this.doPasswordChange = this.doPasswordChange.bind(this);
    this.readForm = this.readForm.bind(this);
  }

  doPasswordChange = (e) => {
    e.preventDefault();
    console.log("do change password here");
    let password = this.state.password;
    let cpassword = this.state.cpassword;
    let email = localStorage.getItem("email");

    let userData = {
      email: email,
      password: password,
      cpassword: cpassword,
    };

    console.log("user change password data is " + JSON.stringify(userData));

    //Backend API to change the password in local DB as well as in auth0 IDP
    UserRegService.changePassword(userData).then(
      (resp) => {
        let doespwdChanged = resp.data.pwdChanged;
        console.log("response id " + resp.data.pwdChanged);
        this.setState({ doesPwdChanged: true });
        console.log("does password changed  " + this.state.doesPwdChanged);
      },
      (error) => {
        console.log("error is " + error.data);
      }
    );
  };

  readForm = (e) => {
    // e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { doesPwdChanged } = this.state;
    if (doesPwdChanged) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Header />

        <Container maxWidth="sm">
          <Box
            bgcolor="white"
            boxShadow="2"
            borderRadius="12px"
            textAlign="text"
            p="24px"
            mt="50px"
          >
            <Typography color="primary">Change password Here</Typography>

            <TextField
              id="outlined-required"
              label="Password"
              // defaultValue="Hello World"
              variant="outlined"
              type="password"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="password"
              onChange={this.readForm}
              //   error={this.state.password_error != null}
              //   helperText={this.state.password_error}
            />
            <TextField
              id="outlined-required"
              label="Confirm Password"
              // defaultValue="Hello World"
              variant="outlined"
              type="password"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="cpassword"
              onChange={this.readForm}
              //   error={this.state.cpassword_error != null}
              //   helperText={this.state.cpassword_error}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.doPasswordChange}
            >
              Change Password
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Changepassword;
