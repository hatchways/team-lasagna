import React, { useState } from "react";
import { Paper, Link, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      maxHeight: "100%",
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

export default function CalendarView(props) {
  const classes = useStyles();
  const [dates, changeDate] = useState(new Date())

  if (props.bookings) {
      //console.log('bookings loaded') 
      //console.log(props.bookings)
  }

  let sitterOptions = ''
  if(!props.owner) {
    sitterOptions = (
      <Typography className={classes.linkButton}>
        <Link href="/bookings">
        Bookings
        </Link>
        <Link href="/upcomingJobs">
        Upcoming jobs
        </Link>
        <Link href="/completedJobs">
        Completed jobs
        </Link>
      </Typography>
    )
  }

  return (
    <>
      {sitterOptions}
      <Paper className={classes.calend}>
        <Calendar 
        date={dates}
        onChange={changeDate} />
      </Paper>
    </>
  )
}
  