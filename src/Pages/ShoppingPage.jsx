import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SelectItem from "../Components/SelectItem";
import CheckOut from "../Components/CheckOut";
import { Typography, Button } from '@mui/material';

const ShoppingPage = () => {
  const location = useLocation();
  const { selectedProducts = [] } = location.state || {}; // Provide a default fallback

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  

  // State for backend data
  const [backendData, setBackendData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Fetch data from the backend
  const fetchDataFromBackend = async () => {
    try {
      const productData = selectedProducts.map((product) => ({
        productId: product.productId, // Updated key
        quantity: product.quantity, // Updated key
      }));
      console.log("Product Data:", productData);
      const response = await axios.post(
        "http://localhost:8082/api/order/payment-details",productData
        
      );
      console.log("Response from backend:", response.data);
      const data = response.data;
      setBackendData(data); // Assuming response has a "products" field
      setDeliveryCharge(data.totalDeliveryCharges); // Extract delivery charge
      setGrandTotal(data.totalCost); // Extract grand total
      setSubtotal(data.totalCost - data.totalDeliveryCharges);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  // fetch order product details
  const [productDetails, setProductDetails] = useState([]);

  const fetchProductDetails = async () => {
    try{
      const productData = selectedProducts.map((product) => ({
        productId: product.productId, // Updated key
        quantity: product.quantity, // Updated key
      }));
      const response = await axios.post("http://localhost:8082/api/order/by-ids",productData);
      setProductDetails(response.data);
      console.log("Product Details from backend:", response.data);
    }catch(error){
      console.error("Error fetching product details from backend:", error);
    }
  };

  useEffect(() => { 
    fetchDataFromBackend();
    fetchProductDetails();
  }, [selectedProducts]);

  // Place Order Handler
  const handlePlaceOrder = async () => {
    try {
      const productData = selectedProducts.map((product) => ({
        productId: product.productId, // Updated key
        quantity: product.quantity, // Updated key
      }));

      const response = await axios.post(
        "http://localhost:8082/api/order/place-order",
        { products: productData }
      );

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };



  useEffect(() => {
    console.log("Selected Products (ShoppingPage):", JSON.stringify(selectedProducts, null, 2));
  }, [selectedProducts]);

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Grid container spacing={2}>
        {/* Selected items on the left */}
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: isMobile ? 1 : 2 }}>
            <SelectItem backendData={backendData} />

            <Typography
              sx={{
                fontWeight: "",
                fontSize: "1.2rem",
                color: "black",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "10px 40px",
                gap: "90px",
              }}
            >
              <span>Delivery Charge</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </Typography>

            <Typography
              sx={{
                fontWeight: "",
                fontSize: "1.2rem",
                color: "black",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "10px 40px",
                gap: "90px",
              }}
            >
              <span>Sub Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "black",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "10px 40px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                gap: "90px",
              }}
            >
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </Typography>
          </Box>
          {/* Place Order Button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
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
              Place Order
            </Button>
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



            // import React, { useEffect, useState } from "react";
            // import { useLocation } from "react-router-dom";
            // import axios from "axios";
            // import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
            // import SelectItem from "../Components/SelectItem";
            // import CheckOut from "../Components/CheckOut";
            // import { Typography, Button } from '@mui/material';

            // const ShoppingPage = () => {
            //   const location = useLocation();
            //   const { selectedProducts = [] } = location.state || {}; // Provide a default fallback

            //   const theme = useTheme();
            //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

            //   // Send the selected products to the backend
            //   const sendSelectedProductsToBackend = async () => {
            //     try {
            //       const productData = selectedProducts.map((product) => ({
            //         productID: product.productID, // Assuming the selected product has a productID
            //         count: product.count,
            //       }));

            //       const response = await axios.post("http://localhost:8082/api/order/payment-details", {
            //         products: productData,
            //       });

            //       console.log("Response from backend:", response.data);
            //     } catch (error) {
            //       console.error("Error sending data to backend:", error);
            //     }
            //   };

            //     // State for backend data
            //   const [backendData, setBackendData] = useState([]);
            //   const [deliveryCharge, setDeliveryCharge] = useState(0);
            //   const [grandTotal, setGrandTotal] = useState(0);

            //   // Fetch data from the backend
            //   const fetchDataFromBackend = async () => {
            //     try {
            //       const productData = selectedProducts.map((product) => ({
            //         productID: product.productID, // Assuming the selected product has a productID
            //         count: product.count,
            //       }));

            //       const response = await axios.post(
            //         "http://localhost:8082/api/order/payment-details",
            //         {
            //           products: productData,
            //         }
            //       );

            //       const data = response.data;
            //       setBackendData(data.products); // Assuming response has a "products" field
            //       setDeliveryCharge(data.deliveryCharge); // Extract delivery charge
            //       setGrandTotal(data.grandTotal); // Extract grand total
            //     } catch (error) {
            //       console.error("Error fetching data from backend:", error);
            //     }
            //   };


            //                 // Place Order Handler
            //   const handlePlaceOrder = async () => {
            //     try {
            //       const productData = selectedProducts.map((product) => ({
            //         productID: product.productID,
            //         count: product.count,
            //       }));

            //       const response = await axios.post(
            //         "http://localhost:8082/api/order/place-order",
            //         { products: productData }
            //       );

            //       console.log("Order placed successfully:", response.data);
            //       alert("Order placed successfully!");
            //     } catch (error) {
            //       console.error("Error placing order:", error);
            //       alert("Failed to place the order. Please try again.");
            //     }
            //   };

            //   useEffect(() => {
            //     if (selectedProducts.length > 0) {
            //       sendSelectedProductsToBackend();
            //     } else {
            //       console.warn("No selected products to send.");
            //     }
            //   }, [selectedProducts]);

            

            //   useEffect(() => {
            //     console.log("Selected Products (ShoppingPage):", JSON.stringify(selectedProducts, null, 2));
            //   }, [selectedProducts]);

             
            //     return (
            //       <Box sx={{ padding: isMobile ? 2 : 4 }}>
            //         <Grid container spacing={2}>
            //           {/* Selected items on the left */}
            //           <Grid item xs={12} md={8}>
            //             <Box sx={{ padding: isMobile ? 1 : 2 }}>
            //               <SelectItem backendData={backendData} />

            //               <Typography
            //                 sx={{
            //                   fontWeight: "",
            //                   fontSize: "1.2rem",
            //                   color: "black",
            //                   display: "flex",
            //                   justifyContent: "flex-end",
            //                   alignItems: "center",
            //                   padding: "10px 40px",
            //                   gap: "90px",
            //                 }}
            //               >
            //                 <span>Delivery Charge</span>
            //                 <span>${deliveryCharge.toFixed(2)}</span>
            //               </Typography>

            //               <Typography
            //                 sx={{
            //                   fontWeight: "bold",
            //                   fontSize: "1.4rem",
            //                   color: "black",
            //                   display: "flex",
            //                   justifyContent: "flex-end",
            //                   alignItems: "center",
            //                   padding: "10px 40px",
            //                   backgroundColor: "#f5f5f5",
            //                   borderRadius: "8px",
            //                   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            //                   gap: "90px",
            //                 }}
            //               >
            //                 <span>Grand Total</span>
            //                 <span>${grandTotal.toFixed(2)}</span>
            //               </Typography>
            //                </Box>
            //     {/* Place Order Button */}
            //     <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            //             <Button
            //               variant="contained"
            //               onClick={handlePlaceOrder}
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
            //               Place Order
            //             </Button>
            //           </Box>
            //           </Grid>

            //           {/* CheckOut on the right */}
            //           <Grid item xs={12} md={4}>
            //             <Box sx={{ padding: isMobile ? 1 : 2 }}>
            //               <CheckOut />
            //             </Box>
            //           </Grid>
            //         </Grid>
            //       </Box>
            //     );
            //   };

            //   export default ShoppingPage;




