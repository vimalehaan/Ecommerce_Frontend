import { useSelector } from "react-redux";
import { getTokenFromCookies } from "./AuthAction";
import { deleteCartItem } from "./CartAction";

export const createPaymentIntent = async (
  amount,
  currency,
  paymentMethodId
) => {
  try {
    const response = await fetch(
      "http://localhost:8010/api/v1/payment/create-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount, // Amount in smallest currency unit (e.g., cents)
          currency,
          paymentMethodId,
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error("Payment Failed:", result.error);
      return { success: false, error: result.error };
    } else {
      console.log("Payment Successful:", result);
      return { success: true, result };
    }
  } catch (err) {
    console.error("Backend Error:", err);
    return { success: false, error: err.message };
  }
};

export const createOrder = (paymentId, userId) => async () => {
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const orderedProducts = JSON.parse(localStorage.getItem("OrderedProducts"));
  const totalAmount = JSON.parse(localStorage.getItem("total"));
  const token = getTokenFromCookies();

  const orderPayload = {
    totalAmount: totalAmount,
    orderLines: orderedProducts.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: product.productPrice,
    })),
    customerId: userId, // Use userId passed as argument
    paymentId: paymentId,
    shippingDetails: {
      fullName: shippingDetails.fullname,
      phoneNumber: shippingDetails.phoneNo,
      houseNo: shippingDetails.houseNo,
      street: shippingDetails.street,
      city: shippingDetails.city,
      district: shippingDetails.district,
      province: shippingDetails.province,
      postalCode: shippingDetails.postalCode,
    },
  };

  console.log("order", orderPayload);
  try {
    const response = await fetch("http://localhost:8222/api/v1/orders/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (response) {
      // Loop through each ordered product and delete from the cart
      for (let product of orderedProducts) {
        await deleteCartItem(userId, product.productId); // Delete product from the cart
      }
      localStorage.removeItem("OrderedProducts");
      localStorage.removeItem("shippingDetails");
      localStorage.removeItem("total");

      console.log("Order Created and Cart Items Deleted:");
      return response; // Return the order result
    } else {
      console.error("Error creating order:", response.statusText);
      return null; // Or handle failure in another way
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
