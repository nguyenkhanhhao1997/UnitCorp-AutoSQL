import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  linkTo: {
    textDecoration: "none",
    color: "#000",
  },
  linkHome: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const MenuTop = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [logout, setLogout] = useState(false);

  const btnLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear(); //clear all session
    setLogout(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      y
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/" className={classes.linkTo}>
          Home
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login" className={classes.linkTo} onClick={btnLogout}>
          logout
        </Link>
      </MenuItem>
    </Menu>
  );

  if (logout) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.linkHome}>
              Logix Technology
            </Link>
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="MoreVert"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default MenuTop;
