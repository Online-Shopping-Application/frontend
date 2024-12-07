import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";

const MyOrder = () => {

  const userId = 100;
  const [orders,setOrders]= useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/order/order-by-user/${userId}`);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: 2, backgroundColor: "#fff" }}>
      <Typography variant="h5" sx={{ marginBottom: 3, color: "#2C3E50" }}>
        My Orders
      </Typography>
      
      {orders.map((order) => (
        <Card
        key={order.orderId}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: 2,
        }}
      >
        

        {/* Order Details */}
        <Box sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#2C3E50" }}
          >
            Order Date: {order.orderDate}
          </Typography>
          <Typography variant="body2" sx={{ marginY: 0.5 }}>
            Delivary Charges: ${order.totalDelivaryCharges}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            Total Price: ${order.totalCost}
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <CircleIcon sx={{ fontSize: 12, color: "#FF5733", marginRight: 1 }} />
          <Typography variant="body2" sx={{ color: "#FF5733" }}>
            Order Status
          </Typography>
        </Box>

        {/* Track Order Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFCCCC",
            color: "#333",
            borderRadius: "8px",
            textTransform: "none",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#FFBBBB" },
          }}
        >
          {order.orderStatus}
        </Button>
      </Card>
      ))}
      
    </Box>
  );
};

export default MyOrder;
