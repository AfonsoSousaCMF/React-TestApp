import React, {  useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default (props) => {
    const [news, setNews] = useState([])

    useEffect(() =>  {
        const getNews = async () => {
            const newsFromServer = await fetchNews()
            console.log(newsFromServer.data.status)
            if (newsFromServer.status === 200) {
                setNews(newsFromServer.data.data)
            }
        }
        getNews()
    }, [])

  const fetchNews = async () => {
    const res = await Axios.get('http://sitea-c-1229:8000/api/v1/supports')
    const data = await res
 
    console.log(data)
    return data
  }

    return (
        <>
            {news.map((item, index) => (
                <Paper className={"paper"} key={item.id}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Typography variant="h5">{item.name}</Typography>
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
                </Paper>
            ))}
        </>
    )
}
