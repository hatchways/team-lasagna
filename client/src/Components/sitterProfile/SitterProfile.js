import React, { useState } from "react";
import AboutMeProfile from "./AboutMeProfile";
import BookSitter from "./BookSitter";
import axios from "axios";
import { authService } from "../../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  flexContainerSitter: {
    display: "flex",
    flexDirection: "column",
    ["@media (min-width:700px)"]: {
      flexDirection: "row",
    },
    maxWidth: "1000px",
  },
});
function SitterProfile(props) {
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [initialized, setInitialized] = useState(false);
  const sitterProfileId = props.profileId;
  const userProfile = authService.currentUserProfileValue;
  async function getProfile(profileId) {
    axios.get(`/profile/${profileId}`, authService.authHeader()).then((res) => {
      setProfile(res.data);
      setInitialized(true);
    });
  }

  if (!initialized) {
    getProfile(sitterProfileId);
  }

  //console.log(profile);
  return (
    <div className={classes.flexContainerSitter}>
      {initialized && <AboutMeProfile profile={profile} />}
      <BookSitter profile={profile} userProfile={userProfile} />
    </div>
  );
}

export default SitterProfile;
