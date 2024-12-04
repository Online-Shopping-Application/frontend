


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios"; // Import axios
// import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import SelectItem from "../Components/SelectItem";
// import CheckOut from "../Components/CheckOut";

// const ShoppingPage = () => {
//   const location = useLocation();
//   const { selectedProducts } = location.state || { selectedProducts: [] };

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//    // Send the selected products to the backend
//    const sendSelectedProductsToBackend = async () => {
//     try {
//       const productData = selectedProducts.map((product) => ({
//         productID: product.productID, // Assuming the selected product has a productID
//         count: product.count,
//       }));

//       const response = await axios.post("http://localhost:8082/api/cart/add-cart", {
//         products: productData,
//       });

//       console.log("Response from backend:", response.data);
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (selectedProducts && selectedProducts.length > 0) {
//   //     sendSelectedProductsToBackend();
//   //   }
//   // }, [selectedProducts]); 

  
//   useEffect(() => {
//     console.log("Selected Products (SelectItem):", JSON.stringify(selectedProducts, null, 2));
//   }, [selectedProducts]);

//   return (
//     <Box sx={{ padding: isMobile ? 2 : 4 }}>
//       <Grid container spacing={2}>
//         {/* Selected items on the left */}
//         <Grid item xs={12} md={8}>
//           <Box sx={{ padding: isMobile ? 1 : 2 }}>
//             <SelectItem />
//           </Box>
//         </Grid>

//         {/* CheckOut on the right */}
//         <Grid item xs={12} md={4}>
//           <Box sx={{ padding: isMobile ? 1 : 2 }}>
//             <CheckOut />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ShoppingPage;


            import React, { useEffect } from "react";
            import { useLocation } from "react-router-dom";
            import axios from "axios";
            import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
            import SelectItem from "../Components/SelectItem";
            import CheckOut from "../Components/CheckOut";

            const ShoppingPage = () => {
              const location = useLocation();
              const { selectedProducts = [] } = location.state || {}; // Provide a default fallback

              const theme = useTheme();
              const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

              // Send the selected products to the backend
              const sendSelectedProductsToBackend = async () => {
                try {
                  const productData = selectedProducts.map((product) => ({
                    productID: product.productID, // Assuming the selected product has a productID
                    count: product.count,
                  }));

                  const response = await axios.post("http://localhost:8082/api/order/payment-details", {
                    products: productData,
                  });

                  console.log("Response from backend:", response.data);
                } catch (error) {
                  console.error("Error sending data to backend:", error);
                }
              };

              useEffect(() => {
                if (selectedProducts.length > 0) {
                  sendSelectedProductsToBackend();
                } else {
                  console.warn("No selected products to send.");
                }
              }, [selectedProducts]);

            

              useEffect(() => {
                console.log("Selected Products (ShoppingPage):", JSON.stringify(selectedProducts, null, 2));
              }, [selectedProducts]);

              return (
                <Box sx={{ padding: isMobile ? 2 : 4 }}>
                  <Grid container spacing={2}>
                    {/* Selected items on the left */}
                    <Grid item xs={12} md={8}>
                      <Box sx={{ padding: isMobile ? 1 : 2 }}>
                        <SelectItem />
                      </Box>
                    </Grid>

                    {/* CheckOut on the right */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ padding: isMobile ? 1 : 2 }}>
                        <CheckOut />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            };

            export default ShoppingPage;

