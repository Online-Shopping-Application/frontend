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
    description:
      "This is the description of Bag item 1. It could be longer or shorter.",
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
    description:
      "This is the description of Bag item 1. It could be longer or shorter.",
    location: "kandy",
    count: 1,
  },
  {
    id: 3,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s",
    name: "Women Fit and Flare Brown Dress",
    price: 200,
    size: "medium",
    description:
      "This is the description of Bag item 1. It could be longer or shorter.",
    location: "colombo",
    count: 3,
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/736x/36/c1/67/36c1670a949b15963dfeb70f6d0df481.jpg",
    name: "Women Fit and Flare Brown Dress",
    price: 90,
    size: "Large",
    description:
      "This is the description of Bag item 2. It provides more details about the product.",
    location: "Jaffna",
    count: 1,
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setItems(dummyData); // Simulate API response
    }, 1000);
  }, []);

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
    <TableContainer component={Paper}>
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
                        {/* Quantity Selector */}
                        <Button
                        size="small"
                        onClick={() =>
                            handleCountChange(item.id, Math.max(1, item.count - 1))
                        }
                        sx={{
                            minWidth: "30px",
                            padding: "4px",
                            fontSize: "16px",
                            color: "#000",
                            backgroundColor: "transparent",
                            "&:hover": {
                            backgroundColor: "transparent",
                            },
                            boxShadow: "none",
                        }}
                        >
                        -
                        </Button>
                        <Typography
                        variant="body1"
                        style={{
                            margin: "0 8px",
                            textAlign: "center",
                            minWidth: "30px",
                        }}
                        >
                        {item.count}
                        </Typography>
                        <Button
                        size="small"
                        onClick={() =>
                            handleCountChange(item.id, item.count + 1)
                        }
                        sx={{
                            minWidth: "30px",
                            padding: "4px",
                            fontSize: "16px",
                            color: "#000",
                            backgroundColor: "transparent",
                            "&:hover": {
                            backgroundColor: "transparent",
                            },
                            boxShadow: "none",
                        }}
                        >
                        +
                        </Button>
                    </Box>
                    </TableCell>
              <TableCell>{`$${item.price * item.count}`}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell style={{ maxWidth: "150px" }}>
                {item.description}
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingCart;
