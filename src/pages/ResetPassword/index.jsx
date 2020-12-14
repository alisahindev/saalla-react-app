import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import {
  loginRequest,
  sendResetCodeRequest,
  resetPasswordRequest,
} from "../../redux/auth/actions";
import { setErrorRequest } from "../../redux/error/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ResetPassword(props) {
  const [values, setValue] = useState({
    emailAddress: "",
    resetCode: "",
    newPassword: "",
  });

  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    const currentValues = values;
    currentValues[input.id] = input.value;
    setValue(currentValues);
  };

  const classes = useStyles();

  const handleSubmit = () => {
    const { resetPassword } = props;
    resetPassword(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Şifremi Unuttum
        </Typography>
        {props.errors.loginError && (
          <Alert color="danger">Kullanıcı adı veya şifre yanlış!</Alert>
        )}
        <Grid style={{ marginTop: 10 }} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="emailAddress"
              label="E-posta adresi"
              name="emailAddress"
              autoComplete="emailAddress"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="resetCode"
              label="Doğrulama kodu"
              name="resetCode"
              autoComplete="resetCode"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="newPassword"
              label="Yeni Şifre"
              name="newPassword"
              type="password"
              autoComplete="newPassword"
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Şifre Sıfırla
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/giris-yap">Giris yap</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (payload) => dispatch(resetPasswordRequest(payload)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
