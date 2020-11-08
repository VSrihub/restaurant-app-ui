import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "../Header";
import Home from "../Home";
import { Link } from "react-router-dom";
import MerchantDashboard from "../MerchantDashboard";
import CategoryService from "../../Service/CategoryService";

/**
 * this shuld be the dyncmic list to show the
 * categories in the drop down
 */
const patCategoryList = [
  {
    value: "Select option",
    label: "Select option",
  },
  {
    value: "Biryani",
    label: "Biryani",
  },
  {
    value: "Salads",
    label: "Salads",
  },
];

/**
 * this can be the static dropdown
 * as the values either of the one
 */
const categoryStatusList = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "In Active",
    label: "In Active",
  },
];

export class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catName: "",
      patCat: "",
      image: "",
      isOffer: "",
      status: "Active",
      checked: false,
    };
    // this.state.data.error = null;
    this.readForm = this.readForm.bind(this);
    this.doAddCategory = this.doAddCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } //constructor end

  readForm = (e) => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  doAddCategory = (e) => {
    e.preventDefault();
    let category = this.state.catName;

    let addCatObj = {
      catName: this.state.catName,
      patCat: this.state.patCat,
      catImage: this.state.image,
      isOffer: this.state.checked,
      status: this.state.status,
    };

    console.log("i am in doregister " + JSON.stringify(addCatObj));

    CategoryService.addCategory(addCatObj).then(
      (resp) => {
        console.log(resp.data);
        let id = resp.data.id;
        if (id != 0) {
          this.props.history.push("/viewCategory");
        }
      },
      (error) => {
        console.error("Error is " + error.data);
      }
    );
  };

  handleChange = (event) => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    return (
      <div>
        <MerchantDashboard />
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
              {/* <img src={UserSelfReg} height="80px"></img> */}
              Add Category
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
              label="Category"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="catName"
              onChange={this.readForm}
            />
            <TextField
              id="outlined-required"
              select
              label="Parent Category"
              value={this.state.patCat}
              name="patCat"
              onChange={this.readForm}
              SelectProps={{
                native: true,
              }}
              helperText="Select the Parent Category"
              variant="outlined"
            >
              {patCategoryList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="component-outlined"
              label="Image"
              // defaultValue="Hello World"
              variant="outlined"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="image"
              type="file"
              onChange={this.readForm}
            />
            {/* <TextField
              id="outlined-required"
              label="Is Offer"
              // defaultValue="Hello World"
              variant="outlined"
              type="text"
              color="primary"
              fullWidth
              margin="normal"
              size="normal"
              name="isOffer"
              onChange={this.readForm}
            /> */}
            <Typography>
              Is Offer ?
              <Checkbox
                checked={this.checked}
                onChange={this.handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Typography>
            <TextField
              id="outlined-required"
              select
              label="Status"
              value={this.state.status}
              name="status"
              onChange={this.readForm}
              SelectProps={{
                native: true,
              }}
              helperText="Select the Status"
              variant="outlined"
            >
              {categoryStatusList.map((option) => (
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
              onClick={this.doAddCategory}
            >
              Add Category
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default AddCategory;
