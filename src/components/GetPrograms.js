import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

function createData(id, name, created_at, updated_at) {
  return { id, name, created_at, updated_at };
}

const GetPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPrograms = async () => {
      setIsLoading(true);
      const programsFromServer = await fetchPrograms();
    //   console.log("Programs status", programsFromServer.data.status);
      if (programsFromServer.status === 200) {
        setIsLoading(false);
        setPrograms(programsFromServer.data.data);
        // console.log(programsFromServer.data.data);
      }
    };
    getPrograms();
  }, []);

  // Fetch all Programs
  const fetchPrograms = async () => {
    var token = localStorage.token

    // console.log('token', token)
    // Show spinner when call is made
    setIsLoading(true);
    // sends request to api get the Entities
    const res = await APIKit.get(
      "http://sitea-c-1229:8000/api/v1/backoffice/programs",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res;

    return data;
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={programs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default GetPrograms;
