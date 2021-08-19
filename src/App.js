import React, { useContext, createContext, useState, useEffect } from "react";
import "./App.css";
import "./animate.css";
import Header from "./components/Header.js";
import News from "./pages/News.js";
import Login from "./pages/Login.js";
import SingleNew from "./pages/SingleNew.js";
import Dashboard from "./pages/Dashboard.js";
import ScrollUp from './components/ScrollUp';
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
            <Route path="/backoffice/dashboard" exact>
              <Dashboard />
            </Route>
          :
            <Route path="/sign-in" exact>
              <Login />
            </Route>
          }
          <Route exact path="/">
            <News newId={props.newId} />
          </Route>
          <Route
            path="/:newId"
            exact
            render={(props) => (
              <SingleNew newId={props.match.params.newId}  />
            )}
          />
          <Route render={()=>(<h1>404 Not Found</h1>)} />
        </Switch>
        <ScrollUp />
      </div>
    </Router>
  );
}

export default App;

////////////////////////////////
////////////////////////////////
