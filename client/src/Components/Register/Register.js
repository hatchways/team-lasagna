import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm/RegisterForm";
import { Paper, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
link: {
  color: "#f04040",
}
paperGrid :{
  display: grid,
  gridTemplateColumns: '1fr 4fr 1fr',
  gridTemplateAreas: ". p .",
}
MuiPaper :{
  grid-area: p;
}
gridContainer: {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr 1fr 1fr',
  gridTemplateAreas:
    `'. . . h . . .'
    '. . r r r . .'
    '. . . s . . .'`,
}
form {
  grid-area: r,
}

heading {
  padding-top: 1em,
  grid-area: h,
  text-align: center,
}
.login-link {
  grid-area: s,
  text-align: center,
  margin: 1em,
  padding-bottom: 3em,
}

})
function Register() {
    const classes = useStyles();
  return (
    <div className={classes.paperGrid}>
      <Paper className = {classes.MuiPaper}>
        <div className = {classes.gridContainer}>
          <h1 className={classes.heading}>Sign up</h1>
          <RegisterForm className={classes.register} />
          <div className={classes.loginLink}>
            Already a member? <a className={classes.link} href="/login">Login</a>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Register;
