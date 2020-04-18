import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import { Card, Grid, Avatar, CardContent, Typography } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

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

const Success = ({ match }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(match.params.id);
    getSession();
  }, []);

  const getSession = async () => {
    const response = await axios.get(
      "http://localhost:3001/checkout/retrieve/" + match.params.id
    );
    console.log(response);
  };

  return (
    <>
      <Card className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography component="h5" variant="h5">
            Payment Successful!
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
};
export default withRouter(Success);
