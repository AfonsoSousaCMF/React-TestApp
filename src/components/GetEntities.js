import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "react-laravel-paginex";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import APIKit, { setClientToken } from "../ApiCalls/APIKit.js";
import LoadingScreen from "./LoadingScreen.js";
import {
  BrowserRouter as Router,
  useRouteMatch,
  withRouter,
  Link,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "id", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", align: "center", minWidth: 200 },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "updated_at",
    label: "Updated At",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const GetEntities = () => {
  const classes = useStyles();
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchEntities(1);
  }, []);

  // Fetch all Entities
  const fetchEntities = (page, data = null) => {
    var token = localStorage.token
    // sends request to api get the Entities
    APIKit.get("http://sitea-c-1229:8001/api/v1/backoffice/entities?page=" + page,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then(
      (entitiesFromServer) => {
        setPages(entitiesFromServer.data);
        setEntities(entitiesFromServer.data.data);
        setIsLoading(false);
      }
    );
  };

  const fetchEntitiesPaginate = (data) => {
    fetchEntities(data.page, data);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <Typography variant="h4" className="mb-2">
        Entities
      </Typography>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities
              .map((entitie, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={entitie.id}>
                    {columns.map((column) => {
                      const value = entitie[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        changePage={fetchEntitiesPaginate}
        data={pages}
        numberClass={"page-link"}
        buttonIcons={true}
        nextButtonIcon={"chevron-right"}
        prevButtonIcon={"chevron-left"}
      />
    </>
  );
};

export default GetEntities;
