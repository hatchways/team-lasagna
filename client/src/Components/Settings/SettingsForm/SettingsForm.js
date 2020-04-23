import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { TextField, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px'
  },
  input: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  button: {
    margin: "20px",
    width: "130px ",
    height: "55px",
    background: "#f04040",
    alignSelf: "center",
    color: "white",
  },
});

function SettingsForm() {
  const classes = useStyles();
  const [passUpdateError, setpassUpdateError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [passUpdateSuccess, setpassUpdateSuccess] = useState(false);
  const [sucMsg, setSucMsg] = useState("");
  const { register, handleSubmit, setValue, errors } = useForm();

  const token = JSON.parse(localStorage.getItem("jwt")) 
  const profile = JSON.parse(localStorage.getItem("profile"))
  const user = profile.user

  const onSubmit = async (data) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      repeatPassword: data.repeatPassword,
      userId: user,
      token
    };
    if (data.newPassword !== data.repeatPassword) {
      setpassUpdateError(true);
      setErrMsg("New Password does not match repeat Password");
      return;
    }
    delete payload.repeatPassword;
    try {
      const updateUserRes = await axios.post("/login/updatePassword", payload);
      console.log(updateUserRes)
      setpassUpdateError(false)
      setpassUpdateSuccess(true)
      setSucMsg(updateUserRes.data.msg)
    } catch (err) {
      setpassUpdateError(true);
      console.log(err)
      setErrMsg('Internal Server Error');
    }
  }

  function resetError() {
    setpassUpdateError(false);
    setpassUpdateSuccess(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} align="center">
        <RHFInput
          as={<TextField type="password" className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true, minLength: 6 }}
          name="oldPassword"
          label="Your Old Password"
        />
        {errors.oldPassword && errors.oldPassword.type === "required" && (
          <Alert severity="error">Old Password required </Alert>
        )}
        {errors.oldPassword && errors.oldPassword.type === "minLength" && (
          <Alert severity="error">must be at least 6 characters long</Alert>
        )}
        </Grid>
        <Grid item xs={12} align="center">
        <RHFInput
          as={<TextField type="password" className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true, minLength: 6 }}
          name="newPassword"
          label="Enter new Password"
        />
        {errors.newPassword && errors.newPassword.type === "required" && (
          <Alert severity="error">New Password required </Alert>
        )}
        {errors.newPassword && errors.newPassword.type === "minLength" && (
          <Alert severity="error">must be at least 6 characters long</Alert>
        )}
        </Grid>
        <Grid item xs={12} align="center">
        <RHFInput
          as={<TextField type="password" className={classes.input} />}
          register={register}
          setValue={setValue}
          rules={{ required: true, minLength: 6 }}
          name="repeatPassword"
          label="Repeat new password"
        />
        {errors.repeatPassword && errors.repeatPassword.type === "required" && (
          <Alert severity="error">Repeat password is required</Alert>
        )}
        {errors.repeatPassword && errors.repeatPassword.type === "minLength" && (
          <Alert severity="error">must be at least 6 characters long</Alert>
        )}
        </Grid>
        <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={resetError}
          type="submit"
          className={classes.button}
        >
          UPDATE PASSWORD
        </Button>
        {passUpdateError && <Alert severity="error">{errMsg}</Alert>}
        {passUpdateSuccess && <Alert severity="success">{sucMsg}</Alert>}
        </Grid>
    </form>
  );
}

export default SettingsForm;
