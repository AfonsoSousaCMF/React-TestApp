import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Image } from "react-bootstrap";
import LoadingScreen from "../components/LoadingScreen.js";
import {
  Typography,
  Container,
  Grid,
  Button,
  Chip,
  Paper,
  Fab,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, withRouter } from "react-router-dom";

const SingleNew = (props) => {
  const [news, setNew] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    showNew();
  }, []);

  // Show New
  const showNew = () => {
    const { newId } = props.match.params;
    // console.log({newId})
    Axios.get(
      `http://sitea-c-1229:8001/api/v1/supports/${newId}?fillCollections=all`
    ).then((newFromServer) => {
      setNew(newFromServer.data.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      <Container className={"container-overide"}>
        <LoadingScreen isLoading={isLoading} />
        {!isLoading && (
          <Grid container>
            <Grid container className="mt-2">
              <Grid item xs={2} md={12}>
                <Link className="back-btn" to="/">
                  {/*Go back button*/}
                  <Fab color="primary">
                    <ArrowBackIcon />
                  </Fab>
                </Link>
              </Grid>
            </Grid>

            <Paper className={"paper-full-width my-2"}>
              <Grid container>
                <Grid item md={12} className="show-new-grid">
                  <Typography variant="h5" className="show-new-title">
                    {news.name}
                    {news.state ? (
                      news.state.id === 2 ? (
                        <Chip
                          className={"state-open mx-2"}
                          label={news.state.name}
                        />
                      ) : (
                        <Chip
                          className={"state-closed mx-2"}
                          label={news.state.name}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>

              <hr className={"show-new-hr-solid"} />

              <Grid container className="mt-2">
                <Typography variant="h5">Geral</Typography>
              </Grid>

              {/*<Grid container className="mt-4">*/}
              {/*  <Image*/}
              {/*    className="mx-auto"*/}
              {/*    src="https://via.placeholder.com/500x300"*/}
              {/*    alt="Image New"*/}
              {/*    rounded*/}
              {/*  />*/}
              {/*</Grid>*/}

              <Grid container className="mt-2">
                <Grid item xs={5} md={5} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Domínio
                  </Typography>
                  {/*checks if news.domain is empty*/}
                  {news.domain.length === 0 ? (
                    <Typography>N/D</Typography>
                  ) : (
                    <Typography variant="body1">{news.domain.name}</Typography>
                  )}
                </Grid>

                <Grid item xs={5} md={7} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Entidades
                  </Typography>
                  {/*checks if news.entities is empty*/}
                  {news.entities.length === 0 ? (
                    <Typography>N/D</Typography>
                  ) : (
                    <ul className={"show-list"}>
                      {news.entities.map((entitie) => (
                        <li key={entitie.id}>{entitie.name}</li>
                      ))}
                    </ul>
                  )}
                </Grid>
              </Grid>

              <Grid container className="mt-2">
                <Grid item xs={5} md={5} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Beneficiários
                  </Typography>
                  {/*checks if news.beneficiaries is empty*/}
                  {news.beneficiaries.length === 0 ? (
                    <Typography variant="body1">N/D</Typography>
                  ) : (
                    <ul className={"show-list"}>
                      {news.beneficiaries.map((beneficiarie) => (
                        <li>{beneficiarie.name}</li>
                      ))}
                    </ul>
                  )}
                </Grid>

                <Grid item xs={5} md={7} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Programas
                  </Typography>
                  {/*checks if news.programs is empty*/}
                  {news.programs.length === 0 ? (
                    <Typography variant="body1">N/D</Typography>
                  ) : (
                    <ul className={"show-list"}>
                      {news.programs.map((program) => (
                        <li key={program.id}>{program.name}</li>
                      ))}
                    </ul>
                  )}
                </Grid>
              </Grid>

              <Grid container className="mt-2">
                <Grid item xs={5} md={5} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Localidade
                  </Typography>
                  {/*checks if news.location is empty*/}
                  {news.location.length === 0 ? (
                    <Typography>N/D</Typography>
                  ) : (
                    <Typography variant="body1">
                      {news.location.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={2} md={2} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Máximo
                  </Typography>
                  {/*checks if news.maximum_amount is null*/}
                  <Typography variant="body1">
                    {news.maximum_amount === null
                      ? "N/D"
                      : news.maximum_amount + " €"}
                  </Typography>
                </Grid>

                <Grid item xs={2} md={5} className={"text-left"}>
                  <Typography variant="h6" className={"purple"}>
                    Mínimo
                  </Typography>
                  {/*checks if news.minimum_amount is null*/}
                  <Typography variant="body1">
                    {news.minimum_amount === null
                      ? "N/D"
                      : news.minimum_amount + " €"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={5} className={"text-left mt-2"}>
                <Grid item md={12}>
                  <Typography variant="h6" className={"purple"}>
                    Palavras-Chave
                  </Typography>
                  {news.tags.slice(0, news.tags.length).map((tag) => (
                    <Chip
                      color="primary"
                      variant="outlined"
                      className={"chip"}
                      size="small"
                      label={tag}
                      key={tag}
                    />
                  ))}
                </Grid>
              </Grid>

              <hr className={"show-new-hr-dashed mt-2"} />

              <Grid container spacing={2} className={"links-container"}>
                <Grid container>
                  <Typography variant="h5">Links Oficiais</Typography>
                </Grid>

                <Grid container>
                  <Typography variant="h6" className={"purple mt-2"}>
                    URL
                  </Typography>
                </Grid>

                <Grid container>
                  <Link to={news.url} className={"mt-1"}>
                    {news.url === null ? "-" : news.url}
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default withRouter(SingleNew);
