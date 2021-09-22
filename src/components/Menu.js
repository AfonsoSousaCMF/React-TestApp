import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Menu({ props }) {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink to="/" exact className="link-menu">
          <ListItem button className="link-menu">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>

        {localStorage.token != null || "" ? (
          <div>
            <NavLink to="/backoffice/dashboard" className="link-menu">
              <Divider />
              <ListItem button className="link-menu">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </NavLink>
            <NavLink to="/backoffice/supports" className="link-menu">
              <Divider />
              <ListItem button className="link-menu">
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Apoios" />
              </ListItem>
            </NavLink>
          </div>
        ) : (
          <Divider />
        )}
      </List>
    </div>
  );

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
