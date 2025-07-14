import React, { SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "../redux/slices/alertSlice";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/store"; // adjust if your store is defined elsewhere

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertSnackBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { open, message, severity, duration, nextRoute } = useSelector(
    (state: RootState) => state.alert
  );

  const handleClose = (
    event?: Event | SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    dispatch(closeAlert());
    if (nextRoute) {
      try {
        history.push(nextRoute);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity as AlertColor}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
