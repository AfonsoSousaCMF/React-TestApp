import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Paper, Typography, Divider, Chip } from "@material-ui/core";
import LoadingScreen from "./LoadingScreen.js";
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

      <Grid container spacing={2} className="grid-pagination" id="ScrollUp">
        <Pagination
          changePage={fetchNewsPaginate}
          data={pages}
          numberClass={"page-link"}
        />
      </Grid>

      {news.map((suport) => (
        <Paper className={"paper"} key={suport.id}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Link
                to={`/${suport.id}`}
                params={suport}
                className="link-show-new"
              >
                <Typography variant="h5">{suport.name}</Typography>
              </Link>
            </Grid>
            <Divider />

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Entidades
                </Typography>
                {/*checks if suport.entities is empty*/}
                {suport.entities.length === 0 ? (
                  <Typography>N/D</Typography>
                ) : (
                  suport.entities.map((entitie) => (
                    <Typography key={entitie.id}>{entitie.name}</Typography>
                  ))
                )}
              </Grid>

              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Programa
                </Typography>
                {/*checks if suport.programs is empty*/}
                {suport.programs.length === 0 ? (
                  <Typography>N/D</Typography>
                ) : (
                  suport.programs.map((program) => (
                    <Typography key={program.id}>{program.name}</Typography>
                  ))
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Tipo de Financiamento
                </Typography>
                {/*checks if suport.fee is null*/}
                <Typography>
                  {suport.fee === null ? "N/D" : suport.fee.name}
                </Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Sectores
                </Typography>
                {/*checks if suport.sectors is empty*/}
                {suport.sectors.length === 0 ? (
                  <Typography>N/D</Typography>
                ) : (
                  suport.sectors.map((sector) => (
                    <Typography key={sector.id}>{sector.name}</Typography>
                  ))
                )}
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Categorias
                </Typography>
                {/*checks if suport.categories is empty*/}
                {suport.categories.length === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  suport.categories.map((categorie) => (
                    <Typography key={categorie.id}>{categorie.name}</Typography>
                  ))
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={"mt-2"}>
              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Estado
                </Typography>
                <Typography>{suport.state.name}</Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Data Abertura:
                </Typography>
                <Typography>
                  {suport.starts_at === null ? "N/D" : suport.starts_at}
                </Typography>
              </Grid>

              <Grid item md={4}>
                <Typography variant="h6" className={"purple"}>
                  Data Fecho:
                </Typography>
                <Typography>
                  {suport.ends_at === null ? "N/D" : suport.ends_at}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} className={"mt-2"}>
              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Máximo
                </Typography>
                {/*checks if suport.maximum_amount is null*/}
                <Typography>
                  {suport.maximum_amount === null
                    ? "N/D"
                    : suport.maximum_amount + " €"}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography variant="h6" className={"purple"}>
                  Mínimo
                </Typography>
                {/*checks if suport.minimum_amount is null*/}
                <Typography>
                  {suport.minimum_amount === null
                    ? "N/D"
                    : suport.minimum_amount + " €"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={"purple"}>
                Tags
              </Typography>
              {suport.tags.slice(0, suport.tags.length).map((tag) => (
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
