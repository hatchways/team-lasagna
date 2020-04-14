import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import MenuList from "./MenuList";
import CollapsedMenuList from "./CollapsedMenuList";

const useStyles = makeStyles((theme) => ({
  root: {},
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    display: "flex",
    alignItems: "center",
  },
}));

const AppBarCollapse = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        <CollapsedMenuList isAuthenticated={props.isAuthenticated} />
      </ButtonAppBarCollapse>
      <div className={classes.buttonBar} id="appbar-collapse">
        <MenuList isAuthenticated={props.isAuthenticated} />
      </div>
    </div>
  );
};

export default AppBarCollapse;
