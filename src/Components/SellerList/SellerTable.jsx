import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SellerTable() {
  const [sellers, setSellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const navigate = useNavigate();

  // Fetch sellers from backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/getSellers')
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sellers:', error);
      });
  }, []);

  // Toggle account status via API
  const handleToggleAccountStatus = (id, isActive) => {
    const apiUrl = isActive
      ? `http://localhost:8080/api/user/${id}/disable`
      : `http://localhost:8080/api/user/${id}/enable`;

    axios
      .put(apiUrl)
      .then(() => {
        // Log the action
        console.log(`Seller ID: ${id} is now ${isActive ? 'Disabled' : 'Enabled'}`);

        // After API call, reload the seller data to reflect updated statuses
        axios
          .get('http://localhost:8080/api/getSellers')
          .then((response) => {
            setSellers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching updated sellers:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating seller status:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleViewProducts = (id) => {
    navigate(`/product-list/${id}`);
  };

  const filteredSellers = sellers.filter((seller) =>
    (seller.id.toString().includes(searchQuery) || seller.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedSellers = React.useMemo(() => {
    return filteredSellers.sort((a, b) => {
      if (orderBy === 'id') {
        return order === 'asc' ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });
  }, [filteredSellers, order, orderBy]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedSellers.length) : 0;

  const visibleRows = React.useMemo(() => sortedSellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage, sortedSellers]);

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Sellers</h1>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by id or name.."
          sx={{  width: '350px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { height: '40px' },
          }}
        />
      </Box>
      <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 470 ,marginTop: '30px'}}>
  <Table stickyHeader sx={{ minWidth: 1200 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 20 }}> {/* Set width for Seller Id column */}
          <TableSortLabel
            active={orderBy === 'id'}
            direction={orderBy === 'id' ? order : 'asc'}
            onClick={(event) => handleRequestSort(event, 'id')}
          >
            Seller Id
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ width: 30 }}> {/* Set width for Seller Name column */}
          Seller Name
        </TableCell>
        <TableCell sx={{ width: 100 }}> {/* Set width for Email column */}
          Email
        </TableCell>
        <TableCell sx={{ width: 100 }}> {/* Set width for Active column */}
          Active
        </TableCell>
        <TableCell sx={{ width: 200 }}> {/* Set width for Actions column */}
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {visibleRows.map((seller) => (
        <TableRow key={seller.id}>
          <TableCell>{seller.id}</TableCell>
          <TableCell>{seller.name || 'N/A'}</TableCell>
          <TableCell>{seller.email || 'N/A'}</TableCell>
          <TableCell>{seller.active ? 'Active' : 'Inactive'}</TableCell>
          <TableCell>
          <Button
  variant="outlined"
  onClick={() => handleToggleAccountStatus(seller.id, seller.active)}
  sx={{
    backgroundColor: seller.active ? 'red' : 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: seller.active ? 'darkblue' : 'darkred',
    },
    width: '180px',
    marginLeft: '10px', 
  }}
>
  {seller.active ? 'Disable Account' : 'Enable Account'}
</Button>

<Button
  variant="outlined"
  onClick={() => handleViewProducts(seller.id)}
  sx={{
    marginLeft: '10px',
    width: '180px',
  }}
>
  View Products
</Button>

          </TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedSellers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default SellerTable;