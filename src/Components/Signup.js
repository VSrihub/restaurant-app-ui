import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import UserSelfReg from "../media/UserSelfReg.png";
import UserRegService from "../Service/UserRegService";
import { Link } from "react-router-dom";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      userId: "",
      password: "",
      cpassword: "",
      mobile: "",
      dataError: null,
      shouldOpenDialogue: false,
    };
    // this.state.data.error = null;
    this.readForm = this.readForm.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.handleClose = this.handleClose.bind(this);
  } //constructor end

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
    this.state.cpassword_error = null;

    // step-1
    let email = this.state.email;
    let password = this.state.password;
    let cpassword = this.state.cpassword;

    //step-4
    if (email == null || email == "") {
      this.state.email_error = "Email shoud not be empty or null";
      dataVlaid = false;
    }

    if (password == null || password == "") {
      this.state.password_error = "Password should not be empty or null";
      dataVlaid = false;
    }

    if (cpassword == null || cpassword == "") {
      this.state.password_error =
        "Confirm Password should not be empty or null";
      dataVlaid = false;
    }

    if (!(password == cpassword)) {
      this.state.cpassword_error =
        "Password and Confirm Password should be match";
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
        cpassword: this.state.cpassword,
        mobile: this.state.mobile,
      };
      console.log("user registration data is");
      console.log(JSON.stringify(user));

      UserRegService.createUser(user).then(
        (resp) => {
          console.log(resp.data);

          //update dialogue box
          this.setState({ shouldOpenDialogue: true });
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

  handleClose = () => {
    this.setState({ shouldOpenDialogue: false });
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
              error={this.state.cpassword_error != null}
              helperText={this.state.cpassword_error}
            />
            <TextField
              id="outlined-required"
              label="Mobile"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="mobile"
              onChange={this.readForm}
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

          {/* Dialogue Box to show the User Registration has confirmed */}
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.shouldOpenDialogue}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
            >
              <Typography color="primary">
                User Registration Successfull
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                A Verification Email has been sent to you email:
                {this.state.email}
                Please Click on Verification Link and Activate the account
              </Typography>
              <Typography gutterBottom>
                If already activated, Please Click on
                <Link to="/login">Here</Link> to Login
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleClose} color="primary">
                close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    );
  }
}

export default Signup;
