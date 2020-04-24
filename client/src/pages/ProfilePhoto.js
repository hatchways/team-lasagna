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
import Fab from "@material-ui/core/Fab";
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
    margin: "20px 20px",
    padding: "20px 20px",
  },
  fileInput: {
    display: "none",
  },
  pics: {
    padding: "15px",
    overflow: "hidden",
  },
  aboutMeh: {
    textAlign: "center",
  },
  aboutPictures: {
    maxWidth: "50%",
    textAlign: "center",
  },
  aboutImgs: {
    width: "auto",
    maxHeight: "20em",
  },
  fabDel: {
    height: "15px",
    width: "0px",
    margin: 0,
    right: "10px",
    bottom: "100%",
    color: "red",
    position: "relative",
  },
}));

export default function ProfilePhoto({ setPictureChanged }) {
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [id, setId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aboutProcessing, setAboutProcessing] = useState(false);
  const [aboutError, setAboutError] = useState(false);
  const [aboutSuccess, setAboutSuccess] = useState(false);
  const [aboutDelSuccess, setAboutDelSuccess] = useState(false);

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("profile"))._id);
    getProfile();
    //    console.log(profile.profilePic)
    //    console.log(profile.aboutPics)
  }, [id, success]);

  async function getProfile() {
    try {
      console.log("get");
      const fetchedProfile = await axios.get(
        "http://localhost:3001/profile/" + id
      );
      // console.log(fetchedProfiles);
      if (fetchedProfile.data) {
        setProfile(fetchedProfile.data);
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
      setPictureChanged(true);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err);
    }
  };
  const handleAboutFileUpload = async (event) => {
    setAboutDelSuccess(false);
    setAboutProcessing(true);
    setAboutSuccess(false);
    setSuccess(false);
    setAboutError(false);
    setError(false);

    const data = new FormData();
    // send file to server and call
    try {
      data.append("image", event.target.files[0], event.target.files[0].name);
      const res = await axios.put(
        "http://localhost:3001/img/about-me/" + id,
        data
      );
      setProfile(res.data);
      setAboutSuccess(true);
      setAboutProcessing(false);
    } catch (err) {
      setAboutSuccess(false);
      setAboutError(true);
      setAboutProcessing(false);
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
      setPictureChanged(false);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err);
    }
  };
  async function removeAboutPic(url) {
    console.log(url);
    console.log("test");
    setAboutDelSuccess(false);
    setAboutProcessing(true);
    setAboutSuccess(false);
    setSuccess(false);
    setAboutError(false);
    setError(false);
    try {
      const res = await axios.put(
        "http://localhost:3001/img/delete-about-me/" + id,
        {
          url: url,
        }
      );
      setProfile(res.data);
      console.log(res);
      setAboutDelSuccess(true);
      setAboutProcessing(false);
    } catch (err) {
      setAboutError(true);
      setAboutProcessing(false);
    }
  }

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
      <GridList cols={2} spacing={10} className={classes.pics}>
        {profile.aboutPics &&
          profile.aboutPics.map((pic, i) => (
            <div
              key={i}
              className={classes.aboutPictures}
              style={{ height: "100%" }}
            >
              <img
                className={classes.aboutImgs}
                alt="about-photo"
                src={pic}
              ></img>
              <Fab className={classes.fabDel}>
                <DeleteIcon onClick={() => removeAboutPic(pic)} />
              </Fab>
            </div>
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
            Picture successfully uploaded!
          </Alert>
        )}
        {aboutProcessing && <Alert severity="info">Loading...</Alert>}
        {aboutDelSuccess && (
          <Alert className={classes.aboutAlert} severity="success">
            Picture successfully deleted!
          </Alert>
        )}
        {aboutError && (
          <Alert className={classes.aboutAlert} severity="error">
            Error! Please try again...
          </Alert>
        )}
      </Grid>
    </Card>
  );
}
