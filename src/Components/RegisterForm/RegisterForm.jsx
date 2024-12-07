import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './RegisterForm.css';

function RegisterForm({ onSubmit }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    secondName: Yup.string().required('Second name is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    role: Yup.string().required('Role is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
        firstName: '',
        secondName: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    }
  });

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data); // Pass the form data to parent component
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <div className="registration-container">
      <h1>Create New Account</h1>
      <p>Please enter your details</p>

      <div className="registration-box">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="fullname">
            <div className="first-name">
              <label htmlFor="firstName">First Name:</label>
              <TextField
                id="firstName"
                fullWidth
                className="custom-textfield"
                style={{ marginBottom: '8px' }}
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </div>
            <div className="second-name">
              <label htmlFor="secondName">Second Name:</label>
              <TextField
                id="secondName"
                fullWidth
                className="custom-textfield"
                style={{ marginBottom: '8px' }}
                {...register('secondName')}
                error={!!errors.secondName}
                helperText={errors.secondName?.message}
              />
            </div>
          </div>
          <label htmlFor="address">Address:</label>
          <TextField
            id="address"
            fullWidth
            className="custom-textfield"
            style={{ marginBottom: '8px' }}
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <label htmlFor="email">Email:</label>
          <TextField
            id="email"
            fullWidth
            className="custom-textfield"
            style={{ marginBottom: '8px' }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <label htmlFor="password">Password:</label>
          <TextField
            id="password"
            type="password"
            fullWidth
            className="custom-textfield"
            style={{ marginBottom: '8px' }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <TextField
            id="confirm-password"
            type="password"
            fullWidth
            className="custom-textfield"
            style={{ marginBottom: '8px' }}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <label htmlFor="role">Role:</label>
          <FormControl fullWidth>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  style={{ height: '40px' }}
                  error={!!errors.role}
                >
                  <MenuItem value="" disabled>
                    Select a role
                  </MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                </Select>
              )}
            />
            <p className="error-message">{errors.role?.message}</p>
          </FormControl>

          <button type="submit" className='w-full'>Signup</button>
        </form>

        <div className="signin">
          <p>
            Already have an account? <a href="/login" className="signin-link">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
