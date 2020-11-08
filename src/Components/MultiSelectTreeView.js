import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import AdjustIcon from "@material-ui/icons/Adjust";
import { ListItemIcon } from "@material-ui/core";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import CustomizedTreeView from "./CustomizedTreeView";
import FoodManagementTreeView from "./FoodManagementTreeView";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   height: 100,
  //   flexGrow: 1,
  //   maxWidth: 400,
  // },
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MultiSelectTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      {/* <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem> */}
      <TreeItem nodeId="5" label="Food Management">
        {/* <TreeItem nodeId="10" label="Manage Food">
          <TreeItem
            nodeId="11"
            label="Add Food"
            icon={<AddCircleOutlineTwoToneIcon />}
          />
          <TreeItem nodeId="12" label="Food List" icon={<ListItemIcon />} />
          <TreeItem nodeId="13" label="Food Varient" icon={<AdjustIcon />} />
          <TreeItem nodeId="13" label="Food Availability" />
        </TreeItem> */}
        <FoodManagementTreeView />
      </TreeItem>
    </TreeView>
  );
}
