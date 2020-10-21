import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
