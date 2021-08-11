import "./App.css";
import Header from "./components/Header.js";
import News from './pages/News.js'
import Login from './pages/Login.js'
import SingleNew from './pages/SingleNew.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div className={"App"}>
        <Header />
        <Switch>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route exact path="/">
            <News newId={props.newId}/>
          </Route>
          <Route exact path="/:newId" render={(props) => <SingleNew newId={props.match.params.newId} {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;