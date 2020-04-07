import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Paper } from "@material-ui/core";
import "./Login.css";
function Login() {
  return (
    <div class="paper-grid">
      <Paper>
        <div class="grid-container">
          <h1 class="heading">Login</h1>
          <LoginForm />
          <div class="login-link">
            Not a member? <a href="/signup">Sign up</a>
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default Login;
