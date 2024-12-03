import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios
import {
  Box,
  Grid,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";

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

  // Send the selected products to the backend
  const sendSelectedProductsToBackend = async () => {
    try {
      const productData = selectedProducts.map((product) => ({
        productID: product.productID, // Assuming the selected product has a productID
        count: product.count,
      }));

      const response = await axios.post("http://localhost:8082/api/cart/add-cart", {
        products: productData,
      });

      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      sendSelectedProductsToBackend();
    }
  }, [selectedProducts]); // Run this effect when selectedProducts change

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
            </Box>

            {products.map((product) => {
              const subtotal =
                product.price * product.count - product.discount;

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
                    <Typography sx={{ marginX: 1 }}>{product.count}</Typography>
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
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Typography,
//   IconButton,
//   CardMedia,
// } from "@mui/material";


// const SelectItem = () => {
//   const location = useLocation();
//   const { selectedProducts } = location.state || { selectedProducts: [] };

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

//   const sendSelectedProductsToBackend = async () => {
//     try {
//       const productData = selectedProducts.map((product) => ({
//         productID: product.productID, // Assuming the selected product has a productID
//         count: product.count,
//       }));

//       const response = await axios.post("https://your-backend-url.com/checkout", {
//         products: productData,
//       });

//       console.log("Response from backend:", response.data);
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//     }
//   };


//   useEffect(() => {
//     console.log("Selected Products (SelectItem):", JSON.stringify(selectedProducts, null, 2));
//   }, [selectedProducts]);

 

// //   if (!selectedProducts || selectedProducts.length === 0) {
// //     return <div>No items selected.</div>;
// //   }

//   return (
//     // <div>
//     //    <h3>Selected Items:</h3>
//     //  <pre>{JSON.stringify(selectedProducts, null, 2)}</pre>
//     //     </div>
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
//               <Typography sx={{ width: "150px", textAlign: "center", fontWeight: "bold" }}>
//                 Price
//               </Typography>
//               <Typography sx={{ width: "140px", textAlign: "center", fontWeight: "bold" }}>
//                 Quantity
//               </Typography>
//               <Typography sx={{ width: "60px", textAlign: "center", fontWeight: "bold" }}>
//                 Discount
//               </Typography>
//               <Typography sx={{ width: "200px", textAlign: "center", fontWeight: "bold" }}>
//                 Subtotal
//               </Typography>
//             </Box>

//             {products.map((product) => {
//               const subtotal =
//                 product.price * product.count - product.discount ;

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

