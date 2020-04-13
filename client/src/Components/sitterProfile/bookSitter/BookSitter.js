import React from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
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
function BookSitter() {
  const classes = useStyles();
  const date = new Date().getDate() + 1;
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const formattedDate = ("0" + date).slice(-2);
  const formattedMonth = ("0" + month).slice(-2);
  const fullDate = year + "-" + formattedMonth + "-" + formattedDate;

  const [selectedDate, setSelectedDate] = React.useState(new Date(fullDate));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div class="booking-container">
      <Paper className={classes.bookSitterPaper}>
        <h2 class="avail">Available</h2>
        <div className="date">
          <form class="book-sitter-form">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Pickup"
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label=" "
              variant="inline"
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />

            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Drop off"
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label=" "
              variant="inline"
              value={selectedDate}
              onChange={handleDateChange}
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
          </form>
        </div>
      </Paper>
    </div>
  );
}
export default BookSitter;
