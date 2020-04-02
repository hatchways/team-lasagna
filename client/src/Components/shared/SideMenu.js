import React from 'react';
import {Paper, Typography, Link} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2),
    padding: "6%",
    width: "80%"
  },
  menuitem: {

  }
}));

export default function MenuListComposition() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem>Edit Profile</MenuItem>
          <MenuItem>Profile Photo</MenuItem>
          <MenuItem>Availability</MenuItem>
          <MenuItem>Payment</MenuItem>
          <MenuItem>Security</MenuItem>
          <MenuItem>Settings</MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
