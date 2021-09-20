import React, { useContext, createContext, useState, useEffect } from "react";
import "./App.css";
import "./animate.css";
import Header from "./components/Header.js";
import News from "./pages/News.js";
import Login from "./pages/Login.js";
import SingleNew from "./pages/SingleNew.js";
import Dashboard from "./pages/Dashboard.js";
import ScrollUp from "./components/ScrollUp";
import SessionTimeout from "./ApiCalls/SessionTimeout.js";
import { Button, makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
}));

const LoginButton = (props) => {
  return (
    <Button
      color="secondary"
      data-testid="submit"
      fullWidth
      size="large"
      onClick={props.onClick}
      variant="contained"
    >
      Log In
    </Button>
  );
};
const LogoutButton = (props) => {
  return (
    <Button
      color="secondary"
      fullWidth
      size="large"
      onClick={props.onClick}
      variant="contained"
    >
      Logout
    </Button>
  );
};

function App(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authContext = createContext();

  function useAuth() {
    return useContext(authContext);
  }

  useEffect(() => {
    if (localStorage.token != null || "") {
      setIsLoggedIn(true);
    }
  }, []);

  function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  }

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.signin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function useProvideAuth() {
    const signin = () => {
      return signin(() => {
        this.setIsLoggedIn(true);
        setTimeout(100);
      });
    };

    const logout = () => {
      return logout(() => {
        if (localStorage.token == null || "") {
          this.setIsLoggedIn(false);
        }
        setTimeout(100);
      });
    };

    return {
      signin,
      logout,
    };
  }

  let button;
  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  if (isLoggedIn) {
    button = <LogoutButton onClick={handleClick} />;
  } else {
    button = <LoginButton onClick={handleClick} />;
  }

  return (
    <ProvideAuth>
      <Router>
        <div className={"App"}>
          <SessionTimeout isLoggedIn={isLoggedIn} logOut={handleClick} />
          <Header />
          <Switch>
            <PrivateRoute path="/backoffice/dashboard" exact>
              <Dashboard />
            </PrivateRoute>

            <Route path="/sign-in" exact>
              <Login />
            </Route>

            <Route exact path="/">
              <News newId={props.newId} />
            </Route>
            <Route
              path="/:newId"
              exact
              render={(props) => <SingleNew newId={props.match.params.newId} />}
            />
            <Route render={() => <h1>404 Not Found</h1>} />
          </Switch>
          <ScrollUp />
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;

////////////////////////////////
////////////////////////////////
