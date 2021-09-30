import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  { id: "action", numeric: false, disablePadding: false, label: "AÇÃO" },
  {
    id: "support_id",
    numeric: true,
    disablePadding: false,
    label: "ID APOIO",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "APOIO",
  },
  {
    id: "updated_at",
    numeric: false,
    disablePadding: false,
    label: "DATA REGISTO",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className={"purple"}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: "rgba(234, 234, 234, 0.74)",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const SupportsHistoryTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("created_at");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.supports.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.supports.length}
            />
            <TableBody>
              {stableSort(props.supports, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="left" component="th" scope="row">
                        {row.id == null ? "N/D" : row.id}
                      </TableCell>
                      <TableCell align="left">
                        {row.name == null ? "N/D" : row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.starts_at == null
                          ? "N/D"
                          : row.starts_at.split(" 00:00:00")}
                      </TableCell>
                      <TableCell align="left">
                        {row.ends_at == null
                          ? "N/D"
                          : row.ends_at.split(" 00:00:00")}
                      </TableCell>
                      <TableCell align="left">
                        {row.minimum_amount == null
                          ? "N/D"
                          : row.minimum_amount}{" "}
                      </TableCell>
                      <TableCell align="left">
                        {row.maximum_amount == null
                          ? "N/D"
                          : row.maximum_amount}
                      </TableCell>
                      <TableCell align="left">
                        {row.state ? (
                          row.state.id === 2 ? (
                            <Chip
                              className={"state-open-small mx-2"}
                              label={row.state.name}
                            />
                          ) : (
                            <Chip
                              className={"state-closed-small mx-2"}
                              label={row.state.name}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {row.created_at == null ? "N/D" : row.created_at}
                      </TableCell>
                      <TableCell align="left">
                        <Button className={"Secondary-outlined"}>
                          <SearchIcon className={"Secondary-outlined-icon"} />
                        </Button>
                        <Button className="Info-outlined">
                          <EditOutlinedIcon className={"Info-outlined-icon"} />
                        </Button>
                        <Button className="Danger-outlined">
                          <DeleteIcon className={"Danger-outlined-icon"} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SupportsHistoryTable;
