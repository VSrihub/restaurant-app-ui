import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import AuthnService from "../Service/AuthnService";
import Header from "./Header";
import Home from "./Home";

const authMethodList = [
  {
    value: "IDPLogin",
    label: "IDP Login",
  },
  {
    value: "DBLogin",
    label: "Database Login",
  },
];

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eamil: "",
      password: "",
      authnMethod: "",
    };

    this.readForm = this.readForm.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  readForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  doLogin = (e) => {
    let loginData = {
      email: this.state.email,
      password: this.state.password,

      authnMethod: this.state.authnMethod,
    };

    console.log("login data is " + JSON.stringify(loginData));

    AuthnService.doLogin(loginData).then(
      (resp) => {
        console.log("login resp is " + JSON.stringify(resp.data));
        //render the dashboard if the authenticated is true
        this.props.history.push("/dashboard");
      },
      (error) => {
        console.log(error.data);
      }
    );
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
            <Typography color="primary">Login Here</Typography>

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
              //   error={this.state.password_error != null}
              //   helperText={this.state.password_error}
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
              //   error={this.state.cpassword_error != null}
              //   helperText={this.state.cpassword_error}
            />
            <TextField
              id="outlined-select-currency-native"
              select
              label="Authentation Method"
              value={this.state.authnMethod}
              name="authnMethod"
              onChange={this.readForm}
              SelectProps={{
                native: true,
              }}
              helperText="Please select Authentication Method"
              variant="outlined"
            >
              {authMethodList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.doLogin}
            >
              Login
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Login;
