import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Menu from "./Menu.js";
import Dropdown from "react-bootstrap/Dropdown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Redirect,
  withRouter,
  useParams,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
  let authButton;

  useEffect(() => {
    if (localStorage.token != null || "") {
      setIsLoggedIn(true);
    } else {
      props.history.push("/");
      setIsLoggedIn(false);
    }
  }, []);

  const logout = (e) => {
    localStorage.clear();
    props.history.push("/");
    window.location.reload();
  };

  if (isLoggedIn) {
    authButton = (
      <>
        <Dropdown>
          <Dropdown.Toggle
            className="auth-dropdown"
            id="dropdown-autoclose-true"

          >
            <AccountCircleIcon className="username-avatar" />
            <span className="username">{localStorage.authUser}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="auth-dropdown-menu">
            <Button onClick={logout} className="auth-dropdown-item">
              Logout
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      </>
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

          <Typography variant="h6" className={"align-items-center"}>
            Observatório Apoios Financeiros
          </Typography>

          {authButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
