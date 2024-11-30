import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { BlackBigButton } from "../Utils/Buttons";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setShippingDetails } from "../../Reducers/shippingDetailSlice"; // Import your action
import { useNavigate } from "react-router-dom";

const ShippingForm = ({ handleSubmit }) => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phoneNo: "",
    houseNo: "",
    street: "",
    city: "",
    district: "",
    province: "",
    postalCode: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConfirm = () => {
    console.log("Submitted Data:", formData); // Log the form data

    // Save formData in localStorage as a JSON string
    localStorage.setItem("shippingDetails", JSON.stringify(formData));

    // Dispatch form data to Redux
    dispatch(setShippingDetails(formData));

    handleSubmit();
    navigate("/payment");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="title" textAlign="left" fontWeight="bold">
        Shipping
      </Typography>
      <TextField
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNo"
        value={formData.phoneNo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="House Number"
        name="houseNo"
        value={formData.houseNo}
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
        label="District"
        name="district"
        value={formData.district}
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
        label="Postal Code"
        name="postalCode"
        value={formData.postalCode}
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
      <BlackBigButton text="Confirm Details" onClick={handleConfirm} />
    </Box>
  );
};

export default ShippingForm;
