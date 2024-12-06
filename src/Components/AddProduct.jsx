import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import Sidebar from "../Components/Sidebar";

const CLOUD_NAME = "dnxl5zlbm";
const UPLOAD_PRESET = "Online_Clothing_Shop";

const AddProduct = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    type: "",
    price: "",
    size: "",
    quantity: "",
    location: "",
    discount: "",
    colour: "",
    sellerId: 1,
    description: "",
    imgUrl: "",
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cldResponse, setCldResponse] = useState(null);

  const handleChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadComplete(false); // Reset upload status when a new file is selected
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setUploading(true);
    setUploadComplete(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const result = await response.json();
      setNewProduct({ ...newProduct, imgUrl: result.secure_url });
      setCldResponse(result);
      setUploadComplete(true);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/product/newproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Product added successfully:", result);
        alert("Product added successfully!");

        // Reset form after successful submission
        setNewProduct({
          type: "",
          price: "",
          size: "",
          quantity: "",
          location: "",
          discount: "",
          colour: "",
          description: "",
          imgUrl: "",
        });
        setFile(null);
      } else {
        console.error("Failed to add product:", response.statusText);
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onNavigate={() => {}} />
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
        <NavigationBar onLogout={() => {}} />
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Add New Product
          </Typography>
          <Box component="form">
            <Grid container spacing={2}>
              {[
                { label: "Product Type", field: "type" },
                { label: "Price", field: "price" },
                { label: "Size", field: "size" },
                { label: "Quantity", field: "quantity" },
                { label: "Location", field: "location" },
                { label: "Discount", field: "discount" },
                { label: "Colors", field: "colour" },
                { label: "Description", field: "description", multiline: true, rows: 1 },
              ].map(({ label, field, multiline, rows }) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    label={label}
                    fullWidth
                    margin="dense"
                    multiline={multiline}
                    rows={rows}
                    value={newProduct[field] || ""}
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
              <Grid item xs={12}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={uploadFile} disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                {uploadComplete && cldResponse && (
                  <div>
                    
                    {newProduct.imgUrl && (
                      <div>
                        {/* Image preview */}
                        <img
                          src={newProduct.imgUrl}
                          alt="Uploaded Preview"
                          width="300"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                width: "20%",
                left:"45%",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
                mt: 2,
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
