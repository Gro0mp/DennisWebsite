import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ForgotPassword from './ForgotPassword.jsx';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons.jsx';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
})

export default function SignInCard() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoginError('');
    setLoginSuccess(false);

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    setLoading(true);

    try {
      const response = await api.post('/api/v1/users/login', {
        email: email,
        password: password,
      });

      // If the response back from the backend is successful, set login success to true
      if (response.status === 200) {
        setLoginSuccess(true);
        console.log('Login successful:', response.data);
      }

      const userData = response.data;

      // Store user data (don't store the timestamp directly)
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email
      }));

      // Redirect after successful login. Provide userData to the state
      // of chatbot page.
      setTimeout(() => {
        navigate("/chatbot", { state: { user: userData } });
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        const errorMessage = error.response.data.error || 'Login failed. Please check your credentials.';
        setLoginError(errorMessage);
      } else if (error.request) {
        setLoginError('Unable to connect to server. Please try again later.');
      } else {
        setLoginError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
      <Card variant="outlined">
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <SitemarkIcon />
        </Box>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>

        {loginError && (
            <Alert severity="error" onClose={() => setLoginError('')}>
              {loginError}
            </Alert>
        )}

        {loginSuccess && (
            <Alert severity="success">
              Login successful! Redirecting...
            </Alert>
        )}

        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                disabled={loading}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                disabled={loading}
            />
          </FormControl>
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              disabled={loading}
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign in'}
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
            <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
          </Typography>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
              disabled={loading}
          >
            Sign in with Google
          </Button>
          <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
              disabled={loading}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </Card>
  );
}