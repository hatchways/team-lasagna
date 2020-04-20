import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import { Card, Grid, Avatar, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    minHeight: "100%",
    margin: "20px",
    padding: "40px 0",
  },
  margin: {
    //margin: theme.spacing(1),
    margin: "25px 25px",
    padding: "20px 20px",
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: "20px 0",
  },
}));

export default function BankAccountSuccess(props) {
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    const state = new URLSearchParams(location.search).get("state");
    console.log(code + " " + state);
    connectAcc(code, state);
  }, []);

  const connectAcc = async (code, state) => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const response = await axios.post(
      "http://localhost:3001/connect/bank-account/",
      {
        code: code,
        state: state,
        profile_id: profile._id,
      }
    );
    console.log(response);
  };

  return (
    <>
      <Card className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography component="h5" variant="h5">
            Registration Successful!
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Avatar alt="userphot" className={classes.green}>
            <CheckIcon />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="body1" component="p">
              Whatever you and your pet are into, we’re into it, too. And we’ve
              got your back. Anytime. Anywhere.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} align="center">
          <Link to="/">return Home</Link>
        </Grid>
      </Card>
    </>
  );
}