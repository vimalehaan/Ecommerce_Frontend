import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

// Custom-styled Button for Confirm Details
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#15B392",
  color: "white",
  "&:hover": {
    backgroundColor: "#128c74", // Slightly darker shade for hover effect
  },
}));

const ShippingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    province: "",
    phone: "",
    email: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Callback to handle form submission
    console.log("Submitted Data:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="left">
        Shipping
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Street"
        name="street"
        value={formData.street}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            sx={{
              "&.Mui-checked": {
                color: "#FF6600", // Custom color when checked
              },
            }}
          />
        }
        label="Save this information for faster check-out next time"
      />
      <CustomButton type="submit" variant="contained" fullWidth>
        Confirm Details
      </CustomButton>
    </Box>
  );
};

export default ShippingForm;
