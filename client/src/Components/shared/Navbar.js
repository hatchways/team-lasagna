import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBarCollapse from "./AppBarCollapse/AppBarCollapse";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  toolbarTitle: {
    flex: 1,
  },
}));

export default function Header({ isAuthenticated, pictureChanged }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <a href="/">
            <img src={"../assets/logo.png"} alt={"dogs"} href="/dashboard" />
          </a>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            className={classes.toolbarTitle}
          ></Typography>
          <AppBarCollapse
            isAuthenticated={isAuthenticated}
            pictureChanged={pictureChanged}
          />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
