import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, FormControl, 
          InputLabel, Select, MenuItem, Button, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import TextFieldInput from '../Components/shared/TextFieldInput'
 
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: 275,
    margin: '4px 4px',
    padding: '10px 10px',
    direction: "column",
    alignItems: "center",
    justify: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: 'center'
  },
  formControl: {
    margin: '4px 4px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: '8%',
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

});

export default function UserProfile() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date('2000-01-01T21:11:54'))
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressOne, setAddressOne] = useState('')
  const [addressTwo, setAddressTwo] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [aboutme, setAboutMe] = useState('Tell Us about yourself')

  // const [ inputState, setInputState ] = useState({
  //   firstName: '', 
  //   lastName: '',
  //   gender: '',
  //   selectedDate: new Date('2000-01-01T21:11:54'),
  //   emailAddress: '',
  //   phoneNumber: '',
  //   addressOne: '',
  //   addressTwo: '',
  //   city: '',
  //   province: '',
  //   zipCode: '',
  //   country: '',
  //   aboutme: 'Tell Us about yourself'
  //   })


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault()
    const userProfile = {
      firstName,
      lastName,
      gender,
      dateOfBirth: selectedDate,
      email: emailAddress,
      phoneNumber,
      address: {
        addressOne,
        addressTwo,
        city,
        province,
        zipCode,
        country
      },
      aboutme
    }
    console.log(userProfile)
  }

  return (
    <React.Fragment>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
          Edit Profile
        </Typography>
      </CardContent>
    <form onSubmit={handleSubmitForm}> 
    <Grid container spacing={4} >
      <Grid item xs={12}>
        <TextFieldInput id="firstName" name="firstName" label="First name" value={firstName}
          onChange={event => {
            setFirstName(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
      <TextFieldInput id="lastName" name="lastName" label="Last name" value={lastName}
        onChange={event => {
          setLastName(event.target.value)
        }}
      />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined">Gender</InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={gender}
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
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="email" name="email" label="Email Address" value={emailAddress}
          onChange={event => {
            setEmailAddress(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="phoneNumber" name="phoneNumber" label="Phone Number" value={phoneNumber}
          onChange={event => {
            setPhoneNumber(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="address1" name="address1" label="Address line 1" value={addressOne}
          onChange={event => {
            setAddressOne(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput id="address2" name="address2" label="Address line 2" value={addressTwo}
          onChange={event => {
            setAddressTwo(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="city" name="city" label="City" value={city}
          onChange={event => {
            setCity(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="state" name="state" label="State/Province/Region" value={province}
          onChange={event => {
            setProvince(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="zip" name="zip" label="Zip / Postal code" value={zipCode}
          onChange={event => {
            setZipCode(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldInput id="country" name="country" label="Country" value={country}
          onChange={event => {
            setCountry(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
      <TextFieldInput id="aboutme" label="Tell us about yourself" rows="4" variant="outlined" 
        value={aboutme}
        onChange={event => {
          setAboutMe(event.target.value)
        }}
      />
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
    </Card>
  </React.Fragment>
  );
}