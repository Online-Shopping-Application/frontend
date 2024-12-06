import React, { useState } from "react";
import { Box, Typography, AppBar,Toolbar,Button,List,ListItem,ListItemText,Drawer,Badge,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Grid,} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "../Components/Sidebar";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";




// Navigation Bar Component
// const NavigationBar = ({ onLogout }) => {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   return (
//     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,
//         backgroundColor:"black"
//      }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Seller
//         </Typography>
//         <IconButton color="inherit" onClick={() => setShowProfileMenu(!showProfileMenu)}>
//           <Badge badgeContent={3} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <IconButton color="inherit" onClick={onLogout}>
//           <AccountCircleIcon />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };

// Initial Product Data
const initialProducts = [
  {
    id: 1,
    name: "BUTTON DOWN MAXI DRESS",
    imageUrl:
      "https://mimosaforever.com/cdn/shop/files/096A9861_270x_crop_bottom.jpg?v=1730806827",
    price: "$10",
    quantityAvailable: 20,
    colors: "Red, Blue, Black",
    location: "Colombo",
    discount: 0,
    deliveryCharge: "$2",
    size: "S, M, L",
    description: "A stylish maxi dress.",
  },
  {
    id: 2,
    name: "CASUAL CHIC DRESS",
    imageUrl:
      "https://zigzag.lk/cdn/shop/files/19_88cdfe94-9025-4b50-952c-b887b30e3f80_437x.progressive.jpg?v=1732871231",
    price: "$15",
    quantityAvailable: 15,
    colors: "White, Pink, Black",
    location: "Colombo",
    discount: 5,
    deliveryCharge: "$3",
    size: "M, L, XL",
    description: "A casual chic dress for everyday wear.",
  },
  {
    id: 3,
    name: "SUMMER FLORAL DRESS",
    imageUrl:
      "https://lurreli.lk/cdn/shop/files/0034.jpg?v=1722589429&width=360",
    price: "$20",
    quantityAvailable: 10,
    colors: "Floral Red, Green",
    location: "Colombo",
    discount: 10,
    deliveryCharge: "$4",
    size: "S, M",
    description: "A beautiful floral dress perfect for summer.",
  },
  {
    id: 4,
    name: "EVENING GOWN",
    imageUrl:
      "https://www.dillyandcarlo.com/cdn/shop/files/Web_SizeArtboard_8_c62eaff0-cc78-4b34-bc74-597ca9d2e866.jpg?v=1732868609&width=360",
    price: "$50",
    quantityAvailable: 5,
    colors: "Black, Navy Blue",
    location: "Colombo",
    discount: 15,
    deliveryCharge: "$5",
    size: "S, M, L",
    description: "Elegant evening gown for special occasions.",
  },
  {
    id: 5,
    name: "SPORTS TEE",
    imageUrl:
      "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
    price: "$12",
    quantityAvailable: 30,
    colors: "Blue, Green, Red",
    location: "Colombo",
    discount: 0,
    deliveryCharge: "$2",
    size: "M, L, XL",
    description: "Comfortable sports tee for active wear.",
  },
  {
    id: 6,
    name: "COZY SWEATER",
    imageUrl:
      "https://thilakawardhana.com/cdn/shop/files/TW14071.2_1880x.jpg?v=1732724161",
    price: "$25",
    quantityAvailable: 8,
    colors: "Gray, Beige",
    location: "Colombo",
    discount: 5,
    deliveryCharge: "$3",
    size: "S, M, L",
    description: "Warm and cozy sweater for cold weather.",
  },
];

// Seller Landing Page
const SellerLandingPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8083/api/product/sellerproducts/{1}");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => alert("Logged out successfully!");
  const handleNavigation = (section) => setActiveSection(section);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };
  // const handleSave = () => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
  //   );
  //   setPopupVisible(false);
  // };
  // const handleDelete = () => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((p) => p.id !== selectedProduct.id)
  //   );
  //   setPopupVisible(false);
  // };
  const handleSave = async () => {
    try {
      await axios.put(`/api/products/${selectedProduct.id}`, selectedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? selectedProduct : p
        )
      );
      setPopupVisible(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${selectedProduct.id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== selectedProduct.id)
      );
      setPopupVisible(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleChange = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  return (
    <Box>
      <NavigationBar onLogout={handleLogout} />
      <Box sx={{ display: "flex", marginTop: 6 }}>
        <Sidebar onNavigate={handleNavigation} />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#fff",
            minHeight: "100vh",
            overflowX: "hidden", // Disable horizontal scrolling
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          {activeSection === "dashboard" && (
            <Box textAlign="center">
              <Grid container spacing={5} justifyContent="center" sx={{ mt: 2 }}>
                {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={4} onClick={() => handleProductClick(product)}>
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 2,
                        cursor: "pointer",
                        width: 300, // Set the width to 300px
                        height: 500, // Set the height to 500px
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "80%",
                          objectFit: "cover",
                        }}
                      />
                      <Box sx={{ p: 1 }}>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography>Price: {product.price}</Typography>
                        <Typography>Available: {product.quantityAvailable}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog 
  open={popupVisible} 
  onClose={() => setPopupVisible(false)} 
  sx={{
    "& .MuiDialog-paper": {
      marginTop: "95px", // Adjust this value to move the dialog down
      paddingBottom: 0,
    }
  }}
>
      <DialogTitle sx={{ 
    backgroundColor: "black", 
    color: "white", 
    textAlign: "center", 
    paddingRight: 3, // Add space for the close icon
    position: "relative" 
  }}>
    Edit Product
    <IconButton 
      onClick={() => setPopupVisible(false)} 
      sx={{
        position: "absolute", 
        right: 0, 
        top: "20%", 
        color: "white" ,
        fontSize: "1.5rem",
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
   <DialogContent
    sx={{
      paddingBottom: 0, // Remove extra padding at the bottom of the content
    }}
  >
    {selectedProduct && (
      <Box component="form">
        <Grid container spacing={1}>
          {/* First Row */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              fullWidth
              margin="dense"
              value={selectedProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              fullWidth
              margin="dense"
              value={selectedProduct.price}
              onChange={(e) => handleChange("price", e.target.value)}
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

          {/* Second Row */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Size"
              fullWidth
              margin="dense"
              value={selectedProduct.size}
              onChange={(e) => handleChange("size", e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity Available"
              fullWidth
              margin="dense"
              value={selectedProduct.quantityAvailable}
              onChange={(e) => handleChange("quantityAvailable", e.target.value)}
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

          {/* Third Row */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              fullWidth
              margin="dense"
              value={selectedProduct.location}
              onChange={(e) => handleChange("location", e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Discount"
              fullWidth
              margin="dense"
              value={selectedProduct.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
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

          {/* Fourth Row */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Delivery Charge"
              fullWidth
              margin="dense"
              value={selectedProduct.deliveryCharge}
              onChange={(e) => handleChange("deliveryCharge", e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Colors"
              fullWidth
              margin="dense"
              value={selectedProduct.colors}
              onChange={(e) => handleChange("colors", e.target.value)}
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

          {/* Fifth Row */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              multiline
              rows={2}
              value={selectedProduct.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
        </Grid>
      </Box>
    )}
  </DialogContent>
  <DialogActions
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2, // Space between buttons
    padding: 1, // Adjust padding to minimize extra space
    paddingRight: 3,
    paddingTop:2,
    marginTop: "-8px", // Adjust upward positioning
    marginBottom: "2px", // Add space below the buttons
  }}
>
  <Button
    onClick={handleSave}
    sx={{
      width: "100px", // Increase button width
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "#333",
      },
    }}
  >
    Save
  </Button>
  <Button
    onClick={handleDelete}
    sx={{
      width: "100px", // Increase button width
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "#333",
      },
    }}
  >
    Delete
  </Button>
</DialogActions>


</Dialog>

    </Box>
  );
};

export default SellerLandingPage;
