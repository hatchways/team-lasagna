import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  GridList,
  Avatar,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";
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
  pics: {
    padding: "30px",
  },
  aboutMeh: {
    textAlign: "center",
  },

}));

export default function ProfilePhoto() {
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [id, setId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aboutProcessing, setAboutProcessing] = useState(false);
  const [aboutError, setAboutError] = useState(false);
  const [aboutSuccess, setAboutSuccess] = useState(false);

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("profile"))._id);
    getProfile();
//    console.log(profile.profilePic)
//    console.log(profile.aboutPics)
  }, [id]);

  // useEffect(() => {
  //   getProfile();
  // }, [id]);

  async function getProfile() {
    try {
      const fetchedProfile = await axios.get(
        "http://localhost:3001/profile/" + id
      );
      // console.log(fetchedProfiles);
      if (fetchedProfile.data) {
        setProfile(fetchedProfile.data);
            console.log(profile.profilePic);
            console.log(profile.aboutPics);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileUpload = async (event) => {
    setSuccess(false);
    setError(false);
    setProcessing(true);
    const data = new FormData();
    // send file to server and call
    try {
      data.append("image", event.target.files[0], event.target.files[0].name);
      const res = await axios.post("http://localhost:3001/img/" + id, data);
      setProcessing(false);
      setProfile(res.data);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err);
    }
  };
  const handleAboutFileUpload = async (event) => {
    setAboutSuccess(false);
    setAboutError(false);
    setAboutProcessing(true);
    const data = new FormData();
    // send file to server and call
    try {
      data.append("image", event.target.files[0], event.target.files[0].name);
      const res = await axios.put(
        "http://localhost:3001/img/about-me/" + id,
        data
      );
      setAboutProcessing(false);
      setProfile(res.data);
      setAboutSuccess(true);
    } catch (err) {
      setAboutSuccess(false);
      setAboutProcessing(false);
      setAboutError(true);
      console.log(err);
    }
  };

  const handleRemovePic = async (event) => {
    setSuccess(false);
    setError(false);
    setProcessing(true);
    // send file to server and call
    try {
      const res = await axios.delete("http://localhost:3001/img/" + id);
      setProcessing(false);
      setSuccess(true);
      setProfile(res.data);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
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
          alt="userphoto"
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
        <IconButton
          aria-label="delete"
          onClick={handleRemovePic}
          className={classes.margin}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
        <Grid item xs={5} align="center">
          {processing && <Alert severity="info">Loading...</Alert>}
          {error && <Alert severity="error">Error! Please try again...</Alert>}
        </Grid>
      </Grid>
      <Typography className={classes.aboutMeh} component="h5" variant="h5">
        About Me Photos
      </Typography>
      <GridList className={classes.pics}>
        {aboutSuccess &&
          profile.aboutPics.map((pic) => (
            <img alt="about-photo" src={pic}></img>
          ))}
      </GridList>
      <Grid item xs={12} align="center">
        <input
          accept="image/*"
          className={classes.fileInput}
          id="contained-button-about"
          multiple
          type="file"
          onChange={handleAboutFileUpload}
        />
        <label htmlFor="contained-button-about">
          <Button
            variant="outlined"
            color="secondary"
            className={classes.margin}
            component="span"
          >
            Upload a file from your device
          </Button>
        </label>
        {aboutSuccess && (
          <Alert className={classes.aboutAlert} severity="success">
            Picture successfully added!
          </Alert>
        )}
      </Grid>
    </Card>
  );
}
