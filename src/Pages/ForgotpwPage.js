import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import {
  sendForgotPasswordRequest,
  verifyOTP,
  changePassword,
} from "../Actions/AuthAction";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState("send"); // Tracks steps: "send", "verify", "change"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (step === "send") {
        // Send OTP
        await sendForgotPasswordRequest(email);
        // alert("OTP has been sent to your email.");
        setStep("verify"); // Move to OTP verification step
      } else if (step === "verify") {
        // Verify OTP
        await verifyOTP(otp, email);
        // alert("OTP verified successfully!");
        setStep("change"); // Move to password change step
      } else if (step === "change") {
        // Change password
        if (password !== confirmPassword) {
          alert("Passwords do not match. Please try again.");
          return;
        }
        const response = await changePassword(email, password, confirmPassword);
        if ((response.staus = 200)) {
          alert("Password changed successfully!");
          navigate("/login");
        } else {
          alert(response.data);
        }
        setStep("send"); // Reset to initial step
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      alert(
        step === "send"
          ? "Error sending OTP. Please try again."
          : step === "verify"
          ? "Invalid OTP. Please try again."
          : "Error changing password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {step === "send"
            ? "Forgot Password"
            : step === "verify"
            ? "Enter OTP"
            : "Change Password"}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          mb={2}
        >
          {step === "send"
            ? "Enter your registered email address to receive an OTP."
            : step === "verify"
            ? "Enter the OTP sent to your registered email."
            : "Set a new password for your account."}
        </Typography>
        <form onSubmit={handleSubmit}>
          {step === "send" && (
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          )}
          {step === "verify" && (
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          )}
          {step === "change" && (
            <>
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, textTransform: "none" }}
          >
            {loading
              ? step === "send"
                ? "Sending..."
                : step === "verify"
                ? "Verifying..."
                : "Updating..."
              : step === "send"
              ? "Send OTP"
              : step === "verify"
              ? "Verify OTP"
              : "Change Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
