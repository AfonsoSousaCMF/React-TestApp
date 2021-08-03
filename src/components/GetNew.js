import React, {  useEffect, useState } from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default () => {
    const [news, setNews] = useState([])

    useEffect(() =>  {
        const getNews = async () => {
            const newsFromServer = await fetchNews()
            console.log(newsFromServer.result.status)
            if (newsFromServer.status === 200) {
                setNews(newsFromServer.result.data)
            }

        }

        getNews()
    }, [])

  const fetchNews = async () => {
    const res = await Axios.get('http://sitea-c-1229:8000/api/v1/supports')
    const result = await res
 
    console.log(result)
    return result
  }

    return (
        <div>
            {news.map((item) => (
                <Paper className={"paper"}>
                    <Typography key={item.id}>{item.name}</Typography>
                </Paper>
            ))}
        </div>
    )
}
