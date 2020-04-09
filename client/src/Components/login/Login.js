import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Paper } from "@material-ui/core";
import "./Login.css";
function Login() {
  return (
    <div className="paper-grid">
      <Paper>
        <div className="grid-container">
          <h1 className="heading">Login</h1>
          <LoginForm />
          <div className="login-link">
            Not a member? <a href="/signup">Sign up</a>
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default Login;
