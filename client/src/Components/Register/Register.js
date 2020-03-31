import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm/RegisterForm";

class Register extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    );
  }
}

export default Register;
