import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "../Header";
import Home from "../Home";
import { Link } from "react-router-dom";
import MerchantDashboard from "../MerchantDashboard";
import CategoryService from "../../Service/CategoryService";
import FoodService from "../../Service/FoodService";

const foodStatusList = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "In Active",
  },
];

export class AddFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: {
        catName: "",
        foodName: "",
        image: "",
        notes: "",
        description: "",
        vat: "",
        offer: false,
        special: false,
        cookingTime: "",
        status: false,
      },
      checked: false,
      catList: [],
    };
    // this.state.data.error = null;
    this.readForm = this.readForm.bind(this);
    this.doAddFood = this.doAddFood.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } //constructor end

  readForm = (e) => {
    //console.log(e.target.value);
    //this.setState({ [e.target.name]: e.target.value });
    this.setState(
      Object.assign(this.state.food, { [e.target.name]: e.target.value })
    );
  };

  componentDidMount() {
    CategoryService.fetchAllCategories().then((resp) => {
      console.log("backend categories are " + JSON.stringify(resp.data));
      //this.state.catList = resp.data;
      this.setState({ catList: resp.data });
    });
  }

  doAddFood = (e) => {
    e.preventDefault();
    console.log("i am in add Food " + JSON.stringify(this.state.food));
    FoodService.addFood(this.state.food).then(
      (resp) => {
        console.log(resp.data);
        this.props.history.push("/viewFood");
      },
      (error) => {
        console.log(error.data);
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
            p="25px"
            mt="50px"
          >
            <Typography>Add Food</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  bgcolor="white"
                  boxShadow="2"
                  borderRadius="12px"
                  textAlign="text"
                  p="12px"
                  mt="25px"
                >
                  <TextField
                    id="outlined-required"
                    select
                    label="Select Option"
                    value={this.state.patCat}
                    name="catName"
                    onChange={this.readForm}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Category"
                    variant="outlined"
                  >
                    <option value="Select Option">Select Option</option>
                    {this.state.catList.map((option) => (
                      <option key={option.catName} value={option.catName}>
                        {option.catName}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-required"
                    label="Food Name"
                    // defaultValue="Hello World"
                    variant="outlined"
                    type="text"
                    color="primary"
                    fullWidth
                    margin="normal"
                    size="normal"
                    name="foodName"
                    onChange={this.readForm}
                    helperText="Food Name"
                  />
                  <TextField
                    id="outlined-required"
                    label="Add Notes"
                    // defaultValue="Hello World"
                    variant="outlined"
                    type="text"
                    color="primary"
                    fullWidth
                    margin="normal"
                    size="normal"
                    name="notes"
                    onChange={this.readForm}
                    helperText="Notes"
                  />
                  <TextField
                    id="outlined-required"
                    label="Add Desription"
                    // defaultValue="Hello World"
                    variant="outlined"
                    type="text"
                    color="primary"
                    fullWidth
                    margin="normal"
                    size="normal"
                    name="description"
                    onChange={this.readForm}
                    helperText="Description"
                  />

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
                    // type="file"
                    onChange={this.readForm}
                    helperText="Image"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  bgcolor="white"
                  boxShadow="2"
                  borderRadius="12px"
                  textAlign="text"
                  p="12px"
                  mt="25px"
                >
                  <TextField
                    id="outlined-required"
                    label="0%"
                    // defaultValue="Hello World"
                    variant="outlined"
                    type="text"
                    color="primary"
                    fullWidth
                    margin="normal"
                    size="normal"
                    name="vat"
                    onChange={this.readForm}
                    helperText="Vat"
                  />
                  <Typography>
                    Offer ?
                    <Checkbox
                      checked={this.checked}
                      onChange={this.handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      value={this.checked}
                      name="offer"
                    />
                    Special ?
                    <Checkbox
                      checked={this.checked}
                      onChange={this.handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      value={this.checked}
                      name="special"
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
                    {foodStatusList.map((option) => (
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
                    onClick={this.doAddFood}
                  >
                    Add Food
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
}

export default AddFood;
