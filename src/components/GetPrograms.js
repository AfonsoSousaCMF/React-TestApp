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
    label: "created_at",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "updated_at",
    label: "updated_at",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const GetPrograms = () => {
  const classes = useStyles();
  const [pages, setPages] = useState({});
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPrograms(1);
  }, []);

  // Fetch all Programs
  const fetchPrograms = (page, data = null) => {
    var token = localStorage.token

    // sends request to api get the Programs
    APIKit.get("http://sitea-c-1229:8001/api/v1/backoffice/programs?page=" + page,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then(
      (programsFromServer) => {
        setPages(programsFromServer.data);
        setPrograms(programsFromServer.data.data);
        setIsLoading(false);
      }
    );
  };

  const fetchProgramsPaginate = (data) => {
    fetchPrograms(data.page, data);
  };
  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <Typography variant="h4" className="mb-2">
        Programs
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
            {programs
              .map((program) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={program.id}>
                    {columns.map((column) => {
                      const value = program[column.id];
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
        changePage={fetchProgramsPaginate}
        data={pages}
        numberClass={"page-link"}
      />
    </>
  );
};

export default GetPrograms;
