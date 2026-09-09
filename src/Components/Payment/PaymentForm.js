import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { createOrder, createPaymentIntent, } from "../../Actions/OrderAction";
// import { createOrder, createPaymentIntent } from "../../Actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Get userId from Redux

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements are not loaded.");
      return;
    }

    setIsProcessing(true);

    console.log("Stripe Elements initialized:", elements);

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.error("Card Number Element not found");
      setIsProcessing(false);
      return;
    }

    console.log("Card Number Element:", cardNumberElement);

    // Create the payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
      return;
    }

    console.log("Payment Method Created:", paymentMethod);

    // Fetch total price from local storage
    const totalAmount = JSON.parse(localStorage.getItem("total"));

    // Ensure the totalAmount is fetched and valid before proceeding
    if (!totalAmount || isNaN(totalAmount)) {
      console.error("Total amount is invalid or not found in local storage.");
      return; // Exit if total is not valid
    }

    // Call the new action to handle the API request
    const {
      success,
      error: apiError,
      result,
    } = await createPaymentIntent(
      totalAmount * 100, // Use the total price fetched from local storage
      "lkr", // Currency in Sri Lankan Rupees
      paymentMethod.id
    );

    console.log("Ressponse Check :", result);

    if (!success) {
      console.error("Payment Failed:", apiError);
    } else {
      try {
        console.log("Payment Successful:", result);
        const response = await dispatch(createOrder(result.id, userId));
        if (response) {
          console.log("Order Created");
          navigate("/"); // Redirect after successful payment
        }
      } catch (error) {
        console.error("Error during order creation:", error);
      }
    }

    setIsProcessing(false);
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
          <CardNumberElement
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

      {/* Expiry Date Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, textAlign: "left" }}>
          Expiry Date
        </Typography>
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardExpiryElement
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

      {/* CVC Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, textAlign: "left" }}>
          CVC
        </Typography>
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardCvcElement
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
