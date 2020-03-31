import React, { Component } from "react";

import { Typography, withStyles, CssBaseline, Grid} from "@material-ui/core";
//import { Route, Link } from "react-router-dom";

import Navbar from '../components/Navbar'
import MenuListComposition from '../components/SideMenu'
import UserProfile from '../pages/UserProfile'

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

  componentDidMount() {}

  // incrementStep = () => {
  //   this.setState(prevState => ({ step: (prevState.step += 1) }));
  // };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
      <div>
          <CssBaseline />

          <nav>
            <Navbar />
          </nav>

          <Grid container style={{ margin: "0 auto", maxWidth: 960 }}>
            <Grid item xs={4}>
              <MenuListComposition />
            </Grid>
            <Grid item xs={8}>
              <UserProfile />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
