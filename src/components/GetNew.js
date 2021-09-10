import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Paper, Typography } from "@material-ui/core";
import LoadingScreen from "./LoadingScreen.js";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { Pagination } from "react-laravel-paginex";

export default (props) => {
  const [news, setNews] = useState([]);
  const [pages, setPages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchNews(1);
  }, []);

  // Fetch all News
  const fetchNews = (page, data = null) => {
    Axios.get("http://sitea-c-1229:8001/api/v1/supports?page=" + page).then(
      (newsFromServer) => {
        setPages(newsFromServer.data);
        setNews(newsFromServer.data.data);
        setIsLoading(false);
      }
    );
  };

  const fetchNewsPaginate = (data) => {
    fetchNews(data.page, data);
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

      {news.map((item, index) => (
        <Paper className={"paper"} key={item.id}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Link to={`/${item.id}`} className="link-show-new">
                <Typography variant="h5">{item.name}</Typography>
              </Link>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h5">Começa a:</Typography>
              <Typography>{item.starts_at}</Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h5">Acaba a:</Typography>
              <Typography>{item.ends_at}</Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h5">Tags</Typography>
              <Typography>{item.keywords}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Grid container spacing={2} className="grid-pagination">
        <Pagination
          changePage={fetchNewsPaginate}
          data={pages}
          numberClass={"page-link"}
        />
      </Grid>
    </>
  );
};
