import { useState } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import SuccessAlert from "../components/SuccessAlert";
import LoadingScreen from "../components/LoadingScreen.js";
import GetEntities from "../components/GetEntities.js"
import {
  BrowserRouter as Router,
  useRouteMatch,
  withRouter,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

const Dashboard = (props) => {
  return (
    <>
      <SuccessAlert />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <h1>Dashboard</h1>
          </Grid>

          <Grid item md={12}>
            <Paper className="paper-autoSize">
                <GetEntities />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
