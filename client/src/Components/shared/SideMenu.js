import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 4,
    direction: "column",
    alignItems: "center",
    justify: "center"
  },
  content: {
    paddingBottom: theme.spacing.unit * 4,
    fontSize: 18,
  },
  item: {
    textDecoration: 'none',
    color: 'grey'
  },
  activeItem: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black'
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [sections, setSections] = useState(
    [{
        "id": 0,
        "title": "Edit Profile",
        "url": "/editProfile",
        "active": false
      },{
        "id": 1,
        "title": "Profile Photo",
        "url": "/profilePhoto",
        "active": false
      }, {
        "id": 2,
        "title": "Availability",
        "url": "/availability",
        "active": false
      }, {
        "id": 3,
        "title": "Payment",
        "url": "/payment",
        "active": false
      }, {
        "id": 5,
        "title": "Settings",
        "url": "/settings",
        "active": false
      } ]
  )
  
  return (
    <div className={classes.root}>
      <React.Fragment>
      {sections.map((section) => (
        <Grid item xs={12} className={classes.content} key={section.id}>
          <NavLink 
            to={section.url}
            exact
            className={classes.item}
            activeClassName={classes.activeItem}
          >
          {section.title}</NavLink>
        </Grid>
        ))}
      </React.Fragment>
    </div>
  );
}
