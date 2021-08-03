import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GetNew from "../components/GetNew.js"

const News = () =>  {
  
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <GetNew></GetNew>
        </Grid>
      </Container>
    </>
  )
}

export default News