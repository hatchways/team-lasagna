import React from "react";
import "./RegisterForm.css";
import { TextField, Button } from "@material-ui/core";

class RegisterForm extends React.Component {
  state = {};
  render() {
    return (
      <form>
        <div class="flex-container">
          <TextField
            id="email"
            label="Your Email"
            type="email"
            variant="outlined"
          ></TextField>
          <TextField
            id="name"
            label="Your name"
            type="string"
            variant="outlined"
          ></TextField>
          <TextField
            id="email"
            label="Create Password"
            type="string"
            variant="outlined"
          ></TextField>
        </div>
        <Button variant="contained" color="red">
          SIGN UP
        </Button>
      </form>
    );
  }
}

export default RegisterForm;
