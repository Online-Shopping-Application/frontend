
import * as React from 'react';
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
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductTable.css';

function ProductTable() {
  const { id: sellerId } = useParams(); // Get sellerId from the URL
  const [products, setProducts] = React.useState([]);
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

  // Fetch data from API
  React.useEffect(() => {
    if (sellerId) {
      axios.get(`http://localhost:8080/api/products/user/${sellerId}`)
        .then(response => {
          setProducts(response.data); // Assuming API response is an array of products
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [sellerId]); // Re-fetch data if sellerId changes

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
  const handleReject = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      // Make a DELETE request to the backend API
      axios.delete(`http://localhost:8080/api/products/${id}`)
        .then((response) => {
          console.log(`Product with ID: ${id} has been removed.`);
        
          setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        })
        .catch((error) => {
          console.error('Error removing product:', error);
        });
    }
  };
  

  const filteredRows = products.filter((row) => {
    return (
      row.id.toString().includes(searchQuery) ||
      row.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedRows = React.useMemo(() => {
    return filteredRows.sort((a, b) => {
      if (orderBy === 'id') {
        return order === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [filteredRows, order, orderBy]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;

  const visibleRows = React.useMemo(() => sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage, sortedRows]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Products</h1>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by id or category.."
          sx={{ marginTop: '20px', width: '350px' }}
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
        <TableContainer sx={{ maxHeight: 470 }}>
          <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'black' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'id')}
                    sx={{
                      color: 'white',
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                      '&.MuiTableSortLabel-root': {
                        color: 'white',
                      },
                    }}
                  >
                    Product Id
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Product Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Category
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Price ($)
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Rating
                </TableCell>
                <TableCell sx={{ paddingLeft: '160px', fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `product-checkbox-${row.id}`;

                return (
                  <TableRow key={row.id} selected={isItemSelected}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Rating name={`rating-${row.id}`} value={row.rating} readOnly />
                    </TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        className="reject-button"
                        variant="outlined"
                        onClick={() => handleReject(row.id)}
                      >
                        Remove product
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ProductTable;