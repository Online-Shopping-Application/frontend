import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import './Cards.css'; 

export default function Cards() {
  const totalCustomers = 5000;
  const totalOrders = 12000;
  const totalSellers = 3000;
  const totalProducts = 45000;

  return (
    <div className="cards-container">
      <Box display="flex" flexDirection="row" gap={4}>
      <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <ShoppingCartIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{totalOrders}</span>
                <br />
                <span className="card-label">Total Orders</span>
              </div>
            </Stack>
          </CardContent>
        </Card>


        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <InventoryIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{totalProducts}</span>
                <br />
                <span className="card-label">Total Products</span>
              </div>
            </Stack>
          </CardContent>
        </Card>


        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <PeopleIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{totalCustomers}</span>
                <br />
                <span className="card-label">Total Registered Customers</span>
              </div>
            </Stack>
          </CardContent>
        </Card>


        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <StoreIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{totalSellers}</span>
                <br />
                <span className="card-label">Total Registered Sellers</span>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
