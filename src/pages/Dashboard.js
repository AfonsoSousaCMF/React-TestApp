import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <h1>Dashboard</h1>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Dashboard
