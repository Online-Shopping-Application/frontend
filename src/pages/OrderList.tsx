import React, { useState } from 'react';
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
  SelectChangeEvent,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Order {
  id: number;
  customerName: string;
  product: string;
  price: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'rejected';
  isEditable: boolean;
}

const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'John Doe',
      product: 'Button Down Maxi Dress',
      price: 89.99,
      date: '2024-01-12',
      status: 'pending',
      isEditable: false,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      product: 'Casual Chic Dress',
      price: 129.99,
      date: '2024-01-12',
      status: 'pending',
      isEditable: false,
    },
  ]);

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, isEditable: true } : order
      )
    );
  };

  const handleReject = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: 'rejected', isEditable: false }
          : order
      )
    );
  };

  const handleStatusChange = (orderId: number, event: SelectChangeEvent) => {
    const newStatus = event.target.value as Order['status'];
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, isEditable: false }
          : order
      )
    );
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'warning',
      processing: 'success',
      shipped: 'primary',
      rejected: 'error',
    } as const;
    return colors[status];
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
        />
      </Box>

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
                  <TableRow
                    key={order.id}
                    sx={{ opacity: order.status === 'rejected' ? 0.5 : 1 }}
                  >
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {order.isEditable && order.status !== 'rejected' ? (
                        <Select
                          size="small"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e)}
                          onBlur={() =>
                            setOrders((prevOrders) =>
                              prevOrders.map((o) =>
                                o.id === order.id ? { ...o, isEditable: false } : o
                              )
                            )
                          }
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
                          sx={{ borderRadius: '16px', cursor: order.status !== 'rejected' ? 'pointer' : 'default' }}
                          onClick={() => {
                            if (order.status !== 'rejected') {
                              setOrders(
                                orders.map((o) =>
                                  o.id === order.id ? { ...o, isEditable: true } : o
                                )
                              );
                            }
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.status === 'pending' && (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleAccept(order.id)}
                            disabled={order.isEditable}
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
  );
};

export default OrderList;
