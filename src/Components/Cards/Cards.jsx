import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Stack } from '@mui/material'; // Import Box and other Material UI components
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import "./Cards.css";


export default function Cards() {
  const [userCounts, setUserCounts] = useState({ customers: 0, sellers: 0 });
  const [productCount, setProductCount] = useState(0);
  const [OrderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/counts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserCounts(data);  // Store customers and sellers count
      } catch (error) {
        console.error('Error fetching user counts:', error);
        setError(error.message);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/product/product-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductCount(data);  // Store product count
      } catch (error) {
        console.error('Error fetching product count:', error);
        setError(error.message);
      }
    };

    const fetchOrderCounts = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/product/product-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderCount(data);  
      } catch (error) {
        console.error('Error fetching order counts:', error);
        setError(error.message);
      }
    };

    fetchUserCounts();
    fetchProductCount();
    fetchOrderCounts();
    setLoading(false);  // Once both requests are initiated, change loading state
  }, []);  // Runs once when the component mounts

  // Handling loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cards-container">
      <Box display="flex" flexDirection="row" gap={4}>

        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <PeopleIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{userCounts.customers}</span>
                <br />
                <span className="card-label">Total Customers</span>
              </div>
            </Stack>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <StoreIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{userCounts.sellers}</span>
                <br />
                <span className="card-label">Total Sellers</span>
              </div>
            </Stack>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <InventoryIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{productCount}</span>
                <br />
                <span className="card-label">Total Products</span>
              </div>
            </Stack>
          </CardContent>
        </Card>
        
        <Card className="card">
          <CardContent>
            <Stack spacing={2} direction="row">
              <InventoryIcon className="icon" />
              <div className="card-text">
                <span className="card-number">{OrderCount}</span>
                <br />
                <span className="card-label">Total orders</span>
              </div>
            </Stack>
          </CardContent>
        </Card>

      </Box>
    </div>
  );
}