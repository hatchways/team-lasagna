import React from "react";
import "date-fns";
import { TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import "./BookSitter.css";
// The first commit of Material-UI
const useStyles = makeStyles({
  bookSitterPaper: {
    maxWidth: "400px",
    textAlign: "center",
  },
  picker: {
    maxWidth: "130px",
  },
  bookButton: {
    background: "tomato",
    color: "white",
    width: "140px",
    height: "45px",
  },
});
const defaultValues = {
  pickupDate: null,
  pickupTime: null,
};
function BookSitter() {
  const classes = useStyles();
  const date = new Date().getDate() + 1;
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const formattedDate = ("0" + date).slice(-2);
  const formattedMonth = ("0" + month).slice(-2);
  const fullDate = year + "-" + formattedMonth + "-" + formattedDate;
  const [selectedDate, setSelectedDate] = React.useState(fullDate);

  const { errors, getValues, handleSubmit, register, setValue } = useForm({
    defaultValues,
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("pickupDate", date);
  };
  const handleTimeChange = (date) => {
    console.log(values);
    setValue("pickupTime", date);
  };
  const onSubmit = async (data) => {
    console.log(data);
  };
  const values = getValues();

  return (
    <div class="booking-container">
      <Paper className={classes.bookSitterPaper}>
        <h2 class="avail">Available</h2>
        <div className="date">
          <form class="book-sitter-form" onSubmit={handleSubmit(onSubmit)}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <RHFInput
                as={<KeyboardDatePicker />}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                name="pickupDate"
                margin="normal"
                id="pickupDate"
                label="Pickup"
                value={selectedDate}
                onChange={handleDateChange}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <RHFInput
                as={<KeyboardDatePicker />}
                margin="normal"
                id="pickupTime"
                name="pickupTime"
                label=" "
                variant="inline"
                value={values.pickupTime}
                onChange={handleTimeChange}
                className={classes.picker}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />

              <div className="button">
                <Button
                  variant="contained"
                  className={classes.bookButton}
                  type="submit"
                >
                  SEND REQUEST
                </Button>
              </div>
            </MuiPickersUtilsProvider>
          </form>
        </div>
      </Paper>
    </div>
  );
}
export default BookSitter;
