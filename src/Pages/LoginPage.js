import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 40px)",
          p: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: "32px",
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px), /* Horizontal lines */
        repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px) /* Vertical lines */
      `,
            backgroundSize: "100% 100%", // Ensure lines span the whole box
          }}
        >
          <Grid2
            container
            sx={{
              height: "calc(100vh - 40px)", // Full viewport height
              //   bgcolor: "red", // Background color for the container
              //   padding: "20px", // Padding around the container
            }}
          >
            {/* First Grid */}
            <Grid2
              item
              lg={6}
              md={6}
              sx={{
                padding: "50px",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                sx={{ bgcolor: "white", borderRadius: "32px", height: "100%" }}
              >
                <Typography>ddd</Typography>
              </Box>
            </Grid2>

            {/* Second Grid */}
            <Grid2
              item
              lg={6}
              md={6}
              sx={{
                height: "100%",
                width: "50%",
                bgcolor: "lightgray",
              }}
            >
              <Typography>dsdgrskm</Typography>{" "}
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
