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

const AppBarCollapse = ({ isAuthenticated }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        <CollapsedMenuList isAuthenticated={isAuthenticated} />
      </ButtonAppBarCollapse>
      <div className={classes.buttonBar} id="appbar-collapse">
        <MenuList isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default AppBarCollapse;
