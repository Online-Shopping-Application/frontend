import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Dummy data
const dummyData = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg",
    name: "Women Fit and Flare Brown Dress",
    price: 200,
    size: "medium",
    description: "This is the description of Bag item 1.",
    location: "colombo",
    count: 1,
  },
  {
    id: 2,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70",
    name: "Women Fit and Flare Brown Dress",
    price: 200,
    size: "medium",
    description: "This is the description of Bag item 1.",
    location: "kandy",
    count: 1,
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 5;

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setItems(dummyData); // Simulate API response
    }, 1000);
  }, []);

  // Recalculate subtotal when items change
  useEffect(() => {
    const newSubtotal = items.reduce((total, item) => total + item.price * item.count, 0);
    setSubtotal(newSubtotal);
  }, [items]);

  // Handle count change
  const handleCountChange = (id, newCount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
  };

  // Handle removing an item
  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return <div>No items available.</div>;
  }

  return (
    <Box padding="16px">
      {/* Cart Items Table */}
      <TableContainer component={Paper} sx={{ marginBottom: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      size="small"
                      onClick={() =>
                        handleCountChange(item.id, Math.max(1, item.count - 1))
                      }
                    >
                      -
                    </Button>
                    <Typography>{item.count}</Typography>
                    <Button
                      size="small"
                      onClick={() => handleCountChange(item.id, item.count + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  ${item.price * item.count}
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="black"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{
                          backgroundColor: "black", 
                          color: "white", // Make the text white
                          "&:hover": {
                            backgroundColor: "darkgray", // Hover effect with dark gray background
                          },
                        }}
                      >
                        Remove
                 </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cart Totals Section */}
      <Paper
        elevation={3}
        sx={{
          flex: 0.4, // Increased width for cart totals
          p: 6, // Padding as per the requested style
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: "400px",
          marginLeft: "0", // Align to the left
        }}
      >
        <Typography
          variant="h5"
          sx={{ borderBottom: "1px solid #ccc", paddingBottom: "12px" }}
          gutterBottom
        >
          Cart Totals
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Delivery Fee:</Typography>
          <Typography>${deliveryFee}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="bold"
        >
          <Typography>Total:</Typography>
          <Typography>${subtotal + deliveryFee}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#ff4500",
            "&:hover": {
              backgroundColor: "#e63900",
            },
            alignSelf: "center",
            marginTop: "16px",
          }}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default ShoppingCart;

