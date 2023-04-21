import React, { useState, useEffect } from "react";
import callApi from "../api/apiService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 100,
    margin: "auto",
    display: "block",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  txtInput: {
    width: "98%",
    margin: "1%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  AlertError: {
    padding: "2px",
    marginBottom: 2,
    color: "#ec3237",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(true);
  const [msgError, setMsgError] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("login")) {
      setSuccess(true);
    }
  }, []);

  //form data
  const ConfigData = Object.freeze({
    UserName: "",
    Password: "",
  });

  //valid attributes
  const ConfigDataValid = Object.freeze({
    UserNameValid: null,
    PasswordValid: null,
  });
  const [infoData, updateInfoData] = useState(ConfigData);
  const [infoDataValid, updateInfoDataValid] = useState(ConfigDataValid);

  const handleChange = (e) => {
    checkDataValid(e);
  };

  const checkDataValid = (e) => {
    if (e.target.value.trim() === "") {
      updateInfoDataValid({
        ...infoDataValid,
        [e.target.name + "Valid"]: true,
      });
    } else {
      updateInfoDataValid({
        ...infoDataValid,
        [e.target.name + "Valid"]: false,
      });
      updateInfoData({
        ...infoData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const btnRegister = (e) => {
    e.preventDefault();
    if (!infoDataValid.UserNameValid && !infoDataValid.PasswordValid) {
      let data = {
        UserName: infoData.UserName,
        Password: infoData.Password,
      };

      callApi(`user/register`, "POST", data).then((item) => {
        console.log(item);
        if (item.data === "success") {
          setSuccess(true);
        } else if (item.data === "failed") {
          setError(false);
          setMsgError("This user already exists");
        } else {
          setError(false);
          setMsgError("Error login");
        }
      });
    } else {
      setError(false);
    }
  };

  if (success) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Register
            </Typography>

            <Grid item xs={12} sm container>
              <Grid item xs={12}>
                <TextField
                  id="UserName"
                  type="UserName"
                  name="UserName"
                  label="UserName"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.UserNameValid != null &&
                  infoDataValid.UserNameValid && (
                    <div className={classes.AlertError}>
                      Please enter the user name!
                    </div>
                  )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="Password"
                  type="password"
                  name="Password"
                  label="Password"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  onChange={handleChange}
                />
                {infoDataValid.PasswordValid != null &&
                  infoDataValid.PasswordValid && (
                    <div className={classes.AlertError}>
                      Please enter the password!
                    </div>
                  )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="button"
                  onClick={btnRegister}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
            {!error && <Alert severity="error">{msgError}</Alert>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default Register;
