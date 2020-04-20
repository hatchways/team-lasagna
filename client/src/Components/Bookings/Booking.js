import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardActions, Button, Avatar } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    marginRight: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  content: {
    flex: '1',
  },
  controls: {
    display: 'flex',
    alignItems: 'left',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    marginLeft: 'auto',
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  fullName: {
    marginLeft: '14px',
  }
}));

export default function Booking(props) {
  const classes = useStyles();
  const theme = useTheme();
  
  //console.log(props.booking)
  let request = props.booking.request
  let ownerProfile = props.booking.ownerProfile
  let duration = ''
  let ownerFullName = ''
  let address1 = ''
  let address2 = ''
  let city = ''
  let province = ''
  let zipCode = ''
  let country = ''
  let acceptButton = ''
  let declineButton = ''
  let completeButton = ''
  let completedButton = ''
  
  if (props.booking) {
    if (Moment(new Date(request.start)).isSame(new Date(request.end), 'day')) {
      //console.log('the job starts and end same day')
      duration = Moment(new Date(request.start)).format("D MMMM YYYY, hA").concat(" - ").concat(Moment(new Date(request.end)).format("hA"))
    } else {
      duration = Moment(new Date(request.start)).format("D MMMM YYYY, hA").concat( " - ").concat(Moment(new Date(request.end)).format("D MMMM YYYY, hA"))
    }
    ownerFullName = (ownerProfile.firstName).concat(" ").concat(ownerProfile.lastName)
    
    address1 = `${ownerProfile.address.address1}`
    address2 = `${ownerProfile.address.address2}`
    city = `${ownerProfile.address.city}`
    province = `${ownerProfile.address.province}`
    zipCode = `${ownerProfile.address.zipCode}`
    country = `${ownerProfile.address.country}`
  }
  if(props.accept) {
    acceptButton = 
    <Button variant="contained" size="medium" color="primary" style={{marginRight: '8px'}} onClick={props.accept}>
      Accept
    </Button>
  }
  if(props.decline) {
    declineButton =
    <Button variant="contained" size="medium" color="primary" onClick={props.decline}>
      Decline
    </Button>
  }
  if(props.complete) {
    completeButton = 
    <Button variant="contained" size="medium" color="primary" onClick={props.complete}>
      Complete Task
    </Button>
  }
  if (props.completed) {
    completedButton =
      <Button variant="contained" size="medium" disabled color="primary">
        Completed
      </Button>
  }
  
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6">
          Job Details
        </Typography>
        <Typography variant="subtitle1">
          {duration}
        </Typography>
      </CardContent>
      <div className={classes.controls}>
        <Avatar alt="Owner Pic" src={ownerProfile.profilePic} className={classes.large} />
        <Typography variant="subtitle1" className={classes.fullName}>
          Name: {ownerFullName}<br/>
          <span>Pick up Address:</span> {address1} {address2}
          <br/>{city} {province} {zipCode} <br/>{country}
        </Typography>
      </div>
      <CardActions className={classes.buttons} >
        {acceptButton} {declineButton} {completeButton} {completedButton}
      </CardActions>
    </Card>
  );
}
