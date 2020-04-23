import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";
import SettingsForm from "../Settings/SettingsForm/SettingsForm";
//import "./Settings.css"

const useStyles = makeStyles((theme) => ({
  paperGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr 1fr',
    gridTemplateAreas: ". p ."
  },
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

function Settings() {
  const classes = useStyles();
  return (
    <>
    <Paper>
      <div className={classes.root}>
      <h1 className={classes.title}>Update Password</h1> 
            <SettingsForm />
      </div>
    </Paper>
    </>
    
  );
}
export default Settings;
