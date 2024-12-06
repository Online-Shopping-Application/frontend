import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ShoppingCart = ({ userID, selectedProducts, setSelectedProducts }) => {
  let userId = 100;

  
  

  const [products2, setProducts2] = useState([

  ]);

  // const fetchUserProducts = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8082/api/cart/get/${userId}`);
  //     setProducts2(response.data);
  //     console.log("Products: ", products2);
  //   } catch (error) {
  //     console.error("Error fetching user products:", error);
  //   }
  // };

  // Fetch products from the backend (without quantity)
const fetchUserProducts = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8082/api/cart/get/${userId}`);
    // Set initial quantity to 1 for each product
    const updatedProducts = response.data.map((product) => ({
      ...product,
      quantity: 1, // Initialize quantity as 1 (only frontend)
    }));
    
    setProducts2(updatedProducts);
  } catch (error) {
    console.error("Error fetching user products:",error);
}
};

  useEffect(() => {
    fetchUserProducts(userId);
  }, []);

 
  // const updateQuantity = (productId, change) => {
  //   setProducts2((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.productId === productId
  //         ? { ...product, quantity: Math.max(1, product.quantity + change) }
  //         : product
  //     )
  //   );
  // };

  // Handle quantity update (increase/decrease)
  const updateQuantity = (productId, change) => {
    setProducts2((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(1, product.quantity + change) } // Prevent quantity from going below 1
          : product
   )
);
};

  const deleteProduct = async (userId, productId) => {
    try {
      console.log("Deleting product:", productId);
      console.log("Deleting user:", userId);

      const response = await axios.delete(`http://localhost:8082/api/cart/remove-from-cart/${userId}/${productId}`);
      console.log("Product deleted successfully:", response.data);

      setProducts2((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
      setSelectedProducts((prevSelected) => prevSelected.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const isAlreadySelected = prevSelected.some((item) => item.productId === product.productId);
      return isAlreadySelected
        ? prevSelected.filter((item) => item.productId !== product.productId)
        : [...prevSelected, { productId: product.productId, quantity: product.quantity }];
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

            {products2.map((product) => {
              const subtotal = product.unitPrice * product.quantity - product.discount + product.deliveryCharges;

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
                    ${product.unitPrice}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "120px",
                      justifyContent: "center",
                    }}
                  >
                    {/* <IconButton size="small" onClick={() => updateQuantity(product.productId, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ marginX: 1 }}>{product.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(product.productId, 1)}>
                      <AddIcon />
                    </IconButton> */}

                    <IconButton size="small" onClick={() => updateQuantity(product.productId, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ marginX: 1 }}>{product.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(product.productId, 1)}>
                      <AddIcon />
                    </IconButton>

                  </Box>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    {product.discount.toFixed(2)}%
                  </Typography>

                  <Typography sx={{ width: "120px", textAlign: "center" }}>
                    ${subtotal.toFixed(2)}
                  </Typography>

                  <IconButton onClick={() => deleteProduct(userId, product.productId)}>
                    <DeleteIcon color="error" />
                  </IconButton>

                  <Checkbox
                    checked={selectedProducts.some((item) => item.productId === product.productId)}
                    onChange={() => handleCheckboxChange(product)}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;












// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveIcon from "@mui/icons-material/Remove";
// import {
//   Box,
//   CardMedia,
//   Checkbox,
//   Grid,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";


// const ShoppingCart = ({ userID, selectedProducts, setSelectedProducts }) => {
//   // const [products, setProducts] = useState([
//   //   {
//   //     id: 1,
//   //     imageUrl: "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
//   //     name: "Women Fit and Flare Brown Dress",
//   //     price: 400,
//   //     size: "Medium",
//   //     count: 1,
//   //     deliveryCharge: 10,
//   //     discount: 20,
//   //   },
//   //   {
//   //     id: 2,
//   //     imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
//   //     name: "Women Fit and Flare Brown Dress",
//   //     price: 150,
//   //     size: "Medium",
//   //     count: 1,
//   //     deliveryCharge: 5,
//   //     discount: 15,
//   //   },
    
//   //   {
//   //     id: 3,
//   //     imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
//   //     name: "Women Fit and Flare Brown Dress",
//   //     price: 150,
//   //     size: "Medium",
//   //     count: 1,
//   //     deliveryCharge: 5,
//   //     discount: 15,
//   //   },
//   // ]);
  
  
//  let userId = 100;

//   const [products2, setProducts2] = useState([]);

//   const fetchUserProducts = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/cart/get/${userId}`);
//       // Assuming the API returns an array of products
//       setProducts2(response.data);
//       console.log("Products: ", products2);

//     } catch (error) {
//       console.error("Error fetching user products:", error);
//     }
//   };


//   useEffect(() => {
    
//     fetchUserProducts(userId);
  
// },[]);

// const[count, setCount] = useState(1);

//   const updateQuantity = (id, delta) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, count: Math.max(1, count + delta) }
//           : product
//       )
//     );
//   };
  

//   // const deleteProduct = (id) => {
//   //   setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//   //   setSelectedProducts((prevSelected) => prevSelected.filter((item) => item.productID !== id));
//   // };
//   const deleteProduct = async (userId, productId) => {
//     try {
//       console.log("Deleting product:", productId);
//       console.log("Deleting product:", userId);
//       // Sending DELETE request to the server
//       const response = await axios.delete(`http://localhost:8082/api/cart/remove-from-cart/${userId}/${productId}`);
//       console.log("Product deleted successfully:", response.data);
      
//       // Updating the local state to remove the product
//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//       setSelectedProducts((prevSelected) => prevSelected.filter((item) => item.productID !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };
 


//   const handleCheckboxChange = (product) => {
//     setSelectedProducts((prevSelected) => {
//       const isAlreadySelected = prevSelected.some((item) => item.productID === product.productId);
//       return isAlreadySelected
//         ? prevSelected.filter((item) => item.productID !== product.productId)
//         : [...prevSelected, { productID: product.productId, count: count }];
//     });
//   };
    
  

//   return (
//     <Box sx={{ padding: 3 }}>
//       <table border="1">
//         <thead><tr><th>Product Name</th><th>Price</th><th>Discount</th><th>Subtotal</th></tr></thead>
//         <tbody>
//           {products2.map((product) => (
//             <tr key={product.productId}>
//               <td>{product.productName}</td>
//               <td>{product.unitPrice}</td>
//               <td>{product.discount}%</td>
//               <td>{product.subtotal}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
          
      
//       <Typography variant="h4" sx={{ marginBottom: 4 }}>
//         Shopping Cart
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
//               <Box sx={{ width: "40px" }} />
//             </Box>

//             {products2.map((product) => {
//               const subtotal = product.unitPrice * product.count - product.discount + product.deliveryCharges;

//               return (
//                 <Box
//                   key={product.productId}
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
//                       alt={product.productName}
//                       sx={{
//                         width: { xs: 50, md: 60 },
//                         height: { xs: 50, md: 60 },
//                         borderRadius: 1,
//                         marginRight: 3,
//                       }}
//                     />
//                     <Box>
//                       <Typography>{product.productName}</Typography>
//                       <Typography variant="body2" sx={{ color: "#777" }}>
//                         Size: {product.productSize}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     ${product.unitPrice}
//                   </Typography>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       width: "120px",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <IconButton size="small" onClick={() => updateQuantity(product.productId, -1)}>
//                       <RemoveIcon />
//                     </IconButton>
//                     <Typography sx={{ marginX: 1 }}>{selectedProducts.id}</Typography>
//                     <IconButton size="small" onClick={() => updateQuantity(product.productId, 1)}>
//                       <AddIcon />
//                     </IconButton>
//                   </Box>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     {product.discount.toFixed(2)}%
//                   </Typography>

//                   <Typography sx={{ width: "120px", textAlign: "center" }}>
//                     ${subtotal.toFixed(2)}
//                   </Typography>

//                   <IconButton onClick={() => deleteProduct(userId, product.productId)}>
//                     <DeleteIcon color="error"  sx={{ color: "black" }} />
//                   </IconButton>

//                   <Checkbox
//                     checked={selectedProducts.some((item) => item.productID === product.productId)}
//                     onChange={() => handleCheckboxChange(product)}
//                     sx={{
//                       '&.Mui-checked': {
//                         color: 'black',
//                       },
//                     }}

//                   />
//                 </Box>
//               );
//             })}
//             {/* <button onClick={handleData}>checkout</button> */}
//           </Box>
//         </Grid>
//       </Grid>
//                 {/* <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
//             <Button
//               onClick={handleData}
//               variant="contained"
//               sx={{
//                 backgroundColor: "black",
//                 color: "white",
//                 width: "20%",
//                 padding: "12px",
//                 borderRadius: "4px",
//                 "&:hover": {
//                   backgroundColor: "#333",
//                 },
//               }}
//             >
//               Checkout1
//             </Button>
//           </Box> */}

//       {/* <SelectItem selectedProducts={selectedProducts} /> */}

      
//     </Box>

    
//   );
// };

// export default ShoppingCart;
