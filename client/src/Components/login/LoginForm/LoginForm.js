import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({});

function LoginForm() {
  const classes = useStyles();
  const { register, handleSubmit, setValue, errors } = useForm();
  const [loginError, setLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  function resetError() {
    setLoginError(false);
  }
  const onSubmit = async (data) => {
    console.log(data);
    const loginRes = await axios.post("http://localhost:3001/login", {
      email: data.email,
      password: data.password,
    });
    console.log(loginRes);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="flex-container">
        <RHFInput
          register={register}
          as={<TextField type="email" className={classes.input} />}
          setValue={setValue}
          rules={{ required: true }}
          name="email"
          label="Your Email"
        />
        {errors.email && <Alert severity="error">Last name is required </Alert>}
        <RHFInput
          register={register}
          as={<TextField type="password" className={classes.input} />}
          setValue={setValue}
          rules={{ required: true }}
          name="password"
          label="Your password"
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
          LOGIN
        </Button>
        {loginError && <Alert severity="error">{errMsg}</Alert>}
      </div>
    </form>
  );
}

export default LoginForm;
