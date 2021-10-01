import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SupportsHistoryTable from "../../components/Supports/SupportsHistoryTable";
import APIKit from "../../ApiCalls/APIKit";
import LoadingScreen from "../../components/Misc/LoadingScreen";
import { Container, Grid, Typography } from "@material-ui/core";
import { Pagination } from "react-laravel-paginex";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "calc(100%)",
    maxWidth: 300,
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const SupportsHistory = (props) => {
  const classes = useStyles();
  const [supportsHistory, setSupportsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchSupportsHistory(1);
  }, []);

  const fetchSupportsHistory = (
    page,
    order = "id+asc",
    token = localStorage.token,
    data = null
  ) => {
    APIKit.get(
      "http://sitea-c-1229:8001/api/v1/backoffice/supports/history?order=" +
        order +
        "&fillCollections=all&page=" +
        page,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then((supportsFromServer) => {
      if (supportsFromServer.status === 401) {
        localStorage.clear();
        props.history.push("/sign-in");
        window.location.reload();
      } else {
        setPages(supportsFromServer.data);
        setSupportsHistory(supportsFromServer.data.data);
        setIsLoading(false);
      }
    });
  };

  const fetchSupportsHistoryPaginate = (data) => {
    fetchSupportsHistory(data.page, data.order, data.token, data);
  };

  return (
    <Container className={"container-overide"}>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <Grid container>
          <Grid container spacing={2}>
            <Grid item md={12} className={"mt-3"}>
              <h2>Histórico Apoios</h2>
            </Grid>
          </Grid>

          <Grid container>
            <Grid container className={"mt-5"}>
              <Grid item md={6}>
                <div className={"mr-3"}>
                  <Typography variant={"body1"} className={"align-middle"}>
                    <strong>
                      De {pages.from == null ? "0" : pages.from} até{" "}
                      {pages.to == null ? "0" : pages.to} de um total de{" "}
                      {pages.total == null ? "0" : pages.total} registos
                    </strong>
                  </Typography>
                </div>
              </Grid>
              <Grid item md={6}>
                <div
                  className="grid-pagination bounceInUp align-right"
                  id="ScrollUp"
                >
                  <Pagination
                    changePage={fetchSupportsHistoryPaginate}
                    data={pages}
                    numberClass={"page-link"}
                    buttonIcons={true}
                    nextButtonIcon={"chevron-right"}
                    prevButtonIcon={"chevron-left"}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={12}>
                <SupportsHistoryTable supportsHistory={supportsHistory} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SupportsHistory;
