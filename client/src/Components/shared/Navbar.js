import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Button, Link} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    marginRight: '20px'
  },
  myButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 42,
    padding: '0 25px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginRight: '10px'
  },
}));

export default function Header(props) {
  const classes = useStyles();

  let menuList = ''

  if(props.isAuthenticated) {
    menuList = (
      <React.Fragment>
        <Link href="#" className={classes.toolbarLink}>
          My Jobs
        </Link>
        <Link href="#" className={classes.toolbarLink}>
          Messages
        </Link>
      </React.Fragment>
    )
  } else {
    menuList = (
      <React.Fragment>
      <Link href="#" className={classes.toolbarLink}>
        Become a Sitter
      </Link>
      <Button variant="outlined" size="small" href="/signup" className={clsx(classes.myButton)}>
        Sign up
      </Button>
      <Button variant="outlined" size="small" href="/login" className={clsx(classes.myButton)}>
        Login
      </Button>
      </React.Fragment>
    )
  }

  // const handleSignUp = (event) => {
  //   console.log('signup clicked')
  // }

  return (
    <React.Fragment>
      <Toolbar disableGutters={false} className={classes.toolbar}>
        <a href="/">
          <img src={"../assets/logo.png"} alt={"dogs"} href="/dashboard" />
        </a>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        ></Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {menuList}
      </Toolbar>
    </React.Fragment>
  );
}
