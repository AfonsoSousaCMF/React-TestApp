import React, {  useEffect, useState } from "react";
import Axios from "axios";
import { Image } from 'react-bootstrap';
import LoadingScreen from "../components/LoadingScreen.js";
import { Typography, Container, Grid, Button } from "@material-ui/core";
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
    const [news, setNew] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>  {
        const getNew = async () => {
            setIsLoading(true);
            const newsFromServer = await showNew()
            console.log(newsFromServer.data.status)
            
            if (newsFromServer.status === 200) {
                console.log(newsFromServer.data.data)
                setNew(newsFromServer.data.data)
                setIsLoading(false);
            } else {
                <Redirect to='/' exact />
                setIsLoading(false);
            }
        }
        getNew()
        
    }, [])

    // Show New
    const showNew = async () => {
        const {newId} = props.match.params
        console.log({newId})
        const res = await Axios.get(`http://sitea-c-1229:8000/api/v1/supports/${newId}`)
        const data = await res
        
        return data
    }

    return (
        <>
            <Container>
                <LoadingScreen isLoading={isLoading} />

                <Grid container>
                    <Grid md={12} className="show-new-title">
                        <Typography variant="h3">{news.name}</Typography>
                    </Grid>
                </Grid>

                <Grid container className="mt-4">
                    <Image className="mx-auto" src="https://via.placeholder.com/1200x500" alt="Image New" rounded/>
                </Grid>

                <Grid container className="mt-2">
                    <Grid xs={5} md={3}>
                        <Typography variant="h5">Começa a:</Typography>
                        <Typography>{news.starts_at}</Typography>
                    </Grid>

                    <Grid xs={2} md={4}>
                        <Typography variant="h5">Acaba a:</Typography>
                        <Typography>{news.ends_at}</Typography>
                    </Grid>

                    <Grid xs={2} md={4}>
                        <Typography variant="h5" className="mx-auto">Tags</Typography>
                        <Typography>{news.keywords}</Typography>
                    </Grid>
                </Grid>

                <Grid container className="mt-4">
                    <Grid xs={2} md={12}>
                        <Link className="back-btn" to="/" exact>
                            <Button color="primary" variant="contained" >Go Back</Button>
                        </Link>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}

export default SingleNew
