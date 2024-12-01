import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import NavBar from "../Components/Utils/NavBar";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import ShippingForm from "../Components/ShippingDetails/ShippingForm";
import ShippingOrderItem from "../Components/ShippingDetails/ShippingOrderItem";
import Footer from "../Components/Utils/Footer";
import { useSelector } from "react-redux";
import { getCartItems } from "../Actions/CartAction";

const ShippingPage = () => {
  const [shippingCost] = useState(20); // Dynamic shipping cost can be set from user location
  const [discount] = useState(10); // Discount can be calculated dynamically
  const userId = useSelector((state) => state.auth.user); // Get userId from Redux

  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  ); // Get selected Cart Items from Redux

  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]); // Default value is an empty array

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await getCartItems(userId); // Fetch cart items
          console.log(response);
          setProducts(response); // Set the products state with the fetched response

          // Filter products if both selectedCartItems and products are available
          const newFilteredProducts =
            response && response.length > 0
              ? response.filter((product) =>
                  selectedCartItems.includes(product.productId)
                )
              : [];

          console.log("Filtered Products:", newFilteredProducts);
          setFilteredProducts(newFilteredProducts); // Update filteredProducts state
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      }
    };

    fetchCartItems(); // Invoke the function inside useEffect
  }, [userId, selectedCartItems]); // Dependency array

  const subtotal =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts.reduce(
          (acc, product) => acc + product.productPrice * 1,
          0
        )
      : 0;

  const total = subtotal + shippingCost - discount;

  const handleFormSubmit = () => {
    // Save formData in localStorage as a JSON string
    localStorage.setItem("OrderedProducts", JSON.stringify(filteredProducts));
    localStorage.setItem("total", JSON.stringify(total));
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
          <Grid container spacing={3} sx={{ my: 5 }}>
            {/* Left: Shipping Details Form */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: "30px",
                }}
              >
                <ShippingForm handleSubmit={handleFormSubmit} />
              </Box>
            </Grid>

            {/* Right: Product Summary */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "white", // Set background color to white behind the order summary
                  borderRadius: "32px",
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Typography
                  variant="title"
                  textAlign="left"
                  fontSize={"24px"}
                  fontWeight={"bold"}
                >
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Order Items */}
                {filteredProducts && filteredProducts.length > 0
                  ? filteredProducts.map((product) => (
                      <ShippingOrderItem
                        key={product.productId}
                        image={product.productImg[0]}
                        title={product.productName}
                        quantity={1}
                        price={product.productPrice}
                      />
                    ))
                  : ""}

                <Divider />

                <Stack spacing={2} alignItems="flex-start" mx={4}>
                  {" "}
                  {/* alignItems changed to flex-start */}
                  {/* Subtotal */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="body1" align="left" sx={{ flex: 1 }}>
                      {" "}
                      {/* align changed to left */}
                      Subtotal
                    </Typography>
                    <Typography
                      variant="body1"
                      align="right"
                      sx={{ flex: 0.5 }}
                    >
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </Stack>
                  {/* Shipping */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="body1" align="left" sx={{ flex: 1 }}>
                      {" "}
                      {/* align changed to left */}
                      Shipping
                    </Typography>
                    <Typography
                      variant="body1"
                      align="right"
                      sx={{ flex: 0.5 }}
                    >
                      ${shippingCost.toFixed(2)}
                    </Typography>
                  </Stack>
                  {/* Discount */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="body1" align="left" sx={{ flex: 1 }}>
                      {" "}
                      {/* align changed to left */}
                      Discount
                    </Typography>
                    <Typography
                      variant="body1"
                      align="right"
                      sx={{ flex: 0.5 }}
                    >
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
                      align="left"
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
      <Footer />
    </div>
  );
};

export default ShippingPage;
