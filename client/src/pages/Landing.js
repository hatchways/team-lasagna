import React, { Component } from "react";
import { withStyles, CssBaseline, Grid} from "@material-ui/core";

import Navbar from '../Components/shared/Navbar'
import Footer from '../Components/shared/Footer'
import MenuListComposition from '../Components/shared/SideMenu'
import UserProfile from '../pages/UserProfile'
import Register from '../Components/Register/Register'
import ProfilePhoto from '../pages/ProfilePhoto'

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
});
 
class LandingPage extends Component {
  state = {
    step: 0
  };

  componentDidMount() {}

  // incrementStep = () => {
  //   this.setState(prevState => ({ step: (prevState.step += 1) }));
  // };

  render() {
    const { classes } = this.props;

    const pathName = () => {
      switch (this.props.pathName) {
      case 'signup':
        return <Register />
      case 'dashboard':
        return <UserProfile />
      case 'profilephoto':
        return <ProfilePhoto />
      case '/':
        return <UserProfile />
      default: 
        throw new Error('should not get here!')
      }
    }

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
              {pathName()}
            </Grid>
          </Grid>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
