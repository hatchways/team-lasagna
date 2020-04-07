import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm/RegisterForm";
import { Paper } from "@material-ui/core";
function Register() {
  return (
    <div className="paper-grid">
      <Paper>
        <div className="grid-container">
          <h1 className="heading">Sign up</h1>
          <RegisterForm className="register" />
          <div className="login-link">
            Already a member? <a href="/login">Login</a>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Register;
