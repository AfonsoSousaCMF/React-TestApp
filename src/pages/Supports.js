import React, { useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Drawer,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputBase,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import CustomChips from "react-custom-chips";
import SupportsTable from "../components/SupportsTable.js";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "../components/LoadingScreen";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import SearchIcon from "@material-ui/icons/Search";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { Nav, Tab, Tabs } from "react-bootstrap";
import APIKit from "../ApiCalls/APIKit";
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

const Supports = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [supports, setSupports] = useState([]);
  const [pages, setPages] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleShow = () => {
    setIsOpen(true);
  };
  const handleHide = () => {
    setIsOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSupports(1);
  }, []);

  const fetchSupports = (
    page,
    order = "created_at+desc",
    token = localStorage.token,
    data = null
  ) => {
    APIKit.get(
      "http://sitea-c-1229:8001/api/v1/backoffice/supports?order=" +
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
        setSupports(supportsFromServer.data.data);
        console.log("here", supportsFromServer);
        setIsLoading(false);
      }
    });
  };

  const fetchSupportsPaginate = (data) => {
    fetchSupports(data.page, data.order, data.token, data);
  };

  return (
    <Container className={"container-overide"}>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <Grid container>
          <Grid container spacing={2}>
            <Grid item md={12} className={"mt-3"}>
              <h2>Apoios</h2>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12} className={"fab-add"}>
              {/*Go back button*/}
              <Fab color="primary">
                <AddOutlinedIcon />
              </Fab>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12}>
              <Paper className={"paper-full-width"}>
                <form>
                  <Grid container>
                    <Grid item md={12}>
                      <Grid container>
                        <Grid item md={11}>
                          <div className={"search"}>
                            <div className={classes.searchIcon}>
                              <SearchIcon />
                            </div>
                            <InputBase
                              placeholder="Pesquisa…"
                              classes={{
                                root: classes.inputRoot,
                              }}
                              className={"input-search"}
                              inputProps={{ "aria-label": "search" }}
                            />
                          </div>
                        </Grid>

                        <Grid item md={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            type={"submit"}
                          >
                            Pesquisar
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item md={12} className={"mt-1"}>
                      <Button
                        color="primary"
                        className={"mr-2"}
                        onClick={handleHide}
                      >
                        <strong>Descartar</strong>
                      </Button>
                      <Button color="primary" onClick={handleShow}>
                        <strong>Pesquisa avançada</strong>
                      </Button>
                    </Grid>
                  </Grid>

                  {isOpen && (
                    <div>
                      <hr className={"show-new-hr-dashed"} />

                      <Grid container spacing={3}>
                        <Grid item md={3} sm={4}>
                          <FormControl
                            classes={{
                              root: classes.formControl,
                            }}
                            className={"form-controller mr-3"}
                          >
                            <InputLabel className={"input-label"}>
                              Estado
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>

                        <Grid item md={3} sm={4}>
                          <FormControl
                            classes={{
                              root: classes.formControl,
                            }}
                            className={"form-controller"}
                          >
                            <InputLabel className={"input-label"}>
                              Programas
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>

                        <Grid item md={3} sm={4}>
                          <FormControl
                            classes={{
                              root: classes.formControl,
                            }}
                            className={"form-controller"}
                          >
                            <InputLabel className={"input-label"}>
                              Entidades
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>

                        <Grid item md={3} sm={4}>
                          <FormControl
                            classes={{
                              root: classes.formControl,
                            }}
                            className={"form-controller"}
                          >
                            <InputLabel className={"input-label"}>
                              Domínios
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid item md={6}>
                          <FormControl
                            className={"form-controller"}
                            classes={{
                              root: classes.formControl,
                            }}
                          >
                            <InputLabel className={"input-label"}>
                              Taxa de Financiamento
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>
                        <Grid item md={6}>
                          <FormControl
                            classes={{
                              root: classes.formControl,
                            }}
                            className={"form-controller"}
                          >
                            <InputLabel className={"input-label"}>
                              Beneficiários
                            </InputLabel>
                            <NativeSelect
                              variant="filled"
                              color={"primary"}
                              className={"select-input"}
                            >
                              <option aria-label="None" value="" />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item md={12}>
                          <TextField
                            classes={{
                              root: classes.formControl,
                            }}
                            variant="filled"
                            id="standard-helperText"
                            label="Tags"
                            helperText="Escreva aqui as tags, cada uma tem que ter um enter entre cada uma"
                          />
                          {/*<CustomChips onChange={onChange} />*/}
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item md={6}>
                          <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="first"
                          >
                            <Typography variant={"h6"} className={"mb-2"}>
                              Data
                            </Typography>
                            <Grid container>
                              <Grid container>
                                <Grid item md={12}>
                                  <Nav variant="pills" className="flex-row">
                                    <Grid container>
                                      <Grid item md={6}>
                                        <Nav.Item>
                                          <Nav.Link
                                            eventKey="first"
                                            className={"text-center"}
                                          >
                                            Data
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Grid>
                                      <Grid item md={6}>
                                        <Nav.Item>
                                          <Nav.Link
                                            eventKey="second"
                                            className={"text-center"}
                                          >
                                            Intervalo
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Grid>
                                    </Grid>
                                  </Nav>
                                </Grid>
                              </Grid>

                              <Grid container>
                                <Grid item md={12}>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      disableToolbar
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      margin="normal"
                                      id="date-picker-inline"
                                      label="De"
                                      value={selectedDate}
                                      onChange={handleDateChange}
                                      classes={{
                                        root: classes.formControl,
                                      }}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </Grid>
                              </Grid>

                              <Grid container>
                                <Grid item md={12}>
                                  <Tab.Content>
                                    <Tab.Pane eventKey="first"></Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                      <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                      >
                                        <KeyboardDatePicker
                                          disableToolbar
                                          variant="inline"
                                          format="dd/MM/yyyy"
                                          margin="normal"
                                          id="date-picker-inline"
                                          label="Até"
                                          value={selectedDate}
                                          onChange={handleDateChange}
                                          classes={{
                                            root: classes.formControl,
                                          }}
                                          KeyboardButtonProps={{
                                            "aria-label": "change date",
                                          }}
                                        />
                                      </MuiPickersUtilsProvider>
                                    </Tab.Pane>
                                  </Tab.Content>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Tab.Container>
                        </Grid>

                        <Grid item md={6}>
                          <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="first"
                          >
                            <Typography variant={"h6"} className={"mb-2"}>
                              Montante
                            </Typography>
                            <Grid container>
                              <Grid item md={12}>
                                <Nav variant="pills" className="flex-row">
                                  <Grid container>
                                    <Grid item md={4}>
                                      <Nav.Item>
                                        <Nav.Link
                                          eventKey="first"
                                          className={"text-center"}
                                        >
                                          Montante
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Grid>
                                    <Grid item md={4}>
                                      <Nav.Item>
                                        <Nav.Link
                                          eventKey="second"
                                          className={"text-center"}
                                        >
                                          Intervalo
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Grid>
                                    <Grid item md={4}>
                                      <Nav.Item>
                                        <Nav.Link
                                          eventKey="third"
                                          className={"text-center"}
                                        >
                                          Não definido
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Grid>
                                  </Grid>
                                </Nav>
                              </Grid>
                            </Grid>

                            <Grid container>
                              <Grid item md={12}>
                                <Tab.Content>
                                  <Tab.Pane eventKey="first">
                                    <TextField
                                      classes={{
                                        root: classes.formControl,
                                      }}
                                      className={"mt-4"}
                                      defaultValue={0}
                                      type={"number"}
                                      minRows={0}
                                      maxRows={10000000000000000000}
                                      id="standard-helperText"
                                      label="Montante"
                                    />
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="second">
                                    <TextField
                                      classes={{
                                        root: classes.formControl,
                                      }}
                                      className={"mt-4"}
                                      defaultValue={0}
                                      type={"number"}
                                      minRows={0}
                                      maxRows={10000000000000000000}
                                      id="standard-helperText"
                                      label="Mínimo"
                                    />

                                    <TextField
                                      classes={{
                                        root: classes.formControl,
                                      }}
                                      className={"mt-2"}
                                      defaultValue={1000}
                                      type={"number"}
                                      minRows={0}
                                      maxRows={10000000000000000000}
                                      id="standard-helperText"
                                      label="Máximo"
                                    />
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="third"></Tab.Pane>
                                </Tab.Content>
                              </Grid>
                            </Grid>
                          </Tab.Container>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </form>
              </Paper>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={12}>
              <Grid container>
                <Grid item md={12}>
                  <Grid
                    container
                    spacing={2}
                    className="grid-pagination bounceInUp align-right"
                    id="ScrollUp"
                  >
                    <div className={"mr-3"}>
                      <Typography variant={"body1"} className={"align-middle"}>
                        <strong>
                          De {pages.from == null ? "" : pages.from} até{" "}
                          {pages.to == null ? "" : pages.to} de um total de{" "}
                          {pages.total == null ? "" : pages.total} registos
                        </strong>
                      </Typography>
                    </div>
                    <Pagination
                      changePage={fetchSupportsPaginate}
                      data={pages}
                      numberClass={"page-link"}
                      buttonIcons={true}
                      nextButtonIcon={"chevron-right"}
                      prevButtonIcon={"chevron-left"}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={12}>
                  <SupportsTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Supports;
