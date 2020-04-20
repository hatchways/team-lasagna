import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button, Link, Avatar, Menu, MenuItem } from "@material-ui/core";
import { authService } from "../../../services/auth.service";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    display: "flex",
    alignItems: "center",
  },
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

const MenuList = ({ isAuthenticated }) => {
  // let profile = {};
  const classes = useStyles();
  const [profilePic, setProfilePic] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [authed, setAuthed] = useState(false);

  const open = Boolean(anchorEl);

  const getProfilePic = async () => {
    const parsed = JSON.parse(localStorage.getItem("jwt"));
    if (parsed) {
      const decoded = jwtDecode(parsed.token);
      try {
        const profile = await axios.get(
          "/profile/user/" + decoded._id,
          authService.authHeader()
        );
        setProfilePic(profile.data.profilePic);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setAuthed(isAuthenticated());
    getProfilePic();
  }, [isAuthenticated()]);

  // dropdown events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // dropdown events END

  const logout = (e) => {
    authService.logout();
  };

  return (
    <>
      {authed ? (
        <React.Fragment>
          <Link href="#" className={classes.toolbarLink}>
            My Jobs
          </Link>
          <Link href="#" className={classes.toolbarLink}>
            Messages
          </Link>
          <Avatar alt="Remy Sharp" src={profilePic} onClick={handleClick} />
          <Menu
            keepMounted
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            anchorEl={anchorEl}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            <MenuItem value={10} onClick={handleClose}>
              <Link href="/editProfile" className={classes.toolbarLink}>
                My Profile
              </Link>
            </MenuItem>
            <MenuItem value={20} onClick={handleClose}>
              <Link
                href="/login"
                className={classes.toolbarLink}
                onClick={logout}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link href="#" className={classes.toolbarLink}>
            Become a Sitter
          </Link>
          <Button
            variant="outlined"
            size="small"
            href="/signup"
            className={clsx(classes.myButton)}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            size="small"
            href="/login"
            className={clsx(classes.myButton)}
          >
            Login
          </Button>
        </React.Fragment>
      )}
    </>
  );
};

export default MenuList;
