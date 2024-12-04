
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  CardMedia,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectItem from "./SelectItem";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import axios from "axios";


const ShoppingCart = ({ userID, selectedProducts, setSelectedProducts }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      imageUrl: "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
      name: "Women Fit and Flare Brown Dress",
      price: 200,
      size: "Medium",
      count: 1,
      deliveryCharge: 10,
      discount: 20,
    },
    {
      id: 2,
      imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
      name: "Women Fit and Flare Brown Dress",
      price: 150,
      size: "Medium",
      count: 1,
      deliveryCharge: 5,
      discount: 15,
    },
  ]);

  
  useEffect(() => {
    if (userID) {
      fetchUserProducts(userID);
    }
  }, [userID]);

  const fetchUserProducts = async (userID) => {
    try {
      const response = await axios.get(`https://api.example.com/user/${userID}/products`);
      // Assuming the API returns an array of products
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };


  const updateQuantity = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, count: Math.max(1, product.count + delta) }
          : product
      )
    );
  };

  // const deleteProduct = (id) => {
  //   setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  //   setSelectedProducts((prevSelected) => prevSelected.filter((item) => item.productID !== id));
  // };
  const deleteProduct = async (id) => {
    try {
      // Sending DELETE request to the server
      const response = await axios.delete(`http://localhost:8082/api/cart/remove-from-cart/{userId}/{productId}`);
      console.log("Product deleted successfully:", response.data);
  
      // Updating the local state to remove the product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      setSelectedProducts((prevSelected) => prevSelected.filter((item) => item.productID !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
 
  

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const isAlreadySelected = prevSelected.some((item) => item.productID === product.id);
      return isAlreadySelected
        ? prevSelected.filter((item) => item.productID !== product.id)
        : [...prevSelected, { productID: product.id, count: product.count }];
    });
  };
    
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#fff",
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                padding: 1,
                borderBottom: "1px solid #ddd",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ flex: 2, fontWeight: "bold" }}>Products</Typography>
              <Typography sx={{ width: "150px", textAlign: "center", fontWeight: "bold" }}>
                Price
              </Typography>
              <Typography sx={{ width: "140px", textAlign: "center", fontWeight: "bold" }}>
                Quantity
              </Typography>
              <Typography sx={{ width: "60px", textAlign: "center", fontWeight: "bold" }}>
                Discount
              </Typography>
              <Typography sx={{ width: "200px", textAlign: "center", fontWeight: "bold" }}>
                Subtotal
              </Typography>
              <Box sx={{ width: "40px" }} />
            </Box>

            {products.map((product) => {
              const subtotal =
                product.price * product.count - product.discount + product.deliveryCharge;

              return (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                    padding: 1,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Box sx={{ display: "flex", flex: 1.5, alignItems: "center" }}>
                    <CardMedia
                      component="img"
                      image={product.imageUrl}
                      alt={product.name}
                      sx={{
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        borderRadius: 1,
                        marginRight: 3,
                      }}
                    />
                    <Box>
                      <Typography>{product.name}</Typography>
                      <Typography variant="body2" sx={{ color: "#777" }}>
                        Size: {product.size}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${product.price.toFixed(2)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "120px",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton size="small" onClick={() => updateQuantity(product.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ marginX: 1 }}>{product.count}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(product.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    -${product.discount.toFixed(2)}
                  </Typography>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${subtotal.toFixed(2)}
                  </Typography>

                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteIcon color="error"  sx={{ color: "black" }} />
                  </IconButton>

                  <Checkbox
                    checked={selectedProducts.some((item) => item.productID === product.id)}
                    onChange={() => handleCheckboxChange(product)}
                    sx={{
                      '&.Mui-checked': {
                        color: 'black',
                      },
                    }}

                  />
                </Box>
              );
            })}
            {/* <button onClick={handleData}>checkout</button> */}
          </Box>
        </Grid>
      </Grid>
                {/* <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              onClick={handleData}
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "20%",
                padding: "12px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Checkout1
            </Button>
          </Box> */}

      {/* <SelectItem selectedProducts={selectedProducts} /> */}

    </Box>
  );
};

export default ShoppingCart;
