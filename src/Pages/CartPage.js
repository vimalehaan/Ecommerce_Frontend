import React, { useEffect, useState } from "react";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import NavBar from "../Components/Utils/NavBar";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import CartItem from "../Components/Cart/CartItem";
import Footer from "../Components/Utils/Footer";
import { BlackBigButton } from "../Components/Utils/Buttons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getCartItems } from "../Actions/CartAction";
import { useSelector } from "react-redux";

const CartPage = () => {
  const shipping = 0; // Dynamic shipping cost
  const userId = useSelector((state) => state.auth.user); // Get userId from Redux
  const [cartProducts, setCartProducts] = useState([]); // State to hold cart items
  const [subtotal, setSubtotal] = useState(0); // Subtotal calculated dynamically
  const [total, setTotal] = useState(0); // Total calculated dynamically
  const [changed, setChanged] = useState(0); // Total calculated dynamically

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await getCartItems(userId); // Call the function
          console.log(response);
          setCartProducts(response); // Update the state with cart items
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      }
    };

    fetchCartItems(); // Invoke the function inside useEffect
  }, [userId, changed]); // Dependency on userId

  useEffect(() => {
    if (cartProducts.length === 0) {
      setSubtotal(0);
      setTotal(0);
    } else {
      let newSubtotal = 0;
      cartProducts.forEach((product) => {
        newSubtotal += product.productPrice * product.quantity; // Assuming `quantity` is in the product object
      });

      const newTotal = newSubtotal + shipping; // Calculate total
      setSubtotal(newSubtotal);
      setTotal(newTotal);
    }
  }, [cartProducts]); // Recalculate when cartProducts changes

  const onDelete = () => {
    setChanged(changed + 1);
  };

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
            <Typography
              variant="title"
              textAlign="left"
              mx={2}
              fontWeight={"bold"}
            >
              Cart
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Map over cartProducts and pass to CartItem */}
            <Box>
              {cartProducts && cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <CartItem
                    key={product.id}
                    CartProduct={product}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <h6>No products in the cart.</h6>
              )}
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
                    ${shipping.toFixed(2)}
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
