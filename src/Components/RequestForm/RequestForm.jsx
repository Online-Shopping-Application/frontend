import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid,  Button, Box } from '@mui/material';

const products = [
  {
    id: "P001",
    imageUrl: 'https://styleunion.in/cdn/shop/products/JGPF00037RED_1_ecca3ce8-dca8-4ad4-be3d-aab7ae0d57a3.jpg?v=1704717803&width=1200',
    name: 'Girls Regular Fit Printed Frock',
    price: '$200',
    category: 'Kids frock',
    description: 'This is the description of kids frock. It provides more details about the product.',
    sellerId: "S001",
    sellerName: "Seller One"
  },
  {
    id: " P006",
    imageUrl: 'https://finebrandz.lk/cdn/shop/products/23P3089C5786I---20B_700x.jpg?v=1680065771',
    name: 'Plane Color Crew Neck T shirts ( Mal Material )',
    price: '$200',
    category: 'Casual Wear',
    description: 'This is the description of T shirt. It provides more details about the product.',
    sellerId: "S004",
    sellerName: "Seller Four"
  },
  {
    id: "P013",
    imageUrl: 'https://shop.mango.com/assets/rcs/pics/static/T6/fotos/S/67010664_56_B.jpg?imwidth=2048&imdensity=1&ts=1699263210956',
    name: 'Cotton cargo trousers',
    price: '$200',
    category: 'Mens trouser',
    description: 'This is the description of trouser. It provides more details about the product.',
    sellerId: "S011",
    sellerName: "Seller Three"
  },
]

function RequestForm() {
  
  const handleAccept = (productId) => {
    console.log(`Accepted product with ID: ${productId}`);
  };

  const handleReject = (productId) => {
    console.log(`Rejected product with ID: ${productId}`);
  };

  return (
    <Grid container spacing={5} direction="column">
      {products.map((product) => (
        <Grid item key={product.id}>
          <Card>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  sx={{ height: '250px', objectFit: 'cover' }}
                  image={product.imageUrl}
                  alt={product.name}
                />
              </Grid>
              <Grid item xs={8}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="div">
                  {product.id} - {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                  > Seller ID: {product.sellerId}
                  </Typography>
                  <Typography
                    variant="body2"
                  > Seller Name: {product.sellerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, marginTop: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': { backgroundColor: '#333' },
                      }}
                      onClick={() => handleAccept(product.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'red',
                        color: 'white',
                        '&:hover': { backgroundColor: '#b71c1c' },
                      }}
                      onClick={() => handleReject(product.id)}
                    >
                      Reject
                    </Button>
                    </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default RequestForm;