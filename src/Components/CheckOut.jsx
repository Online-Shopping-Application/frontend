import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
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
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(address)}
                  sx={{
                    textTransform: "none",
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": {
                      borderColor: "#333",
                      color: "#333",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  Delete
                </Button>
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
          variant="contained"
          fullWidth
          onClick={handleAddAddress}
          sx={{
            textTransform: "none",
            backgroundColor: "#000",
            color: "#fff",
            marginTop: 2,
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          {editingId ? "Save Changes" : "Add New Address"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckOut;
