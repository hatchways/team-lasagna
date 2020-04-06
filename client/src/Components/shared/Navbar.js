import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [sections, setSections] = useState([
    {
      id: 0,
      title: "photo",
      url: "/profilephoto",
    },
    {
      id: 1,
      title: "Availability",
      url: "/availability",
    },
    {
      id: 2,
      title: "Payment",
      url: "/payment",
    },
    {
      id: 3,
      title: "Security",
      url: "/security",
    },
    {
      id: 4,
      title: "Settings",
      url: "/setting",
    },
  ]);

  const handleSignUp = (event) => {
    console.log("signup clicked");
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <a href="/">
          <img src={"../assets/logo.png"} alt={"dogs"} href="/dashboard" />
        </a>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        ></Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" href="/signup">
          Sign up
        </Button>
        <Button variant="outlined" size="small" href="/login">
          Login
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}
