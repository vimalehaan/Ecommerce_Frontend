import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const HomePage = () => {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          p:"20px"
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: '32px'
            // m: "20px",
          }}
        ></Box>
      </Box>
      {/* <Container>
        <Grid2 container>
          <Grid2
            size={12}
            sx={{ backgroundColor: "secondary.lighter", height: "100vh" }}
          ></Grid2>
        </Grid2>
      </Container> */}
    </div>
  );
};
