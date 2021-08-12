import React, { useContext, createContext, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import News from "./pages/News.js";
import Login from "./pages/Login.js";
import SingleNew from "./pages/SingleNew.js";
import Dashboard from "./pages/Dashboard.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token != null || "") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className={"App"}>
        <Header />
        <Switch>
          {isLoggedIn ? 
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          :
            <Route path="/sign-in">
              <Login />
            </Route>
          }
          <Route exact path="/" pathName="home">
            <News newId={props.newId} />
          </Route>
          <Route
            exact
            path="/:newId"
            render={(props) => (
              <SingleNew newId={props.match.params.newId} {...props} />
            )}
          />
          <Route default render={()=>(<h1>404 Not Found</h1>)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

////////////////////////////////
////////////////////////////////
