import React from "react";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Paper className="paper-404">
        <Typography component="h2" variant="h3">
          Error 404: Page Not Found
        </Typography>

        <Link to={"/"}>
          <Button variant="contained" color="primary" className={"mt-3"}>
            Back to Home Page
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default NotFound;
