import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { authService } from "../../../services/auth.service";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles({
  input: {
    marginTop: `5px`,
    marginBottom: `5px`,
  },
  button: {
    margin: `5px`,
    width: `130px `,
    height: `45px`,
    background: `#f04040`,
    alignSelf: `center`,
    color: `white`,
  },
});

function LoginForm() {
  const classes = useStyles({});
  const { register, handleSubmit, setValue, errors } = useForm();
  const [loginError, setLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  function resetError() {
    setLoginError(false);
  }
  const onSubmit = async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      if (res) {
        setLoginError(true);
        return setErrMsg(res);
      }
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
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
        {errors.email && (
          <Alert severity="error">Please enter your email </Alert>
        )}
        <RHFInput
          register={register}
          as={<TextField type="password" className={classes.input} />}
          setValue={setValue}
          rules={{ required: true }}
          name="password"
          label="Your password"
        />
        {errors.password && errors.password.type === "required" && (
          <Alert severity="error">Please enter your password</Alert>
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
        {loggedIn && <Redirect to="/" />}
      </div>
    </form>
  );
}

export default LoginForm;
