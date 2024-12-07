import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios
import { Box, Grid, Typography, IconButton, CardMedia } from "@mui/material";

const SelectItem = () => {
   const location = useLocation();
   const { selectedProducts } = location.state || { selectedProducts: [] };

  const [products, setProducts] = useState([
    {
      id: 1,
      imageUrl: "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
      name: "Women Fit and Flare Brown Dress",
      price: 200,
      size: "Medium",
      quantity: 1, // Replaced count with quantity
      deliveryCharge: 10,
      discount: 20,
    },
    {
      id: 2,
      imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
      name: "Women Fit and Flare Brown Dress",
      price: 150,
      size: "Medium",
      quantity: 1, // Replaced count with quantity
      deliveryCharge: 5,
      discount: 15,
    },
  ]);

  // // Send the selected products to the backend
  // const sendSelectedProductsToBackend = async () => {
  //   try {
  //     const productData = selectedProducts.map((product) => ({
  //       productId: product.productId, // Updated from productID to productId
  //       quantity: product.quantity, // Updated from count to quantity
  //     }));

  //     const response = await axios.post("http://localhost:8082/api/cart/add-cart", {
  //       products: productData,
  //     });

  //     console.log("Response from backend:", response.data);
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   }
  // };

  // get selected products
  const [product2,setProduct2] = useState([]);

  const getSelectedProducts = async () => {

    try{
      const response = await axios.post("http://localhost:8082/api/order/by-ids", selectedProducts);
      setProduct2(response.data);
      console.log(response.data);
    }
    catch(err){
      console.log(err);
      
    }

  }

  useEffect(() =>{
    getSelectedProducts();
  },[]);

  return (
    <Box sx={{ padding: 2 }}>
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
              <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
                Quantity
              </Typography>
              <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
                Discount
              </Typography>
              <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
                Subtotal
              </Typography>
            </Box>

            {product2.map((product) => {
              const subtotal =
                 product.price * product.quantity - product.discount; // Updated count to quantity

              return (
                <Box
                  key={product.productId}
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
                      alt={product.productName}
                      sx={{
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        borderRadius: 1,
                        marginRight: 3,
                      }}
                    />
                    <Box>
                      <Typography>{product.productName}</Typography>
                      <Typography variant="body2" sx={{ color: "#777" }}>
                        Size: {product.productSize}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${product.unitPrice.toFixed(2)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "120px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ marginX: 1 }}>{product.quantity}</Typography> {/* Updated count to quantity */}
                  </Box>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    -${product.discount.toFixed(2)}
                  </Typography>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectItem;




// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios"; // Import axios
// import {
//   Box,
//   Grid,
//   Typography,
//   IconButton,
//   CardMedia,
// } from "@mui/material";

// const SelectItem = () => {
//   // const location = useLocation();
//   // const { selectedProducts } = location.state || { selectedProducts: [] };

//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       imageUrl: "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
//       name: "Women Fit and Flare Brown Dress",
//       price: 200,
//       size: "Medium",
//       count: 1,
//       deliveryCharge: 10,
//       discount: 20,
//     },
//     {
//       id: 2,
//       imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
//       name: "Women Fit and Flare Brown Dress",
//       price: 150,
//       size: "Medium",
//       count: 1,
//       deliveryCharge: 5,
//       discount: 15,
//     },
//   ]);

//   // // Send the selected products to the backend
//   // const sendSelectedProductsToBackend = async () => {
//   //   try {
//   //     const productData = selectedProducts.map((product) => ({
//   //       productID: product.productID, // Assuming the selected product has a productID
//   //       count: product.count,
//   //     }));

//   //     const response = await axios.post("http://localhost:8082/api/cart/add-cart", {
//   //       products: productData,
//   //     });

//   //     console.log("Response from backend:", response.data);
//   //   } catch (error) {
//   //     console.error("Error sending data to backend:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (selectedProducts && selectedProducts.length > 0) {
//   //     sendSelectedProductsToBackend();
//   //   }
//   // }, [selectedProducts]); // Run this effect when selectedProducts change

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" sx={{ marginBottom: 4 }}>
//         Checkout
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box
//             sx={{
//               padding: 2,
//               backgroundColor: "#fff",
//               borderRadius: 1,
//               boxShadow: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 justifyContent: "space-between",
//                 alignItems: { xs: "flex-start", md: "center" },
//                 padding: 1,
//                 borderBottom: "1px solid #ddd",
//                 backgroundColor: "#f5f5f5",
//               }}
//             >
//               <Typography sx={{ flex: 2, fontWeight: "bold" }}>Products</Typography>
//               <Typography sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}>
//                 Price
//               </Typography>
//               <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
//                 Quantity
//               </Typography>
//               <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
//                 Discount
//               </Typography>
//               <Typography sx={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
//                 Subtotal
//               </Typography>
//             </Box>

//             {products.map((product) => {
//               const subtotal =
//                 product.price * product.count - product.discount;

//               return (
//                 <Box
//                   key={product.id}
//                   sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", md: "row" },
//                     justifyContent: "space-between",
//                     alignItems: { xs: "flex-start", md: "center" },
//                     padding: 1,
//                     borderBottom: "1px solid #ddd",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", flex: 1.5, alignItems: "center" }}>
//                     <CardMedia
//                       component="img"
//                       image={product.imageUrl}
//                       alt={product.name}
//                       sx={{
//                         width: { xs: 50, md: 60 },
//                         height: { xs: 50, md: 60 },
//                         borderRadius: 1,
//                         marginRight: 3,
//                       }}
//                     />
//                     <Box>
//                       <Typography>{product.name}</Typography>
//                       <Typography variant="body2" sx={{ color: "#777" }}>
//                         Size: {product.size}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     ${product.price.toFixed(2)}
//                   </Typography>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       width: "120px",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography sx={{ marginX: 1 }}>{product.count}</Typography>
//                   </Box>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     -${product.discount.toFixed(2)}
//                   </Typography>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     ${subtotal.toFixed(2)}
//                   </Typography>

//                 </Box>
//               );
//             })}


            

//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default SelectItem;




