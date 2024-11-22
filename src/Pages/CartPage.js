import React, { useState } from "react";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import NavBar from "../Components/Utils/NavBar";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import CartItem from "../Components/Cart/CartItem";
import Footer from "../Components/Utils/Footer";
import { BlackBigButton } from "../Components/Utils/Buttons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CartPage = () => {
  const [subtotal, setSubtotal] = useState(360); // Example subtotal (sum of items' prices)
  const shippingCost = 20; // Fixed shipping cost
  const discount = 50; // Example discount
  const total = subtotal + shippingCost - discount; // Calculate total

  return (
    <div>
      <StyledBox
        sx={{
          minHeight: "calc(100vh - 40px)",
        }}
        innerSx={{
          paddingBottom: "10px",
          backgroundColor: "bgSoft.main",
          height: "100%",
        }}
      >
        <NavBar />
        <Container>
          <Box
            sx={{
              backgroundColor: "white",
              minHeight: "80%",
              my: "40px",
              borderRadius: "32px",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="title" textAlign="left" mx={2}>
              Cart
            </Typography>

            <Divider sx={{ my: 2 }} />
            {/* Cart Items */}
            <Box>
              <CartItem />
              <CartItem />
              <CartItem />
            </Box>
            {/* Summary Section */}
            <Box sx={{ mt: 4, px: 2 }}>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2} alignItems="flex-end" mx={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body1" align="right" sx={{ flex: 1 }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" align="right" sx={{ flex: 0.5 }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Stack>
                {/* Shipping */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body1" align="right" sx={{ flex: 1 }}>
                    Shipping
                  </Typography>
                  <Typography variant="body1" align="right" sx={{ flex: 0.5 }}>
                    ${shippingCost.toFixed(2)}
                  </Typography>
                </Stack>
                {/* Discounts */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body1" align="right" sx={{ flex: 1 }}>
                    Discount
                  </Typography>
                  <Typography variant="body1" align="right" sx={{ flex: 0.5 }}>
                    -${discount.toFixed(2)}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2, width: "100%" }} />
                {/* Total */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    align="right"
                    sx={{ flex: 1 }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    align="right"
                    sx={{ flex: 0.5 }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "flex-end", px: 4 }}
            >
              <BlackBigButton
                text={
                  <Box display="flex" alignItems="center">
                    Proceed To Checkout
                    <ArrowForwardIcon sx={{ ml: 1 }} />
                  </Box>
                }
                sx={{ width: "250px", marginBottom: "40px" }}
              />
            </Box>
          </Box>
        </Container>
      </StyledBox>
      <Footer />
    </div>
  );
};

export default CartPage;
