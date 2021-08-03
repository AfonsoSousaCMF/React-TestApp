import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GetNew from "../components/GetNew.js"


const News = () =>  {
  
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <GetNew name="12"></GetNew>
        </Grid>
      </Container>
    </div>
  )
}

export default News