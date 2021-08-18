import { Container, Grid } from "@material-ui/core";
import GetNew from "../components/GetNew.js"

const News = (props) =>  {

  return (
    <>
      <Container>
        <Grid container spacing={2} className="mt-2">
          <GetNew newId={props.newId} />
        </Grid>
      </Container>
    </>
  )
}

export default News