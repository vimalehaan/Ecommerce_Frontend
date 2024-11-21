import React from "react";
import Marquee from "react-fast-marquee";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const ScrollText = () => {
  return (
    <Box
      sx={{
        // width: "calc(100%/3)",
        // border: "1px solid red",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ml: '90px'
      }}
    >
      <Typography variant="primeBigTitle" fontSize={40} textTransform={'uppercase'} sx={{ color: "#fff", mr: '90px' }}>
        Fashion Award - 2024
      </Typography>
      <Typography variant="primeBigTitle"  sx={{ color: "secondary.lighter", mt: '3.5%' }}>
        <EmojiEventsIcon fontSize="40"/>
      </Typography>
    </Box>
  );
};

const ScrollingBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "9vh",
        // p: "20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: "100%",
          m: "0 20px 0 20px",
          borderRadius: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Marquee
          speed={80}>
            <ScrollText />
            <ScrollText />
            <ScrollText />
            {/* <ScrollText /> */}
          </Marquee>
        </Box>
        {/* CSS keyframes for horizontal scroll */}
      </Box>
    </Box>
  );
};

export default ScrollingBar;
