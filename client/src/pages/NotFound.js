import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Avatar, CardContent, Typography, Button, CardMedia} from '@material-ui/core';
//import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    minHeight: '100%',
    margin: '20px 20px'
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  spaced: {
    marginTop: '30px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function ProfilePhoto() {
  const classes = useStyles();
  const [photoPath, setPhotoPath] = useState('../assets/404error.jpg')

  return (
    <Card className={classes.root}>
      <Grid item xs={12} style={{textAlign: "center", paddingBottom: '4%'}}>
        <Typography component="h2" variant="h2">
          404
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Avatar 
          alt="404Error" 
          src={photoPath}
          className={classes.large}  
        />
      </Grid> 
      <Grid item xs={12} className={classes.spaced}>
        <CardContent style={{textAlign: "center"}}>
          <Typography variant="h5" color="textSecondary" component="h5">
            Page not Found
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} align="center">
        <Button href="/" variant="contained" color="secondary" className={classes.spaced}>
          Go back to the Home Page
        </Button>
      </Grid>
    </Card>
  );
}
