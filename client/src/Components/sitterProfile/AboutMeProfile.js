import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";
const useStyles = makeStyles({
  profilePic: {
    width: "140px",
    height: "140px",
    alignContent: "center",
  },
  paper: {
    maxWidth: "600px",
  },
  muiPaper: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "230px 90px 50px repeat(2, 50px) auto",
    gridTemplateAreas: `'c c c c c c c c'
    '. . . p p . . .'
    '. . i i i i . .'
    '. . . . . . . .'
    '. a a a a a a .'
    '. a a a a a a .'`,
  },
  cover: {
    width: "100%",
    height: "230px",
    overflow: "hidden",
    gridArea: "c",
  },
  info: {
    gridArea: "i",
    textAlign: "center",
  },
  aboutMe: {
    gridArea: "a",
    paddingBottom: "45px",
  },
  profilePicture: {
    gridArea: "p",
    position: "relative",
    bottom: "70%",
  },
});

function AboutMeProfile({ profile }) {
  const classes = useStyles();
  //console.log(props);
  //console.log(profile.address.city);
  return (
    <div className={classes.paper}>
      <Paper className={classes.muiPaper} elevation={2} square={false}>
        <img
          className={classes.cover}
          alt="coverPhoto"
          src="https://www.allstate.com/resources/Allstate/images/tools-and-resources/home/exterior-house-with-porch_Thinkstock_680x402.jpg"
        ></img>

        <div className={classes.profilePicture}>
          <Avatar className={classes.profilePic} src={profile.profilePic} />
        </div>
        <div className={classes.info}>
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>
          <RoomIcon fontSize="small"></RoomIcon>
          {profile.address.city + ", " + profile.address.province}
        </div>
        <div className={classes.aboutMe}>
          <h2>About me</h2>
          <br></br>
          {profile.about}
        </div>
      </Paper>
    </div>
  );
}

export default AboutMeProfile;
