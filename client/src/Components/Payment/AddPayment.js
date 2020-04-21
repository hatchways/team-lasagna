import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CardContent, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Elements } from "@stripe/react-stripe-js";
import CardInfoElement from "./CardInfoElement";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "20px",
    padding: "40px 0",
  },
}));

const stripe = loadStripe("pk_test_10DLd8pSdszgPlmUnA8igTlq00Sd5UpajI");

export default function Payment() {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={8} style={{ margin: "auto" }}>
        <Card className={classes.root}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography component="h5" variant="h5">
              Card details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CardContent style={{ textAlign: "center" }}>
              <Elements stripe={stripe}>
                <CardInfoElement />
              </Elements>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
