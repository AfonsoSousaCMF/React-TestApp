import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Menu from "./Menu.js";
import {
  BrowserRouter as Router,
  NavLink,
  useParams,
} from "react-router-dom";

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

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
          <Menu />
        
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <NavLink to="/sign-in" className="link-auth">
            <Button className="link-auth">Sign In</Button>
          </NavLink>
          <NavLink to="/sign-up" className="link-auth">
            <Button className="link-auth">Sign Up</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
