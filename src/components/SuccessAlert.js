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
    const [toggleSuccessAlert, setToggleSuccessAlert] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setToggleSuccessAlert(false);
    };

    message = (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toggleSuccessAlert}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <MuiAlert
            open={toggleSuccessAlert}
            onClose={handleClose}
            elevation={6}
            severity="success"
            >
                You are logged In {localStorage.authUser}!
            </MuiAlert>
        </Snackbar>
    );
    return message;
}
    
export default SuccessAlert