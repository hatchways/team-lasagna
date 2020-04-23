import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Booking from "./Booking";
import CalendarView from "./CalendarView";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  scrollBar: {
    height: "800px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.2em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  calend: {
    margin: "30px",
  },
  item: {
    paddingTop: "4px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: "0 12px",
  },
}));

export default function UpcomingJobs() {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const localProfile = JSON.parse(localStorage.getItem("profile"));
  const sitterId = localProfile.user;

  useEffect(() => {
    getbookings(sitterId);
  }, [sitterId]);

  async function getbookings(sitterId) {
    try {
      const fetchedbookings = await axios.get(
        "http://localhost:3001/request/upcomingBookings/" + sitterId
      );
      if (fetchedbookings.data) {
        setBookings(fetchedbookings.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function completeBooking(id, bookingRequest, index) {
    bookingRequest = { ...bookingRequest, completed: true };
    setSuccess(false);
    setError(false);
    setProcessing(true);
    try {
      const fetchedbookings = await axios.put(
        "http://localhost:3001/request/completeBooking/" + id,
        bookingRequest
      );
      if (fetchedbookings.data) {
        setBookings((prevState) =>
          prevState.filter((request, i) => i !== index)
        );
      }
      // calculate payable
      const amount =
        ((new Date(bookingRequest.end).getTime() -
          new Date(bookingRequest.start).getTime()) /
          3600) *
        localProfile.hourlyRate;

      // charge
      const confirmPayment = await axios.post(
        "http://localhost:3001/payment/charge/",
        {
          request_id: id,
          amount: amount,
        }
      );
      console.log(confirmPayment);
      setProcessing(false);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
    }
  }

  let RequestList = "No Upcoming Task Found for you!";
  if (bookings.length > 0) {
    RequestList = bookings.map((booking, index) => {
      return (
        <Booking
          key={index}
          booking={booking}
          complete={() =>
            completeBooking(booking.request._id, booking.request, index)
          }
        />
      );
    });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={classes.root}>
          {processing && <Alert severity="info">Loading...</Alert>}
          {error && (
            <Alert severity="error">
              Error! Cannot complete Task at this time!
            </Alert>
          )}
          {success && (
            <Alert severity="success">Operation completed successfully!</Alert>
          )}
          <div className={classes.scrollBar}>{RequestList}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalendarView bookings={bookings} />
        </Grid>
      </Grid>
    </>
  );
}
