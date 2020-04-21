import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #d3d3d3",
    padding: "10px",
    margin: "0 0 10px 0",
    borderRadius: "5px",
  },
}));

export default function CardInfoElement() {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    console.log(result);
    if (result.error) {
      // Show error to your customer.
      setError(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.card}>
        <CardElement />
      </div>
      <Button
        variant="outlined"
        disabled={!stripe}
        color="primary"
        onClick={handleSubmit}
      >
        Save
      </Button>
      {error !== "" && (
        <Alert
          severity="error"
          style={{ marginTop: "10px", textAlign: "center" }}
        >
          {error}
        </Alert>
      )}
    </form>
  );
}
