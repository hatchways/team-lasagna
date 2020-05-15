import "date-fns";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Paper } from "@material-ui/core";
import { Alert, Rating } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  bookSitterPaper: {
    maxWidth: "400px",
    textAlign: "center",
    align: "center",
  },
  picker: {
    maxWidth: "130px",
  },
  bookButton: {
    background: "tomato",
    color: "white",
    width: "140px",
    height: "45px",
    margin: "15px",
  },
  hrRate: {
    fontSize: "20px",
  },
  rating: {
    margin: "15px",
  },
  bookSitterForm: {
    paddingLeft: "15px",
    paddingBottom: "30px",
    paddingTop: "25px",
    gridArea: "f",
    textAlign: "center",
  },
  bookingContainer: {
    marginLeft: "0px",
    ["@media (min-width:700px)"]: {
      marginLeft: "3em",
    },
  },
  date: {
    display: "grid",
    gridTemplateAreas: ". f .",
    gridTemplateColumns: "1fr 10fr 1fr",
  },
  button: {
    paddingTop: "15px",
  },
  avail: {
    backgroundColor: "tomato",
    padding: "15px",
    marginTop: "0px",
    color: "white",
    borderRadius: "4px",
  },
});
function required(displayName) {
  return function validateRequired(value) {
    return value || `${displayName} is required.`;
  };
}

function BookSitter({ profile, userProfile }) {
  const classes = useStyles();
  const { errors, getValues, handleSubmit, register, setValue } = useForm();
  const [dates, setDates] = useState({
    pickupDate: Date.now(),
    pickupTime: Date.now(),
    dropoffDate: Date.now(),
    dropoffTime: Date.now(),
  });
  const [resErr, setResErr] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [resErrMsg, setResErrMsg] = useState("");
  const handleChange = (type) => (date) => {
    setValue(type, date);
    values = getValues();
    setDates((prevState) => {
      return {
        ...prevState,
        [type]: date,
      };
    });
  };

  const getDate = (date, time) => {
    const full = new Date();
    full.setDate(date.getDate());
    full.setFullYear(date.getFullYear());
    full.setMonth(date.getMonth());
    full.setHours(time.getHours());
    full.setMinutes(time.getMinutes());
    return full;
  };
  useEffect(() => {
    register(
      { name: "pickupDate", type: "text" },
      { validate: required("pickup date") }
    );
    register(
      { name: "pickupTime", type: "text" },
      { validate: required("pickup time") }
    );
    register(
      { name: "dropoffDate", type: "text" },
      { validate: required("drop-off date") }
    );
    register(
      { name: "dropoffTime", type: "text" },
      { validate: required("drop-off time") }
    );
  });
  let values = getValues();
  const onSubmit = async (data) => {
    setReqSuccess(false);
    setResErr(false);
    const start = getDate(data.pickupDate, data.pickupTime);
    const end = getDate(data.dropoffDate, data.dropoffTime);
    const body = {
      userId: userProfile.user,
      sitterId: profile.user,
      start: start,
      end: end,
      accepted: false,
      declined: false,
    };
    try {
      const res = await axios.post("/request", body);
      if (res.status === 200) {
        setReqSuccess(true);
      } else {
        setResErr(true);
        setResErrMsg(res.msg);
      }
    } catch (err) {
      setResErr(true);
      setResErrMsg("Cannot create this request");
    }
  };
  console.log(profile.availability);
  function disableDays(date) {
    return (
      (date.getDay() === 0 && !profile.availability.sundays) ||
      (date.getDay() === 1 && !profile.availability.mondays) ||
      (date.getDay() === 2 && !profile.availability.tuesdays) ||
      (date.getDay() === 3 && !profile.availability.wednesdays) ||
      (date.getDay() === 4 && !profile.availability.thursdays) ||
      (date.getDay() === 5 && !profile.availability.fridays) ||
      (date.getDay() === 6 && !profile.availability.saturdays)
    );
  }

  return (
    <div className={classes.bookingContainer}>
      <Paper className={classes.bookSitterPaper}>
        <h2 className={classes.avail}>Available</h2>
        <b className={classes.hrRate}>${profile.hourlyRate}/hr</b>
        <br></br>
        <Rating
          className={classes.rating}
          name="read-only"
          value={4}
          readOnly
        />
        <div className={classes.date}>
          <form
            className={classes.bookSitterForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                name="pickupDate"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="DROP IN"
                disablePast="true"
                value={values.pickupDate}
                onChange={handleChange("pickupDate")}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={errors.hasOwnProperty("pickupDate")}
                helperText={errors.pickupDate && errors.pickupDate.message}
                shouldDisableDate={disableDays}
              />
              <KeyboardTimePicker
                margin="normal"
                name="pickupTime"
                id="time-picker"
                label=" "
                variant="inline"
                value={dates.pickupTime}
                onChange={handleChange("pickupTime")}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                error={errors.hasOwnProperty("pickupTime")}
                helperText={errors.pickupTime && errors.pickupTime.message}
              />
              <KeyboardDatePicker
                disableToolbar
                name="dropoffDate"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="DROP OFF"
                value={dates.dropoffDate}
                onChange={handleChange("dropoffDate")}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={errors.hasOwnProperty("dropoffDate")}
                helperText={errors.dropoffDate && errors.dropoffDate.message}
                shouldDisableDate={disableDays}
              />
              <KeyboardTimePicker
                margin="normal"
                name="dropoffTime"
                id="time-picker"
                label=" "
                variant="inline"
                value={dates.dropoffTime}
                onChange={handleChange("dropoffTime")}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                error={errors.hasOwnProperty("dropoffTime")}
                helperText={errors.dropoffTime && errors.dropoffTime.message}
              />

              <div className={classes.button}>
                <Button
                  variant="contained"
                  className={dates.bookButton}
                  type="submit"
                >
                  SEND REQUEST
                </Button>
                {resErr && <Alert severity="error">{resErrMsg}</Alert>}
                {reqSuccess && (
                  <Alert severity="success">
                    Request has been successfully submitted
                  </Alert>
                )}
              </div>
            </MuiPickersUtilsProvider>
          </form>
        </div>
      </Paper>
    </div>
  );
}
export default BookSitter;
