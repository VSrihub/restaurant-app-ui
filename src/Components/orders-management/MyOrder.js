import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EventSeatRoundedIcon from "@material-ui/icons/EventSeatRounded";
import MotorcycleRoundedIcon from "@material-ui/icons/MotorcycleRounded";
import { mdiBikeFast } from "@mdi/js";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import VisibilityIcon from "@material-ui/icons/Visibility";

import MultiSelectTreeView from "../MultiSelectTreeView";
import { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ViewFood from "../manage_food/ViewFood";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import FoodCard from "../manage_food/FoodCard";
import { Link, Redirect } from "react-router-dom";
import OrderService from "../../Service/OrderService";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 345,

    backgroundColor: theme.palette.background.paper,
  },
  FoodCard_Root: {
    flexGrow: 5,
  },
  paper: {
    padding: theme.spacing(8),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedCategory: {
    paddingLeft: theme.spacing(6),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function MyOrder() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openMenu, setOpenMenu] = React.useState(false);

  const [orderCommand, setOrderCommand] = React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    let food = localStorage.getItem("foodOrder");
    let catName = food.catName;
    let foodName = food.foodName;
    let notes = food.notes;

    let custId = localStorage.getItem("email");
    let restID = "HYDPARD500018";

    let orderCommand = {
      dishes: [
        {
          catName: foodName,
        },
      ],
      customerId: custId,
      restaurantId: restID,
      notes: notes,
    };

    console.log("order ****** command is " + JSON.stringify(orderCommand));
    setOrderCommand(food);
    OrderService.placeOrder(orderCommand).then(
      (resp) => {
        console.log(resp.data);
        setOrderStatus(resp.data.status);
      },
      (err) => {
        console.error(err.data);
      }
    );
  });

  return (
    // <div className={classes.root}>
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* <MultiSelectTreeView /> */}
        <List>
          <ListItem button key="Orders" onClick={handleClick}>
            <ListItemIcon>
              <MotorcycleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {openMenu ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          {/* 
            This is used to Open a sub menu when we click on Orders Menu 
           */}
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="View My Orders" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Place Orders" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key="Reservations">
            <ListItemIcon>
              <EventSeatRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItem>
          <ListItem button key="Notifications">
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Payments">
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button key="Invoice">
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Invoice" />
          </ListItem>
          <ListItem button key="Logout">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <div className={classes.FoodCard_Root}>
        <Grid container spacing={3}>
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
                      {orderCommand.customerId}
                      <CardActions>
                        {orderCommand.dishes.map((dish) => ({ dish }))}
                      </CardActions>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>Order Status</Typography>
                  <Button size="small" color="primary">
                    <VisibilityIcon /> {orderStatus}
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
