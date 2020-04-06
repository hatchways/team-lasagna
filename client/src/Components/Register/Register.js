import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm/RegisterForm";

function Register() {
  return (
    <div class="grid-container">
      <h1 class="heading">Sign up</h1>
      <RegisterForm class="register" />
      <div class="login-link">
        Already a member? <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Register;
