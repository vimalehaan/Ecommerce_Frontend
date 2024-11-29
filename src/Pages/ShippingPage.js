import React, { useState } from "react";
import { Box, Container, Typography, Divider, Grid, Paper, Stack } from "@mui/material";
import NavBar from "../Components/Utils/NavBar";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import ShippingForm from "../Components/ShippingDetails/ShippingForm";
import ShippingOrderItem from "../Components/ShippingDetails/ShippingOrderItem";
import Footer from "../Components/Utils/Footer";

const ShippingPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      title: "T-shirt with multiple colors",
      quantity: 1,
      price: 39.0,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      title: "Winter Jacket",
      quantity: 2,
      price: 79.0,
    },
  ]);

  const [shippingCost] = useState(20); // Dynamic shipping cost can be set from user location
  const [discount] = useState(10); // Discount can be calculated dynamically

  const updateProductQuantity = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const total = subtotal + shippingCost - discount;

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
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
                  padding: "16px",
                }}
              >
                <ShippingForm onSubmit={handleFormSubmit} />
              </Box>
            </Grid>

            {/* Right: Product Summary */}
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  backgroundColor: "white",  // Set background color to white behind the order summary
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Typography variant="h5" textAlign="left">
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Order Items */}
                {products.map((product) => (
                  <ShippingOrderItem
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    quantity={product.quantity}
                    price={product.price}
                    onQuantityChange={(newQuantity) =>
                      updateProductQuantity(product.id, newQuantity)
                    }
                  />
                ))}

                <Divider />

                <Stack spacing={2} alignItems="flex-start" mx={4}> {/* alignItems changed to flex-start */}
  {/* Subtotal */}
  <Stack
    direction="row"
    justifyContent="space-between"
    sx={{ width: "100%" }}
  >
    <Typography variant="body1" align="left" sx={{ flex: 1 }}> {/* align changed to left */}
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
    <Typography variant="body1" align="left" sx={{ flex: 1 }}> {/* align changed to left */}
      Shipping
    </Typography>
    <Typography variant="body1" align="right" sx={{ flex: 0.5 }}>
      ${shippingCost.toFixed(2)}
    </Typography>
  </Stack>

  {/* Discount */}
  <Stack
    direction="row"
    justifyContent="space-between"
    sx={{ width: "100%" }}
  >
    <Typography variant="body1" align="left" sx={{ flex: 1 }}> {/* align changed to left */}
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
