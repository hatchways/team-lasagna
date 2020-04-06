import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  input: {
    marginTop: `5px`,
    marginBottom: `5px`,
  },
  button: {
    margin: `5px`,
    maxWidth: `200px `,
  },
});

function RegisterForm() {
  const classes = useStyles();
  const [registerError, setRegisterError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, setValue, errors } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const createUserRes = await axios.post(
        "http://localhost:3001/register",
        payload
      );
      const createProfileRes = await axios.post(
        "http://localhost:3001/profile",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          user: createUserRes.data._id,
        }
      );
      //if createProfileRes with status 200 redirect to /login
      // else display error message
      if (createProfileRes.status === 200) {
        //breaks atm no login route
        setIsRegistered(true);
      }
    } catch (err) {
      setRegisterError(true);
      setErrMsg(err.response.data.msg);
    }
  };
  function resetError() {
    setRegisterError(false);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="flex-container">
        <RHFInput
          as={<TextField type="email" className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="email"
          label="Your Email"
        />
        {errors.email && <Alert severity="error">Last name is required </Alert>}
        <RHFInput
          as={<TextField className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="firstName"
          label="Your first name"
        />
        {errors.firstName && (
          <Alert severity="error">Last name is required </Alert>
        )}
        <RHFInput
          as={<TextField className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="lastName"
          label="Your last name"
        />
        {errors.lastName && (
          <Alert severity="error">Last name is required </Alert>
        )}
        <RHFInput
          as={<TextField type="password" className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true, minLength: 6 }}
          name="password"
          label="Create a password"
        />
        {errors.password && errors.password.type === "required" && (
          <Alert severity="error">password is required</Alert>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <Alert severity="error">must be at least 6 characters long</Alert>
        )}
        <Button
          variant="contained"
          color="red"
          onClick={resetError}
          type="submit"
          className={classes.button}
        >
          SIGN UP
        </Button>
        {registerError && <Alert severity="error">{errMsg}</Alert>}
        {isRegistered && <Redirect to="/login" />}
      </div>
    </form>
  );
}

export default RegisterForm;
