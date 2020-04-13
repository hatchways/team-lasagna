import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import "./AboutMeProfile.css";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";
const useStyles = makeStyles({
  profilePic: {
    width: "140px",
    height: "140px",
    alignContent: "center",
  },
});

function AboutMeProfile({ profile }) {
  const classes = useStyles();
  //console.log(props);
  //console.log(profile.address.city);
  return (
    <div class="paper">
      <Paper elevation={2} square={false}>
        <img
          class="cover"
          alt="coverPhoto"
          src="https://www.allstate.com/resources/Allstate/images/tools-and-resources/home/exterior-house-with-porch_Thinkstock_680x402.jpg"
        ></img>

        <div className="profile-picture">
          <Avatar className={classes.profilePic} src={profile.profilePic} />
        </div>
        <div className="info">
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>
          <RoomIcon fontSize="small"></RoomIcon>
          {profile.address.city + ", " + profile.address.province}
        </div>
        <div className="about-me">
          <h2>About me</h2>
          <br></br>
          {profile.about} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dignissimos cum, placeat iusto a eius cupiditate saepe soluta
          ipsum, cumque similique iste atque dolorem velit inventore! Cum
          aperiam amet quidem facilis perspiciatis. Tempore natus enim tenetur
          rerum eligendi accusantium atque, inventore aspernatur commodi
          voluptatem aliquid impedit. Provident quis at quaerat enim!
        </div>
      </Paper>
    </div>
  );
}

export default AboutMeProfile;
