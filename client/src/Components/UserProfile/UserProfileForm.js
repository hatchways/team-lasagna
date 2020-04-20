import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, FormLabel,
          InputLabel, Input, Select, InputAdornment, MenuItem, Button, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker } from '@material-ui/pickers';
import axios from "axios";
import TextFieldInput from './TextFieldInput'
import { Alert } from "@material-ui/lab";
 
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: 'center'
  },
  formControl: {
    margin: '4px 4px',
    minWidth: 120,
  },
  control: {
    padding: theme.spacing(2),
  },
  availableSpace: {
    marginBottom: '20px',
  },
  margin: {
    marginTop: '10px'
  },
  item: {
    border: '1px solid #fff',
    fontSize: '30px',
    textAlign: 'center',
  },
  myButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: '8%',
  },
  checkmark: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '25px',
    width: '25px',
    backgroundColor: '#eee'
  }
}))

export default function UserProfile() {
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [gender, setGender] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date('2000-01-01T21:11:54'))
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    hourlyRate: "",
    birthDate: selectedDate,
    phone: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    about: "",
  })

  const localProfile = JSON.parse(localStorage.getItem("profile"))
  const myId = localProfile._id
  const user = localProfile.user

  useEffect(() => {
    getProfile(myId);
  }, [myId]);

  async function getProfile(id) {
    try {
      const fetchedProfile = await axios.get(
        "http://localhost:3001/profile/" + id
      );
      console.log(fetchedProfile.data);
      if (fetchedProfile.data) {
        setProfile(fetchedProfile.data);
        setInputs({
          firstName: fetchedProfile.data.firstName,
          lastName: fetchedProfile.data.lastName,
          hourlyRate: fetchedProfile.data.hourlyRate,
          birthDate: fetchedProfile.data.birthDate,
          phone: fetchedProfile.data.phone,
          address1: fetchedProfile.data.address.address1,
          address2: fetchedProfile.data.address.address2,
          city: fetchedProfile.data.address.city,
          province: fetchedProfile.data.address.province,
          zipCode: fetchedProfile.data.address.zipCode,
          country: fetchedProfile.data.address.country,
          about: fetchedProfile.data.about,
        });
        setGender(fetchedProfile.data.gender)
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProfile(id, updatedValues) {
    setSuccess(false);
    setError(false);
    setProcessing(true);
    try {
      const updatedProfile = await axios.put(
        "http://localhost:3001/profile/" + id, updatedValues
      )
      console.log(updatedProfile);
      if (updatedProfile.data) {
        setProfile(updatedProfile.data);
      }
      setProcessing(false);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setProcessing(false);
      setError(true);
      console.log(err)
    }
  }

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault()
    const userProfile = {
      gender,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      hourlyRate: inputs.hourlyRate,
      birthDate: selectedDate,
      phone: inputs.phone,
      address: {
        address1: inputs.address1,
        address2: inputs.address2,
        city: inputs.city,
        province: inputs.province,
        zipCode: inputs.zipCode,
        country: inputs.country
      },
      about: inputs.about,
      user
    }
    updateProfile(myId, userProfile)
  }

  return (
    <form onSubmit={handleSubmitForm}>
    <Grid item xs={12} align="center">
      {processing && <Alert severity="info">Loading...</Alert>}
      {error && <Alert severity="error">Error! Please try again...</Alert>}
      {success && (
        <Alert severity="success">
          User Profile successfully updated!
        </Alert>
      )}
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="flex-start" className={classes.availableSpace}>
      <FormControl fullWidth className={classes.margin}>
        <FormLabel>Hourly Rate:</FormLabel>
        <Input
          id="standard-adornment-amount"
          value={inputs.hourlyRate}
          name="hourlyRate"
          onChange={handleInputChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      </Grid>
    </Grid>
​
    <Grid container spacing={4} >
      <Grid item xs={12}>
        <TextFieldInput id="firstName" name="firstName" label="First name"  value={inputs.firstName} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
      <TextFieldInput id="lastName" name="lastName" label="Last name" value={inputs.lastName} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined">Gender</InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={gender}
          name="gender"
          onChange={handleGenderChange}
          label="Gender"
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Birth Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          name="birthDate"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="phone" name="phone" label="Phone Number" value={inputs.phone} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="address1" name="address1" label="Address line 1" value={inputs.address1} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="address2" name="address2" label="Address line 2" value={inputs.address2} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="city" name="city" label="City" value={inputs.city} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="state" name="province" label="State/Province/Region" value={inputs.province} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="zip" name="zipCode" label="Zip / Postal code" value={inputs.zipCode} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="country" name="country" label="Country" value={inputs.country} onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
      <TextFieldInput id="about" name="about" label="Tell us about yourself" rows="4" variant="outlined" onChange={handleInputChange}value={inputs.about}/>
      </Grid>
      </Grid>
      <CardContent>
      <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
        <Button varaint="contained" size="large" color="secondary" 
          type='submit'
          className={clsx(classes.myButton)}>
          SAVE
        </Button>
      </Typography>
      </CardContent>
    </form>
    
  );
}