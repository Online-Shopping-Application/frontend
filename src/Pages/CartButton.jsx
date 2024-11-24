
// import React, { useState } from 'react';
// import AddToCartButton from '../Components/AddToCartButton';

// const CartButton = () => {
//     const [cartCount, setCartCount] = useState(0);

//     const handleAddToCart = () => {
//       setCartCount(cartCount + 1);
//       console.log("Item added to cart!");
//     };
  
//     return (
//       <div style={{ padding: '20px' }}>
//         <h1>Shopping App</h1>
//         <p>Items in Cart: {cartCount}</p>
//         <AddToCartButton onClick={handleAddToCart} />
//       </div>
//     );
// }

// export default CartButton

import React, { useState } from 'react';
import AddToCartButton from '../Components/AddToCartButton';

const CartButton = () => {
  const [cartCount, setCartCount] = useState(0);

  // Handle adding items to cart
  const handleAddToCart = (quantity) => {
    setCartCount(cartCount + quantity);
    console.log(`${quantity} item(s) added to cart!`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping App</h1>
      <p>Items in Cart: {cartCount}</p>
      <AddToCartButton onAddToCart={handleAddToCart} />
    </div>
  );
};

export default CartButton;

