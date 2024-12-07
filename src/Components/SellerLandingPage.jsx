import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  DialogActions, 
  TextField,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Fade,
  Grow,
  Zoom,
  Slide,
  Paper
} from "@mui/material";
import { keyframes } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Sidebar from "../Components/Sidebar";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";

// Define animations
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(20px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const SellerLandingPage = () => {
  // States
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    setPageLoaded(true);
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8083/api/product/sellerproducts/1");
      const fetchedProducts = response.data.map(product => ({
        id: product.id, // Use actual ID from backend
        name: product.type.toUpperCase(),
        type: product.type,
        imageUrl: product.imgUrl,
        price: product.price,
        quantityAvailable: product.quantity,
        colors: product.colour,
        location: product.location,
        discount: product.discount,
        deliveryCharge: product.deliveryCharges,
        size: product.size.toUpperCase(),
        description: product.description,
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      showSnackbar("Error fetching products: " + error.message, "error");
    }
  };

  // UI Helper functions
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleLogout = () => alert("Logged out successfully!");
  const handleNavigation = (section) => setActiveSection(section);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  // Product update handler
  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = {
        type: selectedProduct.name.toLowerCase(),
        price: selectedProduct.price,
        size: selectedProduct.size.toLowerCase(),
        quantity: selectedProduct.quantityAvailable,
        location: selectedProduct.location,
        description: selectedProduct.description,
        discount: selectedProduct.discount,
        deliveryCharges: selectedProduct.deliveryCharge,
        colour: selectedProduct.colors,
        imgUrl: selectedProduct.imageUrl
      };

      await axios.put(`http://localhost:8083/api/product/update/${selectedProduct.id}`, updatedData);
      
      setProducts(prevProducts =>
        prevProducts.map(p => p.id === selectedProduct.id ? selectedProduct : p)
      );
      
      showSnackbar("Product updated successfully");
      setPopupVisible(false);
    } catch (error) {
      showSnackbar("Error updating product: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Product delete handler
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8083/api/product/delete/${selectedProduct.id}`);
      
      setProducts(prevProducts => 
        prevProducts.filter(p => p.id !== selectedProduct.id)
      );
      
      showSnackbar("Product deleted successfully");
      setPopupVisible(false);
    } catch (error) {
      showSnackbar("Error deleting product: " + error.message, "error");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleChange = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  // Edit form renderer
  const renderEditForm = () => {
    const fields = [
      { label: "Product Name", field: "name", type: "text" },
      { label: "Price", field: "price", type: "number" },
      { label: "Size", field: "size", type: "text" },
      { label: "Quantity", field: "quantityAvailable", type: "number" },
      { label: "Location", field: "location", type: "text" },
      { label: "Discount (%)", field: "discount", type: "number" },
      { label: "Delivery Charge", field: "deliveryCharge", type: "number" },
      { label: "Colors", field: "colors", type: "text" },
    ];

    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {fields.map(({ label, field, type }, index) => (
            <Grow 
              in={true} 
              timeout={500 + (index * 100)}
              key={field}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label={label}
                  fullWidth
                  type={type}
                  value={selectedProduct?.[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8fafc',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                        '& > fieldset': { borderColor: '#1976d2' }
                      },
                      '&.Mui-focused': {
                        backgroundColor: '#fff',
                        '& > fieldset': { borderWidth: '2px' }
                      }
                    }
                  }}
                />
              </Grid>
            </Grow>
          ))}
          <Grid item xs={12}>
            <Grow in={true} timeout={1200}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={selectedProduct?.description || ''}
                onChange={(e) => handleChange("description", e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      '& > fieldset': { borderColor: '#1976d2' }
                    }
                  }
                }}
              />
            </Grow>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Product Card Component
  const ProductCard = ({ product, index }) => (
    <Grow 
      in={pageLoaded} 
      timeout={1000 + (index * 200)}
    >
      <Box
        onClick={() => handleProductClick(product)}
        sx={{
          border: "1px solid #eee",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          cursor: "pointer",
          width: 300,
          height: 500,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          },
          bgcolor: "white",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
          {product.discount > 0 && (
            <Zoom in={true}>
              <Chip
                label={`${product.discount}% OFF`}
                color="error"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontWeight: "bold",
                  animation: `${pulseAnimation} 2s infinite`,
                }}
              />
            </Zoom>
          )}
        </Box>
        <Box sx={{ p: 2, textAlign: "left" }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: "600", color: "#2c3e50" }}>
            {product.name}
          </Typography>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 1,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateX(8px)" }
            }}
          >
            <LocalOfferIcon sx={{ fontSize: 20, mr: 1, color: "#3498db" }} />
            <Typography variant="h6" sx={{ color: "#2980b9", fontWeight: "600" }}>
              ${product.price}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 1,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateX(8px)" }
            }}
          >
            <InventoryIcon sx={{ fontSize: 20, mr: 1, color: "#27ae60" }} />
            <Typography color="text.secondary">
              Available: {product.quantityAvailable}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateX(8px)" }
            }}
          >
            <PaletteIcon sx={{ fontSize: 20, mr: 1, color: "#8e44ad" }} />
            <Typography color="text.secondary">
              Color: {product.colors}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grow>
  );

  // Delete Confirmation Dialog
  const DeleteConfirmationDialog = () => (
    <Dialog
      open={deleteDialogOpen}
      onClose={() => setDeleteDialogOpen(false)}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#ff4444', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <WarningIcon />
        Confirm Delete
      </DialogTitle>
      <DialogContent sx={{ mt: 2, minWidth: 300 }}>
        <DialogContentText>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={() => setDeleteDialogOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <NavigationBar onLogout={handleLogout} />
      <Box sx={{ display: "flex", marginTop: 6 }}>
        <Sidebar onNavigate={handleNavigation} />
        <Fade in={pageLoaded} timeout={800}>
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: "#fff",
              minHeight: "100vh",
              overflowY: "auto",
            }}
          >
            {activeSection === "dashboard" && (
              <Box textAlign="center">
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                  {products.map((product, index) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                      <ProductCard product={product} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Fade>
      </Box>

      {/* Edit Product Dialog */}
      <Dialog 
        open={popupVisible} 
        onClose={() => setPopupVisible(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: '#1976d2', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" component="div">
            Edit Product Details
          </Typography>
          <IconButton
            onClick={() => setPopupVisible(false)}
            sx={{ 
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'rotate(90deg)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          {selectedProduct && renderEditForm()}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            disabled={loading}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            animation: `${fadeInUp} 0.5s ease`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellerLandingPage;