import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Booking from './Booking'
import CalendarView from './CalendarView'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  scrollBar: {
    height: '800px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.2em'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  calend: {
    margin: '30px'
  },
  item: {
    paddingTop: '4px'
  },
  linkButton: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function Bookings() {
  const classes = useStyles();
  const [bookings, setBookings] = useState([])
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const localProfile = JSON.parse(localStorage.getItem("profile"))
  const sitterId = localProfile.user

  useEffect(() => {
    getbookings(sitterId);
  }, []);

  async function getbookings(sitterId) {
    try {
      const fetchedbookings = await axios.get("http://localhost:3001/request/pendingBookings/" + sitterId);
      if (fetchedbookings.data) {
        //console.log(fetchedbookings.data)
        setBookings(fetchedbookings.data);

      }
    } catch (err) {
      console.log(err);
    }
  }

  async function acceptBooking(id, bookingRequest, index) {
    bookingRequest = {...bookingRequest, accepted: true}
    setSuccess(false);
    setError(false);
    setProcessing(true);
    try {
      const fetchedbookings = await axios.put("http://localhost:3001/request/" + id, bookingRequest);
      if (fetchedbookings.data) {
        //setBookings(fetchedbookings.data);
        setBookings(prevState => prevState.filter((request, i) => i !== index));
      }
      setProcessing(false);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err);
    }
  }

  async function declineBooking(id, bookingRequest, index) {
    bookingRequest = {...bookingRequest, declined: true }
    setSuccess(false);
    setError(false);
    setProcessing(true);
    try {
      const fetchedbookings = await axios.put("http://localhost:3001/request/" + id, bookingRequest);
      if (fetchedbookings.data) {
        //setBookings(fetchedbookings.data);
        setBookings(prevState => prevState.filter((request, i) => i !== index));
      }
      setProcessing(false);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err);
    }
  }

  let RequestList = 'No Bookings Found for you!'
  if(bookings.length > 0) {
    RequestList = (
      bookings.map((booking, index) => {
        return <Booking key={index} 
          booking={booking} 
          accept={ () => acceptBooking(booking.request._id, booking.request, index) } 
          decline={ () => declineBooking(booking.request._id, booking.request, index) } />
      })
    )
  }

  return (
      <>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={classes.root}>
        {processing && <Alert severity="info">Loading...</Alert>}
        {error && <Alert severity="error">Error! Please try again...</Alert>}
        {success && (
          <Alert severity="success">
            Operation completed successfully!
          </Alert>
        )}
          <div className={classes.scrollBar}>
          {
            RequestList
          }
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalendarView bookings={bookings} />
        </Grid>
        </Grid>
      </>
  );
}
