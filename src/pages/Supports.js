import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import SearchIcon from "@material-ui/icons/Search";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

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

const Supports = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleShow = () => {
    setIsOpen(true);
  };
  const handleHide = () => {
    setIsOpen(false);
  };

  const onChange = (chipsData) => {
    /* ... */
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container className={"container-overide"}>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <Grid container>
          <Grid container spacing={2}>
            <Grid item md={12}>
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
                          <Button variant="contained" color="primary">
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
                        Descartar
                      </Button>
                      <Button color="primary" onClick={handleShow}>
                        Pesquisa avançada
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
                            helperText="Escreva aqui as tags, cada uma tem q ter um enter entre cada uma"
                          />
                          {/*<CustomChips onChange={onChange} />*/}
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <Typography variant={"h6"}>Data</Typography>
                          <Grid container>
                            <Grid item md={6}>
                              Data
                            </Grid>
                            <Grid item md={6}>
                              Intrevalo
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
                        </Grid>

                        <Grid item md={6}>
                          <Grid container>
                            <Typography variant={"h6"}>Montante</Typography>
                            <Grid item md={4}>
                              Montante
                            </Grid>
                            <Grid item md={4}>
                              Intrevalo
                            </Grid>
                            <Grid item md={4}>
                              Não definido
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
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Supports;
