import React, { Component } from "react";
import { withStyles, CssBaseline, Grid } from "@material-ui/core";

import Navbar from "../Components/shared/Navbar";
import Footer from "../Components/shared/Footer";
import MenuListComposition from "../Components/shared/SideMenu";
import UserProfile from "../pages/UserProfile";
import Register from "../Components/Register/Register";
import Login from "../Components/login/Login";
import ProfilePhoto from "../pages/ProfilePhoto";
import ProfileListing from "../pages/ProfileListing";
import PaymentPage from "../pages/Payment";
import SuccessPage from "../pages/Success";
import NotFound from "../pages/NotFound";

const landinPageStyle = (theme) => ({
  landingContainer: {
    margin: theme.spacing.unit * 2,
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
  content: {
    marginTop: theme.spacing.unit * 4,
  },
});

class LandingPage extends Component {
  state = {
    step: 0,
  };

  componentDidMount() {}

  // incrementStep = () => {
  //   this.setState(prevState => ({ step: (prevState.step += 1) }));
  // };

  render() {
    const { classes } = this.props;

    const pathName = () => {
      switch (this.props.pathName) {
        case "signup":
          return <Register />;
        case "login":
          return <Login />;
        case "editProfile":
          return <UserProfile />;
        case "profilePhoto":
          return <ProfilePhoto />;
        case "profile-listing":
          return <ProfileListing />;
        case "payment":
          return <PaymentPage />;
        case "success":
          return <SuccessPage />;
        case "/":
          return <UserProfile />;
        default:
          return <NotFound />;
      }
    };

    let sideMenuBar = "";
    if (this.props.showSideBar) {
      sideMenuBar = (
        <Grid container style={{ margin: "0 auto", maxWidth: 960 }}>
          <Grid item xs={2}>
            <MenuListComposition />
          </Grid>
          <Grid item xs={10} className={classes.content}>
            {pathName()}
          </Grid>
        </Grid>
      );
    } else {
      sideMenuBar = (
        <Grid container style={{ margin: "0 auto", maxWidth: 960 }}>
          <Grid item xs={12} className={classes.content}>
            {pathName()}
          </Grid>
        </Grid>
      );
    }

    return (
      <div className={classes.landingContainer}>
        <div>
          <CssBaseline />
          <nav>
            <Navbar isAuthenticated={this.props.isAuthed} />
          </nav>
          {sideMenuBar}
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
