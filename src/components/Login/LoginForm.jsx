import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  FormHelperText
} from '@material-ui/core';

import authService from '../../services/auth-service';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function LoginForm() {
  const [emailValue, setEmailValue] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordValid, setpasswordValid] = useState(true);
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [loginValid, setLoginValid] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const classes = useStyles();

  const validateEmail = value => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    setEmailValue(value);
    setEmailHelperText(isValid ? '' : 'Enter a valid email');
    setEmailValid(isValid);
  };

  const validatePassword = value => {
    const isValid = value && value.length > 6;
    setPasswordValue(value);
    setPasswordHelperText(isValid ? '' : 'Use 8 characters or more for your password');
    setpasswordValid(isValid);
  };

  const handleBlur = event => {
    const { name, value } = event.target;
    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (emailValue && emailValid && passwordValue && passwordValid) {
      const { data, headers } = await authService.login({
        email: emailValue,
        password: passwordValue
      });
      if (data.code === 200) {
        console.log('x-auth-token', headers['x-auth-token']);
        setLoginValid(true);
      } else {
        setLoginValid(false);
        setLoginErrorText(data.message);
      }
    } else {
      validateEmail(emailValue);
      validatePassword(passwordValue);
    }
  };

  return (
    <>
      {loginValid ? <Redirect to="/" /> : <FormHelperText error>{loginErrorText}</FormHelperText>}
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          variant="outlined"
          margin="normal"
          error={!emailValid}
          helperText={emailHelperText}
          onBlur={handleBlur}
          required
          fullWidth
          autoFocus
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          margin="normal"
          error={!passwordValid}
          helperText={passwordHelperText}
          onBlur={handleBlur}
          required
          fullWidth
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
