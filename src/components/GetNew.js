import React, {  useEffect, useState } from "react";
import Axios from "axios";
import {Grid, Paper, Typography } from "@material-ui/core";
import LoadingScreen from "./LoadingScreen.js";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

export default (props) => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>  {
        const getNews = async () => {
            setIsLoading(true);
            const newsFromServer = await fetchNews()
            console.log(newsFromServer.data.status)
            if (newsFromServer.status === 200) {
                setIsLoading(false);
                setNews(newsFromServer.data.data)
            }
        }
        getNews()
    }, [])

    // Fetch all News
    const fetchNews = async () => {
        const res = await Axios.get('http://sitea-c-1229:8000/api/v1/supports')
        const data = await res

        return data
    }

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            {news.map((item, index) => (
                <Paper className={"paper"} key={item.id}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Link to={`/${item.id}`} className="link-show-new">
                                <Typography variant="h5">{item.name}</Typography>
                            </Link>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Começa a:</Typography>
                            <Typography>{item.starts_at}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Acaba a:</Typography>
                            <Typography>{item.ends_at}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="h5">Tags</Typography>
                            <Typography>{item.keywords}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </>
    )
}
