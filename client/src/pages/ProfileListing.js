import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import ProfileItem from "../Components/ProfileListing/ProfileItem";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "hidden"
  },
  title: { textAlign: "center", paddingTop: "10px" },
  container: {
    padding: "40px"
  },
  roomIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function ProfileListing() {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    try {
      const fetchedProfiles = await fetch("http://localhost:3001/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await fetchedProfiles.json();
      if (json) {
        setProfiles(json);
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <Grid container className={classes.container} spacing={7}>
        {profiles.map((profile, key) => (
          <ProfileItem key={key} profile={profile} />
        ))}
      </Grid>
    </div>
  );
}
