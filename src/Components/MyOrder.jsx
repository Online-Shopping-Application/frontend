import React from "react";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const MyOrder = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: "#fff" }}>
      <Typography variant="h5" sx={{ marginBottom: 3, color: "#2C3E50" }}>
        My Orders
      </Typography>

      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: 2,
        }}
      >
        {/* Image */}
        <CardMedia
          component="img"
          image=""
          alt="Product Image"
          sx={{ width: 50, height: 50, borderRadius: 1 }}
        />

        {/* Order Details */}
        <Box sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#2C3E50" }}
          >
            Women Fit and Flare Brown Dress, Women Fit and Flare Brown Dress
          </Typography>
          <Typography variant="body2" sx={{ marginY: 0.5 }}>
            Items: 2
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            Total Price: $65.00
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <CircleIcon sx={{ fontSize: 12, color: "#FF5733", marginRight: 1 }} />
          <Typography variant="body2" sx={{ color: "#FF5733" }}>
            Food Processing
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
          Track Order
        </Button>
      </Card>
    </Box>
  );
};

export default MyOrder;
