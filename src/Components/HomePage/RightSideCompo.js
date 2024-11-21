import React from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import homeImage1 from "../../Assets/HomePage/image-asset.jpeg";
import qualityImage from "../../Assets/HomePage/material.webp";

const RightSideCompo = () => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Stack spacing={3} direction={"row"}>
        <Box
          sx={{
            height: "40vh",
            width: "50%",
            backgroundColor: "secondary.main",
            borderRadius: "80px 15px 80px 15px",
          }}
        >
          <Typography
            sx={{
              mt: "30%",
              color: "primary.main",
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: "80px" }} />
          </Typography>
          <Typography
            variant="primePara2"
            fontSize={"23px"}
            sx={{
              color: "primary.main",
              mt: "5%",
            }}
          >
            Fashion Award
            <br />
            Winner
          </Typography>
        </Box>
        <Box
          sx={{
            height: "40vh",
            width: "50%",
            borderRadius: "15px 80px 15px 80px",
            backgroundImage: `url(${homeImage1})`,
            backgroundSize: "cover",
          }}
        ></Box>
      </Stack>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "bgSoft.main",
            backgroundSize: "cover",
            height: 242,
            width: 242,
            borderRadius: "50%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "160px",
            mt: "5%",
            border: "1.2px solid",
            borderWidth: "1.2px 1.2px 0 1.2px",
            borderColor: "primary.lighter",
            borderRadius: "15px 15px 0 0",
            "::before, ::after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              width: "8px",
              height: "8px",
              backgroundColor: "primary.lighter",
              borderRadius: "50%",
            },
            "::before": {
              left: "-4px",
            },
            "::after": {
              right: "-4px",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              bottom: "-18%",
              left: "4%",
              height: "70px",
              width: "150px",
              background: "#d9d0ff",
              borderRadius: "16px",
              boxShadow: "14px 13px 31px rgba(204, 195, 243, 0.5)",
              pl: 3,
            }}
          >
            <Typography
              variant="primePara1"
              textAlign={"left"}
              sx={{ color: "primary.light" }}
            >
              Premium Quality Materials
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "-18%",
              right: "4%",
              display: "flex",
              alignItems: "center",
              height: "70px",
              width: "160px",
              background: "#bbf6be",
              boxShadow: "14px 13px 40px rgba(138, 232, 143, 0.54)",
              borderRadius: "16px",
              pl: 3,
            }}
          >
            <Typography
              variant="primePara1"
              textAlign={"left"}
              sx={{ color: "primary.light" }}
            >
              Top Products This Month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "bgSoft.main",
            backgroundSize: "cover",
            height: 225,
            width: 225,
            borderRadius: "50%",
            top: "50%",
            transform: "translateY(-50%)",
            border: "1px solid",
            borderColor: "primary.lighter",
            
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            backgroundImage: `url(${qualityImage})`,
            backgroundSize: "cover",
            height: 210,
            width: 210,
            borderRadius: "50%",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "bgSoft.main",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default RightSideCompo;
