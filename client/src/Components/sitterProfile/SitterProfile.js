import React, { useState } from "react";
import AboutMeProfile from "./aboutMeProfile/AboutMeProfile";
import BookSitter from "./bookSitter/BookSitter";
import axios from "axios";
import { authService } from "../../services/auth.service";
import "./SitterProfile.css";
function SitterProfile(props) {
  const [profile, setProfile] = useState({});
  const [initialized, setInitialized] = useState(false);
  const sitterProfileId = props.profileId;

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
    <div class="flex-container-sitter">
      {initialized && <AboutMeProfile profile={profile} />}
      <BookSitter />
    </div>
  );
}

export default SitterProfile;
