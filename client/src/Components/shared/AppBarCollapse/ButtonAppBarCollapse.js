import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    margin: "10px",
    boxShadow: "none",
  },
}));

const ButtonAppBarCollapse = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className={classes.buttonCollapse}>
      <IconButton onClick={handleMenu}>
        <HomeIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
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
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
};
export default ButtonAppBarCollapse;
