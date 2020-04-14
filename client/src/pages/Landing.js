import React, { useState, useEffect } from "react";
import { withStyles, CssBaseline, Grid } from "@material-ui/core";

import Navbar from "../Components/shared/Navbar";
import Footer from "../Components/shared/Footer";
import MenuListComposition from "../Components/shared/SideMenu";
import UserProfile from "./UserProfile/UserProfile";
//import UserProfile from "../pages/UserProfile";
import SitterProfile from "../Components/sitterProfile/SitterProfile";
import Register from "../Components/Register/Register";
import Login from "../Components/login/Login";
import ProfilePhoto from "../pages/ProfilePhoto";
import ProfileListing from "../pages/ProfileListing";
import PaymentPage from "../pages/Payment";
import SuccessPage from "../pages/Success";
import NotFound from "../pages/NotFound";

const landinPageStyle = (theme) => ({
  content: {
    marginTop: theme.spacing.unit * 4,
  },
});

function LandingPage(props) {
  const { classes } = props;

  const pathName = () => {
    switch (props.pathName) {
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
      case "sitter-profile":
        return <SitterProfile profileId={"5e86446fb63eabc010ee2828"} />;
      case "/":
        return <ProfileListing />;
      default:
        return <NotFound />;
    }
  };

  let sideMenuBar = "";
  if (props.showSideBar) {
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
    <div>
      <div>
        <CssBaseline />
        <nav>
          <Navbar isAuthenticated={props.isAuthed} />
        </nav>
        {sideMenuBar}
        <Footer />
      </div>
    </div>
  );
}

export default withStyles(landinPageStyle)(LandingPage);
