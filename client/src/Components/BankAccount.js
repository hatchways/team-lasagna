import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import ReactCountryFlag from "react-country-flag";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  header: {
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function BankAccount() {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [bankData, setBankData] = useState({});
  useEffect(() => {
    getBankInfo();
  }, [state]);

  const getBankInfo = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    const response = await axios.post(
      "http://localhost:3001/connect/bank-account/get",
      { id: profile._id }
    );
    setBankData(response.data.account.external_accounts.data[0]);
    setState(response.data.state);
  };

  return (
    <>
      <Card className={classes.root}>
        <Grid item xs={12} className={classes.header}>
          <Typography component="h5" variant="h5">
            Bank Account
          </Typography>
          <Button
            href={
              "https://connect.stripe.com/express/oauth/authorize?client_id=ca_H6SmiPDpQ1FRWYUhBviGJtKDWn3vZ7P9&state=" +
              state +
              "&suggested_capabilities[]=transfers"
            }
            variant="contained"
            color="secondary"
          >
            Add Bank Account
          </Button>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <CardContent className={classes.body}>
            <AccountBalanceIcon fontSize="large" />
            <ReactCountryFlag
              svg
              countryCode={bankData.country}
              style={{
                fontSize: "1.5em",
                lineHeight: "1.5em",
                margin: "0 7px",
              }}
            />

            <Typography
              component="span"
              variant="h6"
              style={{
                margin: "0 7px 0 0",
              }}
            >
              {bankData.bank_name}
            </Typography>
            <MoreHorizRoundedIcon />
            <Typography component="span" variant="h6">
              {bankData.last4}/{bankData.routing_number}
            </Typography>
            <Chip
              style={{
                margin: "0 7px",
              }}
              size="small"
              label={String(bankData.currency).toUpperCase()}
            />
          </CardContent>
        </Grid>
      </Card>
    </>
  );
}
