import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Menu from "./Menu.js";
import APIKit, { setClientToken } from "../ApiCalls/APIKit.js";
import { BrowserRouter as Router, NavLink, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
  let authButton;

  if (isLoggedIn) {
    authButton = (
      <NavLink to="/logout" className="link-auth">
        <Button className="link-auth">Logout</Button>
      </NavLink>
    );
  } else {
    authButton = (
      <NavLink to="/sign-in" className="link-auth">
        <Button className="link-auth">Sign In</Button>
      </NavLink>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />

          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          {authButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
