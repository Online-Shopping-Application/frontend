import React from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCart from "../Components/ShoppingCart";
import CheckOut from "../Components/CheckOut";

const ShoppingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Grid container spacing={2}>
        {/* ShoppingCart on the left */}
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: isMobile ? 1 : 2 }}>
            <ShoppingCart />
          </Box>
        </Grid>

        {/* CheckOut on the right */}
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: isMobile ? 1 : 2 }}>
            <CheckOut />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingPage;
