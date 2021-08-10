import React, { useEffect, useState, Component } from "react";
import SignIn from "../components/SignIn.js";
import {
  Typography,
  TextField,
  Container,
  Backdrop,
  CircularProgress,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { Alert } from "react-bootstrap";
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
  errors: {},
  isAuthorized: true,
  isLoading: false,
};

class Login extends Component {
  state = initialState;

//   componentDidMount() {
//     localStorage.getItem("token")
//   }
  componentWillUnmount() {}

  onUsernameChange = (event) => {
    // console.log(event.target.value);
    this.setState({ username : event.target.value });
  };

  onPasswordChange = (event) => {
    // console.log(event.target.value );
    this.setState({ password : event.target.value  });
  };

  onPressLogin = (event) => {
    event.preventDefault();
    console.log(event);
    const { username, password } = this.state;
    const payload = { username, password };

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      console.log('User:', data.data)
      setClientToken(data.data.token);
      this.setState({ isLoading: false, isAuthorized: true });
    };

    const onFailure = (error) => {
      console.log('erro', error.response.data.error.errors);
      this.setState({ errors: error.response.data.error.errors, isLoading: false });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post("http://sitea-c-1229:8000/api/v1/login", payload).then(onSuccess).catch(onFailure);
  }

  getNonFieldErrorMessage() {
    // Return errors that are served in `non_field_errors`
    let errorMessage = null;
    const { errors } = this.state;
    if (errors) {
      errorMessage = (
        <Alert variant="danger" dismissible>
            <Typography variant="p">
                {console.log(errors)}
                {errors.message}
            </Typography>
        </Alert>
      );
    }
    return errorMessage;
  }

  getErrorMessageByField(field) {
    // Checks for error message in specified field
    // Shows error message from backend
    let message = null;
    if (this.state.errors[field]) {
      message = (
        <Alert variant="danger" dismissible>
          {this.state.errors[field].map((item) => (
            <Typography variant="p" key={item}>
              {item}
            </Typography>
          ))}
        </Alert>
      );
    }
    return message;
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Container>
        <Backdrop open={isLoading} styles={{ zIndex: 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={2}>
          {this.getNonFieldErrorMessage()}

          <Grid item md={12}>
            <Paper className="paper" elevation={3} square>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h3">Sign In</Typography>
                </Grid>
              </Grid>

              <form onSubmit={this.onPressLogin} method="post" autoComplete="off">
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

                    {this.getErrorMessageByField("username")}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={12}>
                    <TextField
                      ref={(node) => {
                        this.passwordInput = node;
                      }}
                      name="password"
                      className="form-input"
                      label="Password"
                      maxLength={50}
                      onChange={this.onPasswordChange}
                      value={this.state.password}
                      type="password"
                      required
                    />

                    {this.getErrorMessageByField("password")}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12} className="mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
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
