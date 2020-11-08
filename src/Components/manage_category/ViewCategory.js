import { Grid, Paper } from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import React, { Component } from "react";
import CategoryService from "../../Service/CategoryService";
import CategoryListGrid from "../CategoryListGrid";
import MerchantDashboard from "../MerchantDashboard";

export class ViewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catList: [],
    };
  }

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
                <CategoryListGrid />
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* <CategoryListGrid /> */}
        <h3>display all categories here</h3>
      </div>
    );
  }
}

export default ViewCategory;
