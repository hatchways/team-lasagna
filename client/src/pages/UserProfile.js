import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField, FormControlLabel, Checkbox, Card, FormControl, 
          InputLabel, Select, MenuItem, CardActions, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
 
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '4px 4px',
    padding: '10px 10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: '4px 4px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: '4px',
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault()
    
  }

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
    <Card className={classes.root}>
    <Typography variant="h6" gutterBottom>
      Edit Profile
    <form onSubmit={handleSubmitForm}> 
    
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="fname"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="lname"
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
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="email"
          name="email"
          label="Email Address"
          fullWidth
          autoComplete="email address"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          fullWidth
          autoComplete="phone number"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="billing address-line1"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          autoComplete="billing address-line2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="billing address-level2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="state" name="state" label="State/Province/Region" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          autoComplete="billing postal-code"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="billing country"
        />
      </Grid>
      <Grid item xs={12}>
      <TextField
        id="aboutme"
        label="Tell us about yourself"
        multiline
        rows="4"
        defaultValue="Tell Us about yourself"
        variant="outlined"
      />
      </Grid>
    </Grid>
    <CardActions>
      <Button size="small">Save</Button>
    </CardActions>
    </form>
    </Typography>
    </Card>
  </React.Fragment>
  );
}