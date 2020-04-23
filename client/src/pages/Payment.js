import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Button } from "@material-ui/core";
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
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getCard();
  }, []);

  const getCard = async () => {
    const profileId = JSON.parse(localStorage.getItem("profile"))._id;
    const cards = await axios.get(
      "http://localhost:3001/payment/method/" + profileId
    );
    if (cards.status !== 204) {
      setCard(cards.data.pm[0].card);
      setProfile(cards.data.profile);
      // update customerid in profile
      localStorage.setItem("profile", JSON.stringify(cards.data.profile));
    }
  };

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
          {card.brand ? (
            <>
              <Cards
                issuer={card.brand}
                expiry={
                  card.exp_month < 10
                    ? `0${card.exp_month}/${card.exp_year}`
                    : `${card.exp_month}/${card.exp_year}`
                }
                name={`${profile.firstName} ${profile.lastName}`}
                number={`************${card.last4}`}
                preview={true}
              />
              <Button
                variant="outlined"
                color="primary"
                href="/payment/add"
                style={{ marginTop: "20px" }}
              >
                Change Payment Method
              </Button>
            </>
          ) : (
            <>
              <Typography
                component="h6"
                variant="h6"
                style={{ marginBottom: "20px" }}
              >
                Payment method is not added yet
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href="/payment/add"
                style={{ marginTop: "20px" }}
              >
                Add Payment Method
              </Button>
            </>
          )}
        </Grid>
      </Card>
      <div>
        <BankAccount />
      </div>
    </>
  );
}
