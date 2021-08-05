import React, {  useEffect, useState } from "react";
import Axios from "axios";
import {Grid, Container, Typography } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect,
  } from "react-router-dom";

const SingleNew = (props) => {
    const [news, setNew] = useState([])

    useEffect(() =>  {
        const getNew = async () => {
            const newsFromServer = await showNew()
            console.log(newsFromServer.data.status)
            if (newsFromServer.status === 200) {
                setNew(newsFromServer.data.data)
                console.log(newsFromServer.data.data);
            } else {
                <Redirect to='/' exact />
            }
        }
        getNew()
        
    }, [])

    // Show New
    const showNew = async () => {
        const {newId} = props.match.params
        console.log(newId)
        const res = await Axios.get(`http://sitea-c-1229:8000/api/v1/supports/${newId}`)
        const data = await res
        
        return data
    }

    return (
        <div>
            {this.state.news.map((item, index) => (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Typography variant="h2">{item.name}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Começa a:</Typography>
                            <Typography>{item.starts_at}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Acaba a:</Typography>
                            <Typography>{item.starts_at}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Tags</Typography>
                            <Typography>{item.keywords}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            ))}
        </div>
    )
}

export default SingleNew
