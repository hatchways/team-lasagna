import React, { useState, useEffect, forwardRef } from "react";
import { Link, MenuItem } from "@material-ui/core";
import { authService } from "../../../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    marginRight: "20px",
  },
  myButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 42,
    padding: "0 25px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginRight: "10px",
  },
}));

const CollapsedMenuList = forwardRef((props, ref) => {
  const classes = useStyles();
  // let profile = {};
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(props.isAuthenticated());
  }, [props.isAuthenticated()]);
  // dropdown events END

  const logout = (e) => {
    authService.logout();
  };

  return (
    <>
      {authed ? (
        <>
          <MenuItem>
            <Link href="/editProfile" className={classes.toolbarLink}>
              My Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="#" className={classes.toolbarLink}>
              My Jobs
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="#" className={classes.toolbarLink}>
              Messages
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/login"
              className={classes.toolbarLink}
              onClick={logout}
            >
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link href="#" className={classes.toolbarLink} onClick={logout}>
              Become a Sitter
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/signup"
              className={classes.toolbarLink}
              onClick={logout}
            >
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/login"
              className={classes.toolbarLink}
              onClick={logout}
            >
              Login
            </Link>
          </MenuItem>
        </>
      )}
    </>
  );
});

export default CollapsedMenuList;
