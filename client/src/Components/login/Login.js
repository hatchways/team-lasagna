import React from "react";
import LoginForm from "./LoginForm/LoginForm";
function Login() {
  return (
    <div class="grid-container">
      <h1 class="heading">Login</h1>
      <LoginForm />
      <div class="login-link">
        Not a member? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}
export default Login;
