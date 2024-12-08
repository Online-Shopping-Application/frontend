import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box } from '@mui/material';
import axios from 'axios';
import fashionGirlImage from '../../assets/images/fashion-girl.png';
import noRequestImage from '../../assets/images/no-request.jpg'; 

function RequestForm() {
  const [products, setProducts] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/product/unapproved-products');
        setProducts(response.data); // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAccept = async (productId) => {
    const confirmAccept = window.confirm('Are you sure you want to accept this product?');
    if (confirmAccept) {
      try {
        // Send PUT request to approve the product
        const response = await axios.put(`http://localhost:8083/api/product/approve/${productId}`);

        if (response.status === 200) {
          console.log(`Product with ID ${productId} has been approved`);

          // Remove the approved product from the products list
          setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        }
      } catch (error) {
        console.error('Error approving product:', error);
      }
    } else {
      console.log('Product approval canceled');
    }
  };

  const handleReject = async (productId) => {
    const confirmReject = window.confirm('Are you sure you want to reject this product?');
    if (confirmReject) {
      try {
        // Send a request to reject the product if necessary
        const response = await axios.put(`http://localhost:8083/api/product/reject/${productId}`);

        if (response.status === 200) {
          console.log(`Product with ID ${productId} has been rejected`);

          // Optionally, remove the rejected product from the list
          setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        }
      } catch (error) {
        console.error('Error rejecting product:', error);
      }
    } else {
      console.log('Product rejection canceled');
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      {products.length === 0 ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', marginBottom: 40 }}>
            <CardMedia
              component="img"
              sx={{ width: 250, height: 250, objectFit: 'contain'}}
              image={noRequestImage} // Use your 'no request' image here
              alt="No product request"
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
              No Product Requests
            </Typography>
          </Box>
        </Grid>
      ) : (
        products.map((product, index) => (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} key={index}>
            <Card
              sx={{
                width: 1000, // Set card width to 800px
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  height: '100%',
                  objectFit: 'cover',
                }}
                image={product.imgUrl || fashionGirlImage} // Fallback image if none provided
                alt={product.description}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {product.type} - ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  Product ID: {product.productId} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seller ID: {product.sellerId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created Date: {new Date(product.createdDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {product.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      textTransform: 'none',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      '&:hover': { backgroundColor: '#388e3c' },
                    }}
                    onClick={() => handleAccept(product.productId)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      textTransform: 'none',
                      backgroundColor: '#f44336',
                      color: 'white',
                      '&:hover': { backgroundColor: '#d32f2f' },
                    }}
                    onClick={() => handleReject(product.productId)}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default RequestForm;
