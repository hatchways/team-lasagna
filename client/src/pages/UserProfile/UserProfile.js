import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import UserProfileForm from "../../Components/UserProfile/UserProfileForm";
import { Paper } from "@material-ui/core";

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

function UserProfile() {
  const classes = useStyles();
  return (
    <React.Fragment>
    <Paper>
      <div className={classes.root}>
      <h1 className={classes.title} >Edit Profile</h1>   
        <UserProfileForm />
      </div>
    </Paper>
    </React.Fragment>
    
  );
}
export default UserProfile;
