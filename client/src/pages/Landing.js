import React, { Component } from "react";

import { Typography, withStyles, CssBaseline} from "@material-ui/core";
//import { withStyles } from "@material-ui/core/styles";
//import { Route, Link } from "react-router-dom";

import Navbar from '../shared/Navbar'
import MenuListComposition from '../shared/SideMenu'
import UserProfile from '../pages/UserProfile'

//const drawerWidth = 256;

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
    //margin: theme.spacing(2)
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
});
 
class LandingPage extends Component {
  state = {
    welcomeMessage: "Welcome to Dogs",
    open: false,
    step: 0
  };

  componentDidMount() {
  }

  incrementStep = () => {
    this.setState(prevState => ({ step: (prevState.step += 1) }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <div >
        <CssBaseline />
        <nav >
          <Navbar />
        </nav>
          <MenuListComposition />
        <Typography >
          <UserProfile />
        </Typography>
      </div>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
