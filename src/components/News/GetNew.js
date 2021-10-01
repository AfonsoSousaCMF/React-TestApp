import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Paper, Typography, Divider, Chip } from "@material-ui/core";
import LoadingScreen from "../Misc/LoadingScreen.js";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { Pagination } from "react-laravel-paginex";

const GetNew = (props) => {
  const [news, setNews] = useState([]);
  const [pages, setPages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchNews(1);
  }, []);

  // Fetch all News
  const fetchNews = (
    page,
    collections = "all",
    filters = "state_id+eq+2",
    data = null
  ) => {
    Axios.get(
      "http://sitea-c-1229:8001/api/v1/supports?fillCollections=" +
        collections +
        "&filters=" +
        filters +
        "&page=" +
        page
    ).then((newsFromServer) => {
      setPages(newsFromServer.data);
      setNews(newsFromServer.data.data);
      // console.log('supports', newsFromServer);
      setIsLoading(false);
    });
  };

  const fetchNewsPaginate = (data) => {
    fetchNews(data.page, data.collections, data.filters, data);
  };
  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <Grid
        container
        spacing={2}
        className="grid-pagination mt-3 bounceInUp"
        id="ScrollUp"
      >
        <Pagination
          changePage={fetchNewsPaginate}
          data={pages}
          numberClass={"page-link"}
        />
      </Grid>

      {news.map((support) => (
        <Paper className={"paper"} key={support.id}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Link
                to={`/${support.id}`}
                params={support}
                className="link-show-new"
              >
                <Typography variant="h5">{support.name}</Typography>
              </Link>
            </Grid>
            <Divider />

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Entidades
                </Typography>
                {/*checks if support.entities is empty*/}
                {support.entities.length === 0 ? (
                  <Typography variant="body1">N/D</Typography>
                ) : (
                  support.entities.map((entitie) => (
                    <Typography key={entitie.id} variant="body1">
                      {entitie.name}
                    </Typography>
                  ))
                )}
              </Grid>

              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Programa
                </Typography>
                {/*checks if support.programs is empty*/}
                {support.programs.length === 0 ? (
                  <Typography variant="body1">N/D</Typography>
                ) : (
                  support.programs.map((program) => (
                    <Typography key={program.id} variant="body1">
                      {program.name}
                    </Typography>
                  ))
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Tipo de Financiamento
                </Typography>
                {/*checks if support.fee is null*/}
                <Typography variant="body1">
                  {support.fee === null ? "N/D" : support.fee.name}
                </Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Sectores
                </Typography>
                {/*checks if support.sectors is empty*/}
                {support.sectors.length === 0 ? (
                  <Typography variant="body1">N/D</Typography>
                ) : (
                  support.sectors.map((sector) => (
                    <Typography key={sector.id} variant="body1">
                      {sector.name}
                    </Typography>
                  ))
                )}
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Categorias
                </Typography>
                {/*checks if support.categories is empty*/}
                {support.categories.length === 0 ? (
                  <Typography variant="body1">-</Typography>
                ) : (
                  support.categories.map((categorie) => (
                    <Typography key={categorie.id} variant="body1">
                      {categorie.name}
                    </Typography>
                  ))
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Estado
                </Typography>
                <Typography variant="body1">{support.state.name}</Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Data Abertura:
                </Typography>
                <Typography variant="body1">
                  {support.starts_at === null ? "N/D" : support.starts_at}
                </Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Data Fecho:
                </Typography>
                <Typography variant="body1">
                  {support.ends_at === null ? "N/D" : support.ends_at}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} className={"mt-2"}>
              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Máximo
                </Typography>
                {/*checks if support.maximum_amount is null*/}
                <Typography variant="body1">
                  {support.maximum_amount === null
                    ? "N/D"
                    : support.maximum_amount + " €"}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Mínimo
                </Typography>
                {/*checks if support.minimum_amount is null*/}
                <Typography variant="body1">
                  {support.minimum_amount === null
                    ? "N/D"
                    : support.minimum_amount + " €"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={"purple"}>
                Tags
              </Typography>
              {support.tags.slice(0, support.tags.length).map((tag) => (
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
        </Paper>
      ))}

      <Grid container spacing={2} className="grid-pagination">
        <Pagination
          changePage={fetchNewsPaginate}
          data={pages}
          numberClass={"page-link"}
          buttonIcons={true}
          nextButtonIcon={"chevron-right"}
          prevButtonIcon={"chevron-left"}
        />
      </Grid>
    </>
  );
};

export default GetNew;
