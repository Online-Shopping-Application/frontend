import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
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
      // Save edited address
      setAddresses(
        addresses.map((address) =>
          address.id === editingId ? { ...formData, id: editingId } : address
        )
      );
      setEditingId(null);
    } else {
      // Add new address
      const newAddress = {
        id: addresses.length + 1,
        ...formData,
      };
      setAddresses([newAddress, ...addresses]); // Add new address to the top
    }

    // Reset form fields
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
    setFormData(address); // Populate the form with address details
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const calculateTotal = () => {
    return 50; // Replace with dynamic calculation if needed
  };

  return (

    
    <Grid container spacing={4} justifyContent="" padding={10}>
      
      {/* Address List */}
      <Grid item xs={8}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
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
                justifyContent: "space-between",
                alignItems: "center",
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
                    borderColor: "#000", // Edit button border color black
                    color: "#000", // Edit button text color black
                    "&:hover": {
                      borderColor: "#333", // Darker border on hover
                      color: "#333", // Darker text on hover
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
      <Grid item xs={8}>
        <Typography variant="h6" sx={{ marginBottom: 4 ,}}>
          Add new address
        </Typography>

        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Flat, House no., Building, Company, Apartment"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Area, Colony, Street, Sector, Village"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
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

      {/* Summary Section */}
      <Grid item xs={4}>
        <Box sx={{ border: "1px solid #ddd", padding: 2, borderRadius: 1 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between",marginBottom: 2  }}
          >
            <Typography>Subtotal</Typography>
            <Typography>${calculateTotal().toFixed(2)}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}
          >
            <Typography>Delivery Charge</Typography>
            <Typography>$5.00</Typography>
          </Box>

          <Divider sx={{ marginBottom: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 3,
            }}
          >
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="h6">${(calculateTotal() + 5).toFixed(2)}</Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              backgroundColor: "#000",
              color: "#fff",
              height: 40,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Place Order
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CheckOut;
