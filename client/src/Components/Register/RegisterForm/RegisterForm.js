import React from "react";
import axios from "axios";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { TextField, Button } from "@material-ui/core";

function RegisterForm() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const onSubmit = async data => {
    const createUserRes = await axios.post("http://localhost:3001/register", {
      email: data.email,
      password: data.password
    });
    console.log(createUserRes.data._id);

    if (createUserRes.status === 200) {
      const createProfileRes = await axios.post(
        "http://localhost:3001/profile",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          user: createUserRes.data._id
        }
      );
    }
  };
  //console.log(watch("example"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="flex-container">
        <RHFInput
          as={<TextField type="email" />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="email"
          label="Your Email"
          variant="outlined"
        />
        <RHFInput
          as={<TextField />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="firstName"
          label="Your first name"
          variant="outlined"
        />
        <RHFInput
          as={<TextField />}
          register={register}
          setValue={setValue}
          rules={{ required: true }}
          name="lastName"
          label="Your last name"
          variant="outlined"
        />
        <RHFInput
          as={<TextField type="password" />}
          register={register}
          setValue={setValue}
          rules={{ required: true, min: 6 }}
          name="password"
          label="Create a password"
          variant="outlined"
        />
      </div>
      <Button variant="contained" color="red" type="submit">
        SIGN UP
      </Button>
    </form>
  );
}

export default RegisterForm;
