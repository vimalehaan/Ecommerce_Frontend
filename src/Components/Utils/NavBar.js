import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          backgroundColor: "primary.darker",
          borderRadius: "80px",
          mt: "25px",
          height: "7vh",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box sx={{ ml: "5%" }}>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontFamily: "Space Grotesk",
                flexGrow: 1,
                fontWeight: "bold",
                color: "secondary.main",
              }}
            >
              Glam
              <span style={{ textTransform: "lowercase", color: "#fff" }}>
                mod
              </span>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              SERVICES
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              PRODUCT
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              TESTIMONIALS
            </Typography>
          </Box>

          <Box sx={{ ml: 3, position: "relative", display: "flex", gap: 2 }}>
            <Button sx={{ color: "#fff", textTransform: "none" }}>Login</Button>
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.main",
                },
              }}
            >
              SignUp
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
