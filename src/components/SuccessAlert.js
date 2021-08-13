import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
    Typography,
    TextField,
    Button,
    Snackbar,
  } from "@material-ui/core";

const SuccessAlert = (props) => {
    // Return a success message if the login was succesfull
    let message = null;
    const [toggleAlert, setToggleAlert] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setToggleAlert(false);
    };

    message = (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toggleAlert}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <MuiAlert
            open={toggleAlert}
            onClose={handleClose}
            elevation={6}
            severity="success"
            >
                You are logged In {localStorage.getItem('authUser')}!
            </MuiAlert>
        </Snackbar>
    );
    return message;
}
    
export default SuccessAlert