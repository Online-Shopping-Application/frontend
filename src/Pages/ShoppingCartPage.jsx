// import React, { useState } from 'react';
// import ShoppingCart from "../Components/ShoppingCart";
// import SelectItem from '../Components/SelectItem';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button } from "@mui/material";

// const ShoppingCartPage = () => {

//   const [selectedProducts, setSelectedProducts] = useState([]);

 
//     const navigate = useNavigate();
  
//     const handleData = () => {
//       navigate('/shopping-page', { state: { selectedProducts } });
//     };
  
//     return (
//       <>
//         <ShoppingCart />
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
//           <Button
//             onClick={handleData}
//             variant="contained"
//             sx={{
//               backgroundColor: "black",
//               color: "white",
//               width: "20%",
//               padding: "12px",
//               borderRadius: "4px",
//               "&:hover": {
//                 backgroundColor: "#333",
//                 }
//             }}
//             >
//               Checkout
//             </Button>
//           </Box>
//       </>
//     );
//   };
//   export default ShoppingCartPage;


import React, { useState } from 'react';
import ShoppingCart from "../Components/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import { Box, Button } from "@mui/material";

const ShoppingCartPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleData = () => {
    navigate('/shopping-page', { state: { selectedProducts } });
  };

  return (
    <>
      <ShoppingCart selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button
          onClick={handleData}
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "20%",
            padding: "12px",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default ShoppingCartPage;
