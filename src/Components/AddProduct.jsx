import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Button, Container } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import NavigationBar from "../Components/NavigationBar";

const AddProduct = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    size: "",
    quantityAvailable: "",
    location: "",
    discount: "",
    deliveryCharge: "",
    colors: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleSave = () => {
    const productWithId = { ...newProduct, id: Date.now() }; // Assign a unique ID
    onAddProduct(productWithId);
    // Reset form after adding product
    setNewProduct({
      name: "",
      price: "",
      size: "",
      quantityAvailable: "",
      location: "",
      discount: "",
      deliveryCharge: "",
      colors: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f4f4",
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* Navigation Bar */}
        <NavigationBar onLogout={() => {}} />

        {/* Add Product Form */}
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Add New Product
          </Typography>
          <Box component="form">
            <Grid container spacing={2}>
              {[ 
                { label: "Product Name", field: "name" },
                { label: "Price", field: "price" },
                { label: "Size", field: "size" },
                { label: "Quantity Available", field: "quantityAvailable" },
                { label: "Location", field: "location" },
                { label: "Discount", field: "discount" },
                { label: "Delivery Charge", field: "deliveryCharge" },
                { label: "Colors", field: "colors" },
                { label: "Image URL", field: "imageUrl" },
                { label: "Description", field: "description", multiline: true, rows: 1 }
              ].map(({ label, field, multiline, rows }) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    label={label}
                    fullWidth
                    margin="dense"
                    multiline={multiline}
                    rows={rows}
                    value={newProduct[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
                mt: 2
              }}
            >
              Save Product
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddProduct;
