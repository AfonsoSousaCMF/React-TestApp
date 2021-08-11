import React, { useEffect, useState, Component } from "react";
import {
  Typography,
  TextField,
  Container,
  Paper,
  Grid,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import LoadingScreen from "../components/LoadingScreen.js";
import APIKit, { setClientToken } from "../ApiCalls/APIKit.js";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  errors: [],
  isAuthorized: true,
  isLoading: false,
  toggleAlert: false,
};

class Login extends Component {
  state = initialState;

  //   componentDidMount() {
  //     localStorage.getItem("token")
  //   }
  componentWillUnmount() {}

  onUsernameChange = (event) => {
    // console.log(event.target.value);
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    // console.log(event.target.value );
    this.setState({ password: event.target.value });
  };

  onPressLogin = (event) => {
    event.preventDefault();
    console.log(event);
    const { username, password } = this.state;
    const payload = { username, password };

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      console.log("User:", data.data);
      console.log("Token:", data.data.token);
      setClientToken(data.data.token);
      this.setState({ isLoading: false, isAuthorized: true });

      // Redirects the user after successful Login
      <Redirect to="/" />;
    };

    const onFailure = (error) => {
      console.log("erro", error.response.data.error.errors);
      this.setState({
        errors: error.response.data.error.errors,
        isLoading: false,
        toggleAlert: true,
      });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post("http://sitea-c-1229:8000/api/v1/login", payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  /**
   *  { "message" : "O erro base", "code" :"e0001", "errors": [{"message" : "error", "code" : "e0001"}]}
   */
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ toggleAlert: false });
  };

  getNonFieldErrorMessage() {
    // Return errors that are served in `non_field_errors`
    let errorMessage = null;
    const { errors, toggleAlert } = this.state;

    console.log(toggleAlert);

    if (errors && errors.length > 0) {
      errorMessage = (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={toggleAlert}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MuiAlert
            open={toggleAlert}
            onClose={this.handleClose}
            elevation={6}
            severity="error"
          >
            {errors.map((error, index) => (
              <span key={index}>
                {console.log(error.message)}
                {error.message}
              </span>
            ))}
          </MuiAlert>
        </Snackbar>
      );
    }
    return errorMessage;
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Container>
        {/* Loading Screen */}
        <LoadingScreen isLoading={isLoading} />

        <Grid container spacing={2}>
          <Grid item md={12}>
            <Grid item md={12}>
              {this.getNonFieldErrorMessage()}
            </Grid>
            <Paper className="paper" elevation={3} square>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h3">Sign In</Typography>
                </Grid>
              </Grid>

              <form
                onSubmit={this.onPressLogin}
                method="post"
                autoComplete="off"
              >
                <Grid container className="mt-2">
                  <Grid item md={12}>
                    <TextField
                      className="form-input"
                      label="Username"
                      name="username"
                      maxLength={256}
                      value={this.state.username}
                      onSubmit={(event) =>
                        this.passwordInput.wrappedInstance.focus()
                      }
                      onChange={this.onUsernameChange}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={12}>
                    <TextField
                      name="password"
                      className="form-input"
                      label="Password"
                      maxLength={50}
                      onChange={this.onPasswordChange}
                      value={this.state.password}
                      type="password"
                      required
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12} className="mt-3">
                    <Button variant="contained" color="primary" type="submit">
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Login;
