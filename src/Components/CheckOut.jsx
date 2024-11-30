import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const CheckOut = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    cityState: "",
    zipCountry: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log("Delivery Information:", formData);
    console.log("Order placed successfully!");
    // Add logic for order placement or payment here
  };

  const cartTotals = {
    subtotal: 60,
    deliveryFee: 5,
    total: 65,
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 6, // Increase spacing between sections
        p: 3,
      }}
    >
      {/* Delivery Information Form */}
      <Box
        sx={{
          flex: 0.6, // Reduced width for delivery information
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Delivery Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City, State"
              name="cityState"
              value={formData.cityState}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zip Code, Country"
              name="zipCountry"
              value={formData.zipCountry}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Cart Totals Section */}
      <Paper
        elevation={3}
        sx={{
          flex: 0.4, // Increased width for cart totals
          p: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
         <Typography variant="h5" sx={{ borderBottom: "1px solid #ccc", paddingBottom: "12px" }}  gutterBottom>
          Cart Totals
        </Typography>
      
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Subtotal:</Typography>
          <Typography>${cartTotals.subtotal}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Delivery Fee:</Typography>
          <Typography>${cartTotals.deliveryFee}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="bold"
        >
          <Typography>Total:</Typography>
          <Typography>${cartTotals.total}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePlaceOrder}
          sx={{
            mt: 2,
            backgroundColor: "#ff4500",
            "&:hover": {
              backgroundColor: "#e63900",
            },
            alignSelf: "center",
            marginTop: "100px",
          }}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default CheckOut;  
