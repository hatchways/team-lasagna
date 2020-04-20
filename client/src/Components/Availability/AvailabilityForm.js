import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormLabel, Checkbox, Button, FormHelperText, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { Alert } from "@material-ui/lab";
import AlternateCheckbox from './AlternateCheckbox'

const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: 'center'
    },
    availableSpace: {
      marginBottom: '20px',
    },
    item: {
      border: '1px solid #fff',
      minWidth: '50px',
      fontSize: '20px',
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
    checkLabel: {
      marginTop: '28px',
      textAlign: 'center'
    }
  }))

export default function Availability() {
  const classes = useStyles(); 
  const [profile, setProfile] = useState({});
  const [available, setAvailable] = useState(false)
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  })
  const [checkedItems, setCheckedItems] = useState({
    sundays:false, mondays: false, 
    tuesdays: false, wednesdays: false, 
    thursdays: false, fridays: false, saturdays: false})
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
          lastName: fetchedProfile.data.lastName
        })
        setAvailable(fetchedProfile.data.available)
        setCheckedItems(fetchedProfile.data.availability)
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

  const checkboxes = [
    {id: 1, label: 'Sundays', name: 'sundays'},
    {id: 2, label: 'Mondays', name: 'mondays'},
    {id: 3, label: 'Tuesdays', name: 'tuesdays'},
    {id: 4, label: 'Wednesdays', name: 'wednesdays'},
    {id: 5, label: 'Thursdays', name: 'thursdays'},
    {id: 6, label: 'Fridays', name: 'fridays'},
    {id: 7, label: 'Saturdays', name: 'saturdays'}
  ]

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked)
  }

  const handleCheckedChange = (event) => {
		setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    const userProfile = {
      available,
      availability: checkedItems,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      user
    }
    console.log(userProfile);
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
      <div className={classes.availableSpace}>
        <FormLabel>Available:</FormLabel>
        <Checkbox
          name="available"
          checked={available}
          onChange={handleAvailableChange}
        />
        </div>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <div className={classes.availableSpace}>
        <FormLabel>Available Days:</FormLabel>
      </div>
      <Grid container justify="space-evenly" className={classes.availableSpace}>
        { checkboxes.map(item => (
      <Grid key={item.id} className={classes.item}>
        <AlternateCheckbox
          name={item.name}
          checked={checkedItems[item.name]}
          onChange={handleCheckedChange}
        />
      <FormHelperText className={classes.checkLabel}>{item.label}</FormHelperText>
      </Grid>
      )) 
      }
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