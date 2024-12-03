import React, { useState } from 'react';
import {
 Box, Paper, Table, TableBody, TableCell, TableContainer,
 TableHead, TableRow, TablePagination, Button, Typography,
 Chip, TextField, Dialog, DialogTitle, DialogContent,
 DialogActions
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const RefundRequestPage = () => {
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [searchTerm, setSearchTerm] = useState('');
 const [confirmDialog, setConfirmDialog] = useState({
   open: false,
   requestId: null,
   action: null
 });

 const [refundRequests, setRefundRequests] = useState([
   {
     id: 1,
     orderId: "ORD-001",
     customerName: "John Doe", 
     product: "Button Down Maxi Dress",
     amount: 89.99,
     reason: "Wrong size",
     date: "2024-01-12",
     status: "pending"
   },
   {
     id: 2,
     orderId: "ORD-002", 
     customerName: "Jane Smith",
     product: "Casual Chic Dress",
     amount: 129.99,
     reason: "Damaged product", 
     date: "2024-01-12",
     status: "pending"
   },
 ]);

 const filteredRequests = refundRequests.filter(request =>
   request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
   request.orderId.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const handleConfirmDialogOpen = (requestId, action) => {
   setConfirmDialog({ open: true, requestId, action });
 };

 const handleConfirmDialogClose = () => {
   setConfirmDialog({ open: false, requestId: null, action: null });
 };

 const handleStatusUpdate = () => {
   if (confirmDialog.requestId && confirmDialog.action) {
     setRefundRequests((prevRequests) =>
       prevRequests.map((request) =>
         request.id === confirmDialog.requestId
           ? { ...request, status: confirmDialog.action === 'approve' ? 'approved' : 'rejected' }
           : request
       )
     );
   }
   handleConfirmDialogClose();
 };

 const getStatusColor = (status) => {
   const colors = {
     pending: 'warning',
     approved: 'success',
     rejected: 'error',
   };
   return colors[status];
 };

 return (
   <Box>
     <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>Refund Requests</Typography>
     
     <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
       <TextField
         size="small"
         placeholder="Search by order ID or customer name..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         InputProps={{
           startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
         }}
         sx={{ width: 300 }}
       />
     </Box>

     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
       <TableContainer>
         <Table stickyHeader>
           <TableHead>
             <TableRow>
               <TableCell>Request ID</TableCell>
               <TableCell>Order ID</TableCell>
               <TableCell>Customer</TableCell>
               <TableCell>Product</TableCell>
               <TableCell>Amount</TableCell>
               <TableCell>Reason</TableCell>
               <TableCell>Date</TableCell>
               <TableCell>Status</TableCell>
               <TableCell>Actions</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {filteredRequests
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((request) => (
                 <TableRow key={request.id} hover>
                   <TableCell>#{request.id}</TableCell>
                   <TableCell>{request.orderId}</TableCell>
                   <TableCell>{request.customerName}</TableCell>
                   <TableCell>{request.product}</TableCell>
                   <TableCell>${request.amount.toFixed(2)}</TableCell>
                   <TableCell>{request.reason}</TableCell>
                   <TableCell>{request.date}</TableCell>
                   <TableCell>
                     <Chip 
                       label={request.status.toUpperCase()} 
                       color={getStatusColor(request.status)}
                       size="small"
                     />
                   </TableCell>
                   <TableCell>
                     {request.status === 'pending' && (
                       <>
                         <Button
                           variant="contained"
                           color="primary"
                           size="small"
                           onClick={() => handleConfirmDialogOpen(request.id, 'approve')}
                           sx={{ mr: 1 }}
                         >
                           Approve
                         </Button>
                         <Button
                           variant="outlined"
                           color="error"
                           size="small"
                           onClick={() => handleConfirmDialogOpen(request.id, 'reject')}
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
         rowsPerPageOptions={[10, 25, 50]}
         component="div"
         count={filteredRequests.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={(_, newPage) => setPage(newPage)}
         onRowsPerPageChange={(event) => {
           setRowsPerPage(parseInt(event.target.value, 10));
           setPage(0);
         }}
       />
     </Paper>

     <Dialog open={confirmDialog.open} onClose={handleConfirmDialogClose}>
       <DialogTitle>
         {confirmDialog.action === 'approve' ? 'Approve Refund Request' : 'Reject Refund Request'}
       </DialogTitle>
       <DialogContent>
         <Typography>
           Are you sure you want to {confirmDialog.action} this refund request?
         </Typography>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleConfirmDialogClose} color="inherit">
           Cancel
         </Button>
         <Button 
           onClick={handleStatusUpdate}
           variant="contained"
           color={confirmDialog.action === 'approve' ? 'primary' : 'error'}
         >
           Confirm {confirmDialog.action}
         </Button>
       </DialogActions>
     </Dialog>
   </Box>
 );
};

export default RefundRequestPage;