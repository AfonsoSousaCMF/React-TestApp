import React, { useState } from "react";
import {
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

const Supports = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container className={"container-overide"}>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <Grid container>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <h1>Apoios</h1>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12} className={"fab-add"}>
              {/*Go back button*/}
              <Fab color="primary">
                <AddOutlinedIcon />
              </Fab>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12}>
              <Paper className={"paper-full-width"}>Search</Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Supports;
