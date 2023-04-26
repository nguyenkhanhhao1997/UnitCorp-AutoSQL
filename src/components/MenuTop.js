import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
        <Link to="/home" className={classes.linkTo}>
          Home
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/home" className={classes.linkHome}>
              AutoSQL
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
