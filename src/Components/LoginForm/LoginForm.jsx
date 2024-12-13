import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './LoginForm.css'


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="top">
        <ArrowBackIosIcon className="back-icon" style={{ fontSize: '18px' }} />
        <p className='back-text'>Go Back</p>
      </div>

      <div className="login-container">
        <h1>Welcome</h1>
        <p>Please login here</p>

        <div className="login-box">
          <label htmlFor="email-input">Email:</label>
          <TextField
            id="email-input"
            type="email"
            fullWidth
            className="custom-textfield"
            style={{
              marginBottom: '15px'
            }}
          />
          <label htmlFor="password-input">Password:</label>
          <TextField
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            className="custom-textfield"
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
            <a href="/password-change" className="forgot-password">Forgot Password?</a>
          </div>

          <button
            className="custom-button"
            fullWidth
          >
            Login
          </button>

          <div className='signup'>
            <p>Don't you have an account ? <a href="/register" className="signup-link">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm