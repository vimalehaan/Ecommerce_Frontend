import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import NavBar from "../Components/Utils/NavBar";
import RightSideCompo from "../Components/HomePage/RightSideCompo";

const InfoBlock = ({ number, description }) => (
  <Stack
    direction="column"
    spacing={-0.5}
    sx={{ display: "flex", alignItems: "start" }}
  >
    <Typography variant="primeBigTitle">{number}</Typography>
    <Typography variant="primePara1" sx={{ color: "primary.lighter" }}>
      {description}
    </Typography>
  </Stack>
);

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
            backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px), /* Horizontal lines */
                repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px) /* Vertical lines */
              `,
          }}
        >
          <NavBar />
          <Grid2 container>
            <Grid2 size={6}>
              <Box sx={{ ml: "5%", p: "6% 0 0 2%" }}>
                <Stack direction={"column"} spacing={3}>
                  <Typography
                    variant="primeSuperTitle"
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
                  <Typography
                    variant="primePara1"
                    textAlign={"start"}
                    sx={{
                      color: "primary.lighter",
                    }}
                  >
                    Dress to impress with our latest collection, curated for
                    trendsetters seeking chic and timeless style. Elevate your
                    wardrobe today!
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                    }}
                  >
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{
                        fontWeight: 600,
                        mt: "3%",
                        borderRadius: "200px",
                        height: "50px",
                        width: "23%",
                        transition: "transform 0.4s",
                        ":hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Stack direction={"row"} spacing={8} sx={{ mt: "3%" }}>
                      <InfoBlock
                        number="20+"
                        description="Years of Experience"
                      />
                      <InfoBlock number="21K+" description="Happy Customers" />
                      <InfoBlock number="150+" description="Product Brands" />
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid2>

            <Grid2 size={6} sx={{ p: "4%" }}>
              <RightSideCompo />
            </Grid2>
            <Grid2 size={3}></Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
