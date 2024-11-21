import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import tshirt from "../../Assets/HomePage/pngfind.com-green-shirt-png-6920524.png";
import dress from "../../Assets/HomePage/image 9.png";

const HomeProductCard = () => {
  return (
    <div>
      <Card
        elevation={"none"}
        sx={{
          width: "250px",
          height: "340px",
          borderRadius: "20px",
          cursor: "pointer",
          "&:hover": {
            transform: "scale3d(1.02, 1.02, 1)",
            boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
          },
          transition: "all .3s ease-in-out",
        }}
      >
        <CardMedia
          image={dress}
          sx={{
            height: "76%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: 'contain',
            borderRadius: "20px",
            backgroundRepeat: "no-repeat",
          }}
        />

        <CardContent>
          <Stack spacing={1} direction={"column"} sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Typography
                variant="primePara1"
                textTransform={'uppercase'}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
              >
                pinky dress
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="primePara1">Rs.3500</Typography>
            </Box>
          </Stack>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </div>
  );
};

export default HomeProductCard;
