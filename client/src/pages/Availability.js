import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AvailabilityForm from "../Components/Availability/AvailabilityForm";
import { Paper, Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
    margin: '4px 4px',
    padding: '10px 10px',
    direction: "column",
    alignItems: "center",
    justify: "center"
  },
  title: {
    textAlign: 'center'
  },
}))

function Availability() {
  const classes = useStyles();
  return (
    <React.Fragment>
    <Paper>
      <div className={classes.root}>
      <h1 className={classes.title} >Edit Availability</h1>   
        <AvailabilityForm />
      </div>
    </Paper>
    </React.Fragment>
    
  );
}
export default Availability;
