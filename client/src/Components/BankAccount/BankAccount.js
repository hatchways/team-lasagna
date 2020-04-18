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
} from "@material-ui/core";
import BankData from "./BankData";

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
    console.log(bankData);
  }, [state]);

  const getBankInfo = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    console.log(profile);
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
            {bankData.bank_name ? "Change Bank Account" : "Add Bank Account"}
          </Button>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <CardContent className={classes.body}>
            {bankData.bank_name ? (
              <BankData bankData={bankData} />
            ) : (
              <Typography component="span" variant="h6">
                Please Add Bank Account
              </Typography>
            )}
          </CardContent>
        </Grid>
      </Card>
    </>
  );
}
