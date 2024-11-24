

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddToCartButton = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  // Handle increment and decrement of quantity
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Quantity Selector */}
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="8px"
        padding="4px 8px"
      >
        <IconButton size="small" onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" style={{ margin: '0 8px' }}>
          {quantity}
        </Typography>
        <IconButton size="small" onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddToCart(quantity)}
        sx={{
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default AddToCartButton;

