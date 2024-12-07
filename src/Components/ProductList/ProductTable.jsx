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
import './ProductTable.css';
import Rating from '@mui/material/Rating';


function createData(id, name, category, price,  rating) {
  return {
    id,
    name,
    category,
    price,
    rating,
  };
}

const rows = [
  createData('P001', 'Product One', 'Tshirt', '$300', 4),
  createData('P002', 'Product Two', 'Casual', '$40', 3),
  createData('P003', 'Product Three', 'Shirts', '$100', 5),
  createData('P004', 'Product Four', 'Saree', '$80', 2),
  createData('P005', 'Product Five', 'Blouse', '$40', 3),
  createData('P006', 'Product Six', 'Skirts', '$400', 5),
  createData('P007', 'Product Seven', 'Trousers', '$800', 6),
  createData('P008', 'Product Eight', 'Casual', '$150', 3),
  createData('P009', 'Product Nine', 'Tshirts', '$230',2),
  createData('P010', 'Product Ten', 'Skirts', '$400',1),
];

function ProductTable() {
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

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

  const handleAccept = (id) => {
    // Handle accept action
    console.log(`Accepted product with id: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Rejected product with id: ${id}`);
  };

  const filteredRows = rows.filter((row) => {
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
    <Box sx={{ width: '100%'}}>
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
      <Paper sx={{ width: '100%'}}>
        <TableContainer sx={{ maxHeight: 470 }}>
          <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} >
            <TableHead>
              <TableRow sx={{ backgroundColor: 'black' }}>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
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
                <TableCell sx={{ paddingLeft: '160px', fontWeight: 'bold',  color: 'white', backgroundColor: 'black'}}>
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
                      
                     
                      <Button className='reject-button' variant="outlined"
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
          count={rows.length}
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