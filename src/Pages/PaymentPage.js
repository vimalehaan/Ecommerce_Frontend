import React from "react";
import { Container, Paper, Typography, Divider } from "@mui/material";
import NavBar from "../Components/Utils/NavBar";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../Components/Payment/PaymentForm"; // Import PaymentForm component
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51P4oPJ1OuO8iFaOrgbO8LjpEb1zFgbnR4iCIsxbwAALLYlxoof5C3JV1cty9SqhYTUbzFjOap8S7ZTtzt2R5GDQk00MFNtTDZ5"
);

const PaymentPage = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f9" }}>
      <NavBar />
      <Container
        maxWidth="sm"
        style={{ marginTop: "40px", marginBottom: "20px" }}
      >
        <Paper elevation={3} style={{ padding: "32px", borderRadius: "16px" }}>
          <Typography
            variant="title"
            fontWeight="bold"
            align="center"
            style={{ marginBottom: "24px", color: "black" }}
          >
            Payment Page
          </Typography>
          <Divider style={{ marginBottom: "24px" }} />
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentPage;
