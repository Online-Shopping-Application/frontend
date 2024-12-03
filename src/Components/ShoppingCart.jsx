import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  CardMedia,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ShoppingCart = () => {
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

  const updateQuantity = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, count: Math.max(1, product.count + delta) }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) =>
        total +
        (product.price * product.count -
          product.discount +
          product.deliveryCharge),
      0
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Checkout
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
              <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
                Price
              </Typography>
              <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
                Quantity
              </Typography>
              <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
                Delivery
              </Typography>
              <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
                Discount
              </Typography>
              <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
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
                    ${product.deliveryCharge.toFixed(2)}
                  </Typography>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    -${product.discount.toFixed(2)}
                  </Typography>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${subtotal.toFixed(2)}
                  </Typography>

                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              );
            })}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 2,
                borderTop: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ marginRight: 5, fontWeight: "bold" }}>
                Grand Total:
              </Typography>
              <Typography variant="h6">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
