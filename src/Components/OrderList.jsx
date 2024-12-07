// Imports
import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  Chip,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import NavigationBar from "../Components/NavigationBar";
import Sidebar from "../Components/Sidebar";

// Main Component
const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      product: "Button Down Maxi Dress",
      price: 89.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Casual Chic Dress",
      price: 129.99,
      date: "2024-01-12",
      status: "pending",
      isEditable: false,
    },
  ]);

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, isEditable: true } : order
      )
    );
  };

  const handleReject = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "rejected" } : order
      )
    );
  };

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, isEditable: false }
          : order
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "warning",
      processing: "success",
      shipped: "primary",
      rejected: "error",
    };
    return colors[status];
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onNavigate={() => {}} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f4f4",
          p: 3,
        }}
      >
        <NavigationBar onLogout={() => {}} />
        <Typography variant="h4" gutterBottom>
          Order List
        </Typography>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>${order.price.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {order.isEditable ? (
                          <Select
                            size="small"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e)}
                            sx={{ minWidth: 120 }}
                          >
                            <MenuItem value="processing">Processing</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                          </Select>
                        ) : (
                          <Chip
                            label={order.status.toUpperCase()}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ borderRadius: "16px" }}
                            onClick={() =>
                              order.status !== "rejected" &&
                              handleAccept(order.id)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.status === "pending" && (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleAccept(order.id)}
                              sx={{ mr: 1 }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleReject(order.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderList;
