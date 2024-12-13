import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './RegisterForm.css'

function RegisterForm() {
    const [role, setRole] = React.useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div className='registration-container'>
            <h1>Create New Account</h1>
            <p>Please enter your details</p>

            <div className="registration-box">
                <div className="fullname">
                    <div className="first-name">
                        <label htmlFor="firstName">First Name:</label>
                        <TextField
                            id="firstName"
                            type="text"
                            fullWidth
                            className="custom-textfield"
                            style={{
                                marginBottom: '8px'
                            }}
                        />
                    </div>
                    <div className="second-name">
                        <label htmlFor="secondName">Second Name:</label>
                        <TextField
                            id="secondName"
                            type="text"
                            fullWidth
                            className="custom-textfield"
                            style={{
                                marginBottom: '8px'
                            }}
                        />
                    </div>
                </div>
                <label htmlFor="address">Address:</label>
                <TextField
                    id="address"
                    type="text"
                    fullWidth
                    className="custom-textfield"
                    style={{
                        marginBottom: '8px'
                    }}
                />
                <label htmlFor="email">Email:</label>
                <TextField
                    id="email"
                    type="text"
                    fullWidth
                    className="custom-textfield"
                    style={{
                        marginBottom: '8px'
                    }}
                />
                <label htmlFor="password">Password:</label>
                <TextField
                    id="password"
                    type="text"
                    fullWidth
                    className="custom-textfield"
                    style={{
                        marginBottom: '8px'
                    }}
                />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <TextField
                    id="confirm-password"
                    type="text"
                    fullWidth
                    className="custom-textfield"
                    style={{
                        marginBottom: '8px'
                    }}
                />
                <label htmlFor="role">Role:</label>
                <FormControl fullWidth>
                    <Select
                        id="role"
                        value={role}
                        displayEmpty
                        onChange={handleRoleChange}
                        style={{ height: '40px' }}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                    </Select>
                </FormControl>


                <button
                    className="custom-button"
                    fullWidth
                >
                    Signup
                </button>

                <div className='signin'>
                    <p>Already have an account ? <a href="/login" className="signin-link">Sign In</a></p>
                </div>

            </div>
        </div>
    )
}

export default RegisterForm