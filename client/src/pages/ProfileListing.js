import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import ProfileItem from "../Components/ProfileListing/ProfileItem";
import SearchIcon from "@material-ui/icons/Search";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  title: { textAlign: "center", paddingTop: "10px" },
  container: {
    padding: "40px",
  },
  roomIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ProfileListing() {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    setFilteredProfiles(
      profiles.filter((profile) => {
        return (
          profile.firstName.toLowerCase().includes(search.toLowerCase()) ||
          profile.lastName.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, profiles]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  async function getProfiles() {
    try {
      const fetchedProfiles = await axios.get("http://localhost:3001/profile/");
      // console.log(fetchedProfiles);
      if (fetchedProfiles.data) {
        setProfiles(fetchedProfiles.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        fontWeight="fontWeightBold"
        className={classes.title}
      >
        Your Search Results
      </Typography>
      <div className={classes.title}>
        <TextField
          placeholder="Search…"
          variant="outlined"
          value={search}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Grid container className={classes.container} spacing={7}>
        {filteredProfiles
          .filter((profile) => {
            return profile;
          })
          .map((profile, key) => (
            <ProfileItem key={key} profile={profile} />
          ))}
      </Grid>
    </div>
  );
}
