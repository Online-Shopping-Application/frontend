//forgot password
import React from 'react'
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './ForgotPassword.css'


function ForgotPassword() {
    return (
        <div>
            <div className="top">
                <ArrowBackIosIcon className="back-icon" style={{ fontSize: '18px' }} />
                <p className='back-text'>Go Back</p>
            </div>

            <div className='changepw-container'>
                <h1>Forgot Password</h1>
                <p>Enter your registered email address. we'll send you a code to reset your password</p>

                <div className="changepw-box">
                    <label htmlFor="email-input">Email Address:</label>
                    <TextField
                        id="email-input"
                        type="email"
                        fullWidth
                        className="custom-textfield"
                    />

                    <button
                        className="custom-button"
                        fullWidth
                    >
                        Send OTP
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
