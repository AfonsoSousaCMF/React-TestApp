import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import SuccessAlert from "../components/SuccessAlert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HistoryIcon from "@material-ui/icons/History";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import APIKit, { setClientToken } from "../ApiCalls/APIKit.js";
import {
  BrowserRouter as Router,
  withRouter,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import LoadingScreen from "../components/LoadingScreen";

const Dashboard = (props) => {
  const [toggleSuccessAlert, setToggleSuccessAlert] = useState(false);
  const [dashboardSupports, setDashboardSupports] = useState([]);
  const [dashboardHistory, setDashboardHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSupports();
  }, []);

  const fetchSupports = () => {
    var token = localStorage.token;

    APIKit.get(
      "http://sitea-c-1229:8001/api/v1/backoffice/supports/dashboard",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then((supportsFromServer) => {
      setDashboardSupports(supportsFromServer.data.data.supports);
      setDashboardHistory(supportsFromServer.data.data.supportHistoryList);
      setIsLoading(false);
    });
  };

  return (
    <>
      {/*<SuccessAlert toggleSuccessAlert={toggleSuccessAlert} />*/}
      <Container className={"container-overide"}>
        <LoadingScreen isLoading={isLoading} />

        {!isLoading && (
          <Grid container>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <h1>Dashboard</h1>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Paper className="paper-full-width text-left">
                  <div className="square-div">
                    <CalendarTodayIcon className="CalendarIcon-size" />
                  </div>

                  <div className={"flex-column"}>
                    <Typography variant="h6" className={"show-new-title"}>
                      Término
                    </Typography>
                    <Typography variant="body1">
                      Mais próximo em:{" "}
                      {dashboardSupports.length === 0
                        ? "-"
                        : dashboardSupports[0].ends_at.split(" 00:00:00")}{" "}
                    </Typography>
                  </div>

                  <hr className={"show-new-hr-dashed"} />

                  <Grid container spacing={0}>
                    <Grid item md={12} className={"text-left"}>
                      <Timeline position="alternate">
                        {console.log("supports", dashboardSupports)}
                        {dashboardSupports.length === 0
                          ? "no Results"
                          : dashboardSupports.map((item) => (
                              <TimelineItem>
                                <TimelineOppositeContent
                                  sx={{ m: "auto 0", flex: 0 }}
                                  color="text.secondary"
                                  className={"flex-0"}
                                >
                                  <Typography variant="body2" component="p">
                                    <strong>
                                      {item.ends_at === null
                                        ? "00:00"
                                        : item.ends_at.split(" 00:00:00")}
                                    </strong>
                                  </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineDot
                                    className={"green-dot"}
                                    variant="outlined"
                                  />
                                  <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                  sx={{ py: "12px", px: 2, pt: 0 }}
                                >
                                  <Typography variant="body2" component="p">
                                    <strong className={"mr-1"}>
                                      Aviso({item.id}):
                                    </strong>{" "}
                                    {item.name}
                                  </Typography>{" "}
                                  <Typography variant="body2" component="p">
                                    <strong className={"mr-1"}>
                                      Entidade:
                                    </strong>{" "}
                                    {item.entities.map(
                                      (entitie) => entitie.name
                                    )}
                                  </Typography>{" "}
                                  <Typography variant="body2" component="p">
                                    <strong className={"mr-1"}>
                                      Programa:
                                    </strong>{" "}
                                    {item.programs.map(
                                      (program) => program.name
                                    )}
                                  </Typography>
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                      </Timeline>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item md={6}>
                <Paper className="paper-full-width">
                  <div className="square-div">
                    <HistoryIcon className="historyIcon-size" />
                  </div>

                  <div className={"flex-column"}>
                    <Typography variant="h6" className={"show-new-title"}>
                      Histórico alterações
                    </Typography>
                    <Typography variant="body1">
                      Última alteração:{" "}
                      {dashboardHistory.length === 0
                        ? "-"
                        : dashboardHistory[0].ends_at.split(" 00:00:00")}{" "}
                    </Typography>
                  </div>

                  <hr className={"show-new-hr-dashed"} />

                  <Grid container spacing={5}>
                    <Grid item md={12}>
                      <Timeline position="alternate">
                        {dashboardHistory.length === 0
                          ? "no Results"
                          : dashboardHistory.map((item) => (
                              <TimelineItem>
                                <TimelineOppositeContent
                                  sx={{ m: "auto 0" }}
                                  variant="body2"
                                  color="text.secondary"
                                  className={"flex-0"}
                                >
                                  <Typography variant="body2" component="p">
                                    <strong>
                                      {item.ends_at === null
                                        ? "00:00"
                                        : item.ends_at.split(" 00:00:00")}
                                    </strong>
                                  </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineConnector />
                                  <TimelineDot>
                                    {() => {
                                      switch (item.img) {
                                        case "fas fa-trash text-danger":
                                          return <DeleteOutlineIcon />;
                                        case "fas fa-plus-square text-success":
                                          return <DeleteOutlineIcon />;
                                        case "fas fa-edit text-info":
                                          return <EditOutlinedIcon />;
                                        default:
                                          return "";
                                      }
                                    }}
                                  </TimelineDot>
                                  <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: "12px", px: 2 }}>
                                  <Typography variant="h6" component="span">
                                    Code
                                  </Typography>
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                      </Timeline>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default withRouter(Dashboard);
