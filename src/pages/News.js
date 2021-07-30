import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

// var formData = new FormData();
// formData.append("username", "user");
// formData.append("password", "password");

// fetch('http://localhost:8000/api/v1/login', {method: 'POST'})
// .then((result) => {
//     console.log(result);
// }).catch(error => {
//     console.log(error)
// });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const getCollections = () => {
    fetch("http://sitea-c-1229:8000/api/v1/supports", {
        method: "GET",
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
};

const News = () => {
    const classes = useStyles();

  return (
    <div>
        <Container>
            <Grid container spacing={2}>
                <Paper className={"paper"}>
                    <p ></p>
                </Paper>
            </Grid>
        </Container>
    </div>
  );
};

export default News;
