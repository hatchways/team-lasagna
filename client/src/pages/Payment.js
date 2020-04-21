import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Avatar,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import BankAccount from "../Components/BankAccount/BankAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "20px",
    padding: "40px 0",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  card: {
    border: "1px solid #d3d3d3",
    padding: "10px",
    margin: "auto",
    borderRadius: "5px",
  },
}));

export default function Payment() {
  const classes = useStyles();
  const [card, setCard] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {}, []);

  const getCard = async () => {
    const card = axios.get("");
    setCard(card);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const stripe = await loadStripe(
      "pk_test_10DLd8pSdszgPlmUnA8igTlq00Sd5UpajI"
    );

    if (!stripe) {
      // Stripe.js has not yet loaded.
      // disable form submission until Stripe.js has loaded.
      return;
    }
    const session = await createCheckoutSession();
    console.log(session);
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: session.data.id,
    });
  };

  async function createCheckoutSession() {
    const paymentData = {
      customer_id: "", // payer customer_id
      account_id: "", // sitter account_id
      amount: 3000, // 30$
      // payment data for existing customers: customer_id, email
    };

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await axios.post(
      "http://localhost:3001/payment/",
      paymentData
    );

    // Return and display the result of the charge.
    return response;
  }

  return (
    <>
      <Card className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center", paddingBottom: "4%" }}>
          <Typography
            component="h5"
            variant="h5"
            style={{ marginBottom: "20px" }}
          >
            Payment Methods
          </Typography>
          <Cards
            cvc="123"
            expiry="09/22"
            name="Din Lanh"
            number="************4242"
            preview={true}
          />

          <Button
            variant="outlined"
            color="primary"
            href="/payment/add"
            style={{ marginTop: "20px" }}
          >
            Add Payment Method
          </Button>
        </Grid>
      </Card>
      <div>
        <Card className={classes.root}>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", paddingBottom: "4%" }}
          >
            <Typography component="h5" variant="h5">
              Pet Sitting Service
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Avatar
              alt="userphot"
              src="https://images.ctfassets.net/cnu0m8re1exe/7sLmeD1tcL4UoIm0BjNaLh/22a9f42a4315361db96470f50b178e86/Dog-and-Cat.jpg?w=650&h=433&fit=fill"
              className={classes.large}
            />
          </Grid>
          <Grid item xs={12}>
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="body1" component="p">
                Easiest way for pet parents to find and book loving and
                trustworthy neighborhood pet care.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Pay
            </Button>
          </Grid>
        </Card>
        <BankAccount />
      </div>
    </>
  );
}
