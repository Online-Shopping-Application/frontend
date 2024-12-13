import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  TextField, 
  Typography, 
  Paper,
  IconButton,
  Fade,
  Grow,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import React, { useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import Sidebar from "../Components/Sidebar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dragActive, setDragActive] = useState(false);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadComplete(false);
  };

  const uploadFile = async () => {
    if (!file) {
      showSnackbar('Please select a file', 'error');
      return;
    }

    setUploading(true);
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

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      setNewProduct({ ...newProduct, imgUrl: result.secure_url });
      setCldResponse(result);
      setUploadComplete(true);
      showSnackbar('Image uploaded successfully!');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/product/newproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      showSnackbar('Product added successfully!');
      setNewProduct({
        type: "", price: "", size: "", quantity: "",
        location: "", discount: "", colour: "",
        description: "", imgUrl: "",
      });
      setFile(null);
      setUploadComplete(false);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onNavigate={() => {}} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f8fafc",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <NavigationBar onLogout={() => {}} />
        <Fade in={true} timeout={800}>
          <Container maxWidth="xl" sx={{ mt: 8 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 4
                }}
              >
                <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
                Add New Product
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    {[
                      { label: "Product Type", field: "type" },
                      { label: "Price", field: "price", type: "number" },
                      { label: "Size", field: "size" },
                      { label: "Quantity", field: "quantity", type: "number" },
                      { label: "Location", field: "location" },
                      { label: "Discount", field: "discount", type: "number" },
                      { label: "Colors", field: "colour" },
                    ].map(({ label, field, type }, index) => (
                      <Grow in={true} timeout={1000 + (index * 100)} key={field}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label={label}
                            type={type || "text"}
                            fullWidth
                            value={newProduct[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#f8fafc',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  backgroundColor: '#f1f5f9'
                                },
                                '&.Mui-focused': {
                                  backgroundColor: '#fff',
                                  '& fieldset': {
                                    borderColor: '#2563eb',
                                    borderWidth: '2px'
                                  }
                                }
                              }
                            }}
                          />
                        </Grid>
                      </Grow>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={newProduct.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#f8fafc',
                            transition: 'all 0.3s',
                            '&:hover': {
                              backgroundColor: '#f1f5f9'
                            },
                            '&.Mui-focused': {
                              backgroundColor: '#fff',
                              '& fieldset': {
                                borderColor: '#2563eb',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    sx={{
                      p: 3,
                      border: '2px dashed',
                      borderColor: dragActive ? '#2563eb' : '#e2e8f0',
                      borderRadius: 3,
                      backgroundColor: dragActive ? '#eff6ff' : '#f8fafc',
                      transition: 'all 0.3s',
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f1f5f9'
                      }
                    }}
                  >
                    {!file && !uploadComplete ? (
                      <Box sx={{ p: 3 }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="file-input"
                        />
                        <label htmlFor="file-input">
                          <CloudUploadIcon sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                          <Typography variant="h6" sx={{ mb: 1, color: '#475569' }}>
                            Drag & Drop or Click to Upload
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Supported formats: JPEG, PNG, GIF
                          </Typography>
                        </label>
                      </Box>
                    ) : (
                      <Box>
                        {newProduct.imgUrl ? (
                          <Box sx={{ position: 'relative' }}>
                            <img
                              src={newProduct.imgUrl}
                              alt="Preview"
                              style={{ 
                                maxWidth: '100%', 
                                borderRadius: 8,
                                marginBottom: 16
                              }}
                            />
                            <IconButton
                              onClick={() => {
                                setFile(null);
                                setUploadComplete(false);
                                setNewProduct({ ...newProduct, imgUrl: '' });
                              }}
                              sx={{ 
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                '&:hover': {
                                  backgroundColor: 'rgba(0,0,0,0.7)'
                                }
                              }}
                            >
                              <DeleteIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box sx={{ p: 2 }}>
                            <ImageIcon sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                            <Typography>{file?.name}</Typography>
                          </Box>
                        )}
                        
                        {!uploadComplete && (
                          <Button
                            variant="contained"
                            onClick={uploadFile}
                            disabled={uploading}
                            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                            sx={{
                              mt: 2,
                              backgroundColor: '#2563eb',
                              '&:hover': {
                                backgroundColor: '#1d4ed8'
                              }
                            }}
                          >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                          </Button>
                        )}
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    backgroundColor: '#2563eb',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#1d4ed8',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(37,99,235,0.4)'
                    }
                  }}
                >
                  Save Product
                </Button>
              </Box>
            </Paper>
          </Container>
        </Fade>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            elevation={6}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddProduct;