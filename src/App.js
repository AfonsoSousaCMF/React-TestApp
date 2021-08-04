import "./App.css";
import Header from "./components/Header.js";
import News from './pages/News.js'
import Menu from './components/Menu.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={"App"}>
        <Header />
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/" exact>
            <News />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;