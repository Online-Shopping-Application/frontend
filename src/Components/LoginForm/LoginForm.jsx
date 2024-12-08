import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './LoginForm.css';

function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data); // Pass the form data to parent component
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <div>
      <div className="top">
        <ArrowBackIosIcon className="back-icon" style={{ fontSize: '18px' }} />
        <p className="back-text">Go Back</p>
      </div>

      <div className="login-container">
        <h1>Welcome</h1>
        <p>Please login here</p>

        <div className="login-box">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <label htmlFor="email-input">Email:</label>
            <TextField
              id="email-input"
              fullWidth
              className="custom-textfield"
              style={{ marginBottom: '15px' }}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <label htmlFor="password-input">Password:</label>
            <TextField
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              className="custom-textfield"
              style={{ marginBottom: '15px' }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className="options">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="/password-change" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="custom-button">
              Login
            </button>
          </form>

          <div className="signup">
            <p>
              Don't you have an account? <a href="/register" className="signup-link">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
