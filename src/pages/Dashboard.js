import { useState, useEffect } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import SuccessAlert from "../components/SuccessAlert";
import GetEntities from "../components/GetEntities.js"
import GetPrograms from "../components/GetPrograms.js"
import {
  BrowserRouter as Router,
  useRouteMatch,
  withRouter,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

const Dashboard = (props) => {
  const [toggleSuccessAlert, setToggleSuccessAlert] = useState(false);

  return (
    <>
      <SuccessAlert toggleSuccessAlert={toggleSuccessAlert} />
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

          <Grid item md={12} className="mt-2 mb-3">
            <Paper className="paper-autoSize">
                <GetPrograms />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
