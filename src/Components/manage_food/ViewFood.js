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
import FoodService from "../../Service/FoodService";

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

export class ViewFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodList: [],
      shouldOpenDialogue: false,
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
    };
  }

  componentDidMount() {
    FoodService.fetchAllFoods().then(
      (resp) => {
        this.setState({ foodList: resp.data });
      },
      (error) => {
        console.error(error.data);
      }
    );
  }

  render() {
    return (
      <div>
        <MerchantDashboard />
        <Grid container spacing={3}>
          {this.state.foodList.map((food) => (
            <Grid item xs={6} sm={3}>
              <Paper>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {food.foodName}
                        <CardActions>
                          <Button size="small" color="primary">
                            {/* <CheckIcon /> */}
                            {food.status}
                          </Button>
                          <Button size="small" color="primary">
                            <LocalOfferIcon />
                            Offer: {food.offer}
                          </Button>
                        </CardActions>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <EditIcon /> Edit
                    </Button>
                    <Button size="small" color="secondary">
                      <DeleteForeverIcon /> Delete
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ViewFood;
