

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CheckOut = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Robert Fox",
      mobileNumber: "123 456 7890",
      houseNo: "4517 Washington Ave.",
      area: "Manchester",
      city: "Kentucky",
      state: "Kentucky",
      postalCode: "39495",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    houseNo: "",
    area: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAddress = () => {
    if (editingId) {
      setAddresses(
        addresses.map((address) =>
          address.id === editingId ? { ...formData, id: editingId } : address
        )
      );
      setEditingId(null);
    } else {
      const newAddress = {
        id: addresses.length + 1,
        ...formData,
      };
      setAddresses([newAddress, ...addresses]);
    }
    setFormData({
      name: "",
      mobileNumber: "",
      houseNo: "",
      area: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData(address);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <Grid container spacing={4} sx={{ margin: 0, width: "100%", padding: 0 }}>
      {/* Address List */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Shipping Address
        </Typography>
        {addresses.map((address) => (
          <Box
            key={address.id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 1,
              padding: 2,
              marginBottom: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {address.name}
                </Typography>
                <Typography variant="body2">
                  {address.houseNo}, {address.area}, {address.city}, {address.state},{" "}
                  {address.postalCode}
                </Typography>
              </Box>

              <Box display="flex" gap={1}>
                <Button
                  size="small"
                  onClick={() => handleEdit(address)}
                  sx={{
                    minWidth: 0,
                    padding: 1,
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <EditIcon sx={{ color: "#000" }} />
                </Button>
                <IconButton
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{
                    color: "#000",
                  
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Address Form Section */}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
          Add New Address
        </Typography>
        <Grid container spacing={2}>
          {["name", "mobileNumber", "houseNo", "area"].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
          ))}
          {["city", "state", "postalCode"].map((field, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleAddAddress}
          sx={{
            textTransform: "none",
            borderColor: "#000",
            color: "#000",
            marginTop: 2,
            "&:hover": {
              borderColor: "#333",
              color: "#333",
             
            },
          }}
        >
          {editingId ? "Save Changes" : "Add New Address"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckOut;
