import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
import { Sync } from "@material-ui/icons";
import React, { Component } from "react";
import CategoryService from "../../Service/CategoryService";
import CategoryListGrid from "../CategoryListGrid";
import MerchantDashboard from "../MerchantDashboard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";

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

export class ViewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catList: [],
      shouldOpenDialogue: false,
      category: {
        id: "",
        catName: "",
        patCat: "",
        image: "",
        offer: "",
        status: "Active",
        checked: false,
      },
      id: "",
      catName: "",
      patCat: "",
      image: "",
      offer: "",
      status: "Active",
      checked: false,
    };
    this.deleteCategory = this.deleteCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.readForm = this.readForm.bind(this);
  }

  readForm = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    // console.log("after update   " + this.state.category.catName);
  };

  deleteCategory(id) {
    console.log("i am in delete category " + id);
    CategoryService.deleteCategory(id).then(
      (resp) => {
        this.setState({ catList: resp.data });
      },
      (error) => {
        console.error("error s " + error.data);
      }
    );
  }

  editCategory(id) {
    console.log("i am in edit category" + id);
    CategoryService.getCategory(id).then(
      (resp) => {
        console.log(resp.data);
        this.setState({ category: resp.data });
      },
      (error) => {
        console.error(error.data);
      }
    );

    this.setState({ shouldOpenDialogue: true });
  }

  handleClose = () => {
    let addCatObj = {
      catName: this.state.catName,
      patCat: this.state.patCat,
      catImage: this.state.image,
      isOffer: this.state.checked,
      status: this.state.status,
    };
    console.log(JSON.stringify(addCatObj));

    //do backedn edit categorty

    this.setState({ shouldOpenDialogue: false });
  };

  componentDidMount() {
    CategoryService.fetchAllCategories().then((resp) => {
      console.log("backend categories are " + JSON.stringify(resp.data));
      //this.state.catList = resp.data;
      this.setState({ catList: resp.data });
    });
    // console.log("categories are " + JSON.stringify(this.state.catList));
  }

  render() {
    return (
      <div>
        <MerchantDashboard />
        <Grid container spacing={3}>
          {this.state.catList.map((category) => (
            <Grid item xs={6} sm={3}>
              <Paper>
                {/* <CategoryListGrid /> */}
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {category.catName}
                        <CardActions>
                          <Button size="small" color="primary">
                            {/* <CheckIcon /> */}
                            {category.status}
                          </Button>
                          <Button size="small" color="primary">
                            <LocalOfferIcon />
                            Offer: {category.offer}
                          </Button>
                        </CardActions>
                      </Typography>

                      {/* <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.editCategory(category.id);
                      }}
                    >
                      <EditIcon /> Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        this.deleteCategory(category.id);
                      }}
                    >
                      <DeleteForeverIcon /> Delete
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.shouldOpenDialogue}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <Typography color="primary">Category EDIT Form</Typography>
          </DialogTitle>
          <DialogContent dividers>
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
                  Category Edit
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
                    <Typography color="error">
                      {this.state.dataError}
                    </Typography>
                  </Box>
                )}

                <TextField
                  id="outlined-required"
                  // label="Category"
                  // defaultValue="Hello World"
                  variant="outlined"
                  type="text"
                  color="primary"
                  fullWidth
                  margin="normal"
                  size="normal"
                  name="catName"
                  onChange={this.readForm}
                  value={this.state.category.catName}
                />

                <TextField
                  id="component-outlined"
                  // label="Image"
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

                <Typography>
                  Is Offer ?
                  <Checkbox
                    checked={this.state.category.offer}
                    onChange={this.handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Typography>

                <TextField
                  id="outlined-required"
                  select
                  //label="Status"
                  value={this.state.status}
                  name="status"
                  onChange={this.readForm}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select the Status"
                  variant="outlined"
                >
                  <option>{this.state.category.status}</option>
                  {categoryStatusList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <br />
                <br />
                {/* <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.doAddCategory}
                >
                  Add Category
                </Button> */}
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="green">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ViewCategory;
