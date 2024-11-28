import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements are not loaded.");
      return;
    }

    setIsProcessing(true);

    // Log elements and cardElement to check if CardElement is correctly initialized
    console.log("Stripe Elements initialized:", elements);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card Element not found");
      setIsProcessing(false);
      return;
    }

    // Log cardElement to ensure it's properly initialized
    console.log("Card Element:", cardElement);

    // Create the payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
      return;
    }

    // Log the payment method ID to ensure it’s being created correctly
    console.log("Payment Method Created:", paymentMethod);

    // Send payment method ID to backend
    try {
      const response = await fetch(
        "http://localhost:8010/api/payments/create-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 3000, // Amount in smallest currency unit (e.g., cents)
            currency: "usd",
            paymentMethodId: paymentMethod.id,
          }),
        }
      );

      const result = await response.json();
      if (result.error) {
        console.error("Payment Failed:", result.error);
      } else {
        console.log("Payment Successful:", result);
      }
    } catch (err) {
      console.error("Backend Error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Card Number Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, textAlign: "left" }}>
          Card Number
        </Typography>
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%" }}
          disabled={!stripe || !elements || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </Box>
    </form>
  );
};

export default PaymentForm;
