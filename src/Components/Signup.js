import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import UserSelfReg from "../media/UserSelfReg.png";
import UserRegService from "../Service/UserRegService";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      userId: "",
      password: "",
      dataError: null,
    };
    // this.state.data.error = null;
    this.readForm = this.readForm.bind(this);
    this.doRegister = this.doRegister.bind(this);
  }

  readForm = (e) => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  doRegister = (e) => {
    e.preventDefault();
    console.log("i am in doregister");

    //step-3
    let dataVlaid = true;

    // this.state.data.error = null;
    //step-2
    this.state.email_error = null;
    this.state.password_error = null;

    // step-1
    let email = this.state.email;
    let password = this.state.password;

    //step-4
    if (email == null || email == "") {
      this.state.email_error = "Email shoud not be empty or null";
      dataVlaid = false;
    }

    if (password == null || password == "") {
      this.state.password_error = "Password should not be empty or null";
      dataVlaid = false;
    }

    //update the state when the form is submitted
    this.setState({
      update: true,
    });

    if (dataVlaid) {
      let user = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        userId: this.state.userId,
        password: this.state.password,
      };
      console.log("user registration data is");
      console.log(JSON.stringify(user));

      UserRegService.createUser(user).then(
        (resp) => {
          console.log(resp.data);
        },
        (error) => {
          console.log("error is " + error.message);
          let erorMessage =
            "issue with the backend servce. it may be down or may have errors ";
          this.setState({
            dataError: erorMessage,
          });
        }
      );
    } else {
      console.log("data is invalid");
    }
  };

  render() {
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
            <Typography color="primary">
              <img src={UserSelfReg} height="80px"></img>
              User Self Registration
            </Typography>
            {this.state.dataError != null && (
              <Box
                bgcolor="white"
                boxShadow="2"
                borderRadius="12px"
                textAlign="text"
                p="10px"
                mt="10px"
              >
                <Typography color="error">{this.state.dataError}</Typography>
              </Box>
            )}

            <TextField
              id="outlined-required"
              label="First Name"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="fname"
              onChange={this.readForm}
            />
            <TextField
              id="outlined-required"
              label="Last Name"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="lname"
              onChange={this.readForm}
            />
            <TextField
              id="outlined-required"
              label="Email"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="email"
              onChange={this.readForm}
              error={this.state.email_error != null}
              helperText={this.state.email_error}
            />
            <TextField
              id="outlined-required"
              label="User Id"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="userId"
              onChange={this.readForm}
            />
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
              error={this.state.password_error != null}
              helperText={this.state.password_error}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.doRegister}
            >
              Register
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Signup;
