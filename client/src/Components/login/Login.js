import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Paper, makeStyles } from "@material-ui/core";
//import "./Login.css";
const useStyles = makeStyles({
  link: {
    color: "#f04040",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr 1fr 1fr 1fr",
    gridTemplateAreas: `'. . . h . . .'
    '. . r r r . .'
    '. . . s . . .'`,
    alignSelf: "center",
    gridArea: "p",
  },
  loginForm: {
    gridArea: "r",
  },
  heading: {
    paddingTop: "1em",
    gridArea: "h",
    textAlign: "center",
  },
  loginLink: {
    gridArea: "s",
    textAlign: "center",
    margin: "1em",
    paddingBottom: "3em",
  },
  loginGrid: {
    maxWidth: "600px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 1fr",
    gridTemplateAreas:". p .",
    alignSelf: "center",
  },
});
function Login() {
  const classes = useStyles();
  return (
    <div className={classes.loginGrid}>
      <Paper className={classes.grid}>
        <div className={classes.gridContainer}>
          <h1 className={classes.heading}>Login</h1>
          <LoginForm className={classes.loginForm} />
          <div className={classes.loginLink}>
            Not a member?{" "}
            <a className={classes.link} href="/signup">
              Sign up
            </a>
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default Login;
