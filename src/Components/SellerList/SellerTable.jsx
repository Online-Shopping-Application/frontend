import React from 'react';
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
import './SellerTable.css';


function createData(id, name, email) {
  return {
    id,
    name,
    email,
  };
}

const rows = [
  createData('S001', 'Seller One', 'seller1@example.com'),
  createData('S002', 'Seller Two', 'seller2@example.com'),
  createData('S003', 'Seller Three', 'seller3@example.com'),
  createData('S004', 'Seller Four', 'seller4@example.com'),
  createData('S005', 'Seller Five', 'seller5@example.com'),
  createData('S006', 'Seller Six', 'seller6@example.com'),
  createData('S007', 'Seller Three', 'seller3@example.com'),
  createData('S008', 'Seller Four', 'seller4@example.com'),
  createData('S009', 'Seller Five', 'seller5@example.com'),
  createData('S010', 'Seller Six', 'seller6@example.com'),
  createData('S011', 'Seller Five', 'seller5@example.com'),
  createData('S012', 'Seller Six', 'seller6@example.com'),
];

function SellerTable() {
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const navigate = useNavigate();

  const [accountStatus, setAccountStatus] = React.useState(
    rows.reduce((acc, row) => {
      acc[row.id] = 'Disable Account';
      return acc;
    }, {})
  );


  const handleToggleAccountStatus = (id) => {
    setAccountStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === 'Disable Account' ? 'Enable Account' : 'Disable Account',
    }));
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
    navigate(`/ProductList/${id}`); // Navigate to the product table with the seller ID
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.id.toString().includes(searchQuery) ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h1>Sellers</h1>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by id or name.."
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
          <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} >
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
                    Seller Id
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Seller Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Email
                </TableCell>
                <TableCell sx={{ paddingLeft: '320px', fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `seller-checkbox-${row.id}`;

                return (
                  <TableRow key={row.id} selected={isItemSelected}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        className='disable-account-button'
                        variant="outlined"
                        onClick={() => handleToggleAccountStatus(row.id)}
                      >
                        {accountStatus[row.id]}
                      </Button>
                      <Box sx={{ width: 10 }} /> {/* Add space between buttons */}
                      <Button className='view-products-button' variant="outlined" onClick={() => handleViewProducts(row.id)}>
                        View Products
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

export default SellerTable;