import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import NavBar from "../Components/Utils/NavBar";


const HomePage = () => {
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
            // m: "20px",
          }}
        >
          <NavBar />
          <Grid2 container>
            <Grid2 size={6}>
              <Box sx={{ ml: "5%", p: "6% 0 0 2%" }}>
                <Typography
                  variant="superTitle"
                  fontWeight={"bold"}
                  textAlign={"left"}
                  sx={{
                    textTransform: "uppercase",
                    lineHeight: "122%",
                  }}
                >
                  find your
                  <br />
                  fashion
                  <br />
                  heaven today
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={6}>
              
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      </div>
      );
      };

export default HomePage;
