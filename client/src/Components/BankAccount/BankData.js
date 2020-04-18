import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Chip } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import ReactCountryFlag from "react-country-flag";

export default function BankData({ bankData }) {
  return (
    <>
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
    </>
  );
}
