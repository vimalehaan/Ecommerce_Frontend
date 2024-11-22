import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { BlackBigButton } from "../Utils/Buttons";

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

const LeftSideCompo = () => {
  return (
    <div>
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
            trendsetters seeking chic and timeless style. Elevate your wardrobe
            today!
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <BlackBigButton
              text={"Buy Now"}
              sx={{
                width: "23%",
                mt: "3%",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Stack direction={"row"} spacing={8} sx={{ mt: "3%" }}>
              <InfoBlock number="20+" description="Years of Experience" />
              <InfoBlock number="21K+" description="Happy Customers" />
              <InfoBlock number="150+" description="Product Brands" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default LeftSideCompo;
