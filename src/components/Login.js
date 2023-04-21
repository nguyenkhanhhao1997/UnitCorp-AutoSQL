import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import callApi from "../api/apiService";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
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
    width: "100%",
    marginBottom: 10,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("login")) {
      setLogin(true);
    }
  }, []);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePass = (e) => {
    setPassword(e.target.value);
  };

  const btnLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let data = {
        UserName: email,
        Password: password,
      };
      callApi(`user/login`, "POST", data).then((item) => {
        if (item.data) {
          alert("Login successfuly");
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("name", item.data.userName);
          sessionStorage.setItem("userId", item.data.userID);
          sessionStorage.setItem("token", item.data.token);
          setLogin(true);
          return <Redirect to={{ pathname: "/home" }} />;
        } else {
          alert("Login error!");
        }
      });
    }
  };

  if (login) {
    return <Redirect to={{ pathname: "/home" }} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Logix Technology
            </Typography>
            <form className={classes.form} noValidate>
              <Grid item xs={12} sm container>
                <Grid item xs={12}>
                  <TextField
                    id="Email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    className={classes.txtInput}
                    size="small"
                    onChange={changeEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    className={classes.txtInput}
                    size="small"
                    onChange={changePass}
                  />
                </Grid>
                <Grid item xs={12}>
                  <a href="/register">Register new account</a>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={btnLogin}
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
