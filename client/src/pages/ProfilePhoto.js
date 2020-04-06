import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Avatar,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    minHeight: "100%",
    margin: "20px 20px",
    paddingTop: "60px",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatar: {
    backgroundColor: red[500],
  },
  margin: {
    //margin: theme.spacing(1),
    margin: "20px 20px",
    padding: "20px 20px",
  },
  fileInput: {
    display: "none",
  },
}));

export default function ProfilePhoto() {
  const classes = useStyles();
  const [profile, setProfile] = useState();

  useEffect(() => {
    // getProfile();
  }, []);

  async function getProfile() {
    try {
      const fetchedProfile = await axios.get("http://localhost:3001/profile/");
      // console.log(fetchedProfiles);
      if (fetchedProfile.data) {
        setProfile(fetchedProfile.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileUpload = async (event) => {
    console.log("file upload started");
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append("image", event.target.files[0], event.target.files[0].name);
    // send file to server and call
    try {
      const res = await axios.post(
        "http://localhost:3001/img-upload/5e878926720f86f9a9bea24b",
        data
      );
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes.root}>
      <Grid item xs={12} style={{ textAlign: "center", paddingBottom: "4%" }}>
        <Typography component="h5" variant="h5">
          Profile Photo
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Avatar
          alt="userphot"
          src={profile.profilePic}
          className={classes.large}
        />
      </Grid>
      <Grid item xs={12}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            Make sure to use a photo that clearly shows your face
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} align="center">
        <input
          accept="image/*"
          className={classes.fileInput}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="secondary"
            className={classes.margin}
            component="span"
          >
            Upload a file from your device
          </Button>
        </label>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Card>
  );
}
