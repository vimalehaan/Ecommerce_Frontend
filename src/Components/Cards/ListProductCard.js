import { React, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import {
  BlackButton,
  OutlinedIconButton,
  FilledIconButton,
  BlackBigButton,
} from "../Utils/Buttons";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import products from "../../Data/ProductData";

const ListProductCard = ({ image, title, description, price, inStock }) => {
  const [fav, setFav] = useState(false);

  const toggleFavorite = () => {
    setFav((prev) => !prev); // Toggle the `fav` state
  };
  return (
    <Card
      elevation={"none"}
      sx={{
        position: "relative",
        width: "270px",
        height: "400px",
        borderRadius: "20px",
        cursor: "pointer",
        // "&:hover": {
        //   transform: "scale3d(1.02, 1.02, 1)",
        //   boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
        // },
        // transition: "all .3s ease-in-out",
      }}
    >
      <CardMedia
        image={image}
        sx={{
          m: "20px",
          height: "220px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "contain",
          borderRadius: "20px",
          backgroundRepeat: "no-repeat",
          position: "relative",
          //   opacity: '20%'
          opacity: !inStock ? 0.5 : 1,
        }}
      >
        {!inStock && (
          <Chip
            label="Out of Stock"
            color="error.darker"
            size="small"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontWeight: "bold",
              backgroundColor: "error.light",
              color: "white",
            }}
          />
        )}
      </CardMedia>

      <Divider />
      <CardContent sx={{ mt: "3px" }}>
        <Stack
          spacing={0.8}
          direction={"column"}
          sx={{
            height: "115px",
            display: "flex",
            mt: -1.6,
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={0.5}
            direction={"column"}
            sx={{ display: "flex", mt: -1.6, justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                //   border: "2px solid red",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={0.2}>
                <Typography
                  variant="body1"
                  //   textTransform={"uppercase"}
                  fontWeight={500}
                  textAlign={"start"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="primary.darker"
                  textAlign={"left"}
                  fontWeight={600}
                >
                  {description}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="primary.main"
              textAlign={"start"}
              fontWeight={600}
            >
              {price}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Stack direction={"row"} spacing={1}>
              <BlackBigButton
                text="Add to Cart"
                sx={{ height: "30px", fontSize: "11px" }}
              />
              {fav ? (
                <FilledIconButton
                  icon={<FavoriteIcon sx={{ fontSize: "17px" }} />}
                  backgroundColor={"error.main"}
                  color={"white"}
                  height={"30px"}
                  sx={{
                    fontSize: "11px",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.error.dark,
                    },
                  }}
                  onClick={toggleFavorite}
                />
              ) : (
                <OutlinedIconButton
                  icon={<FavoriteBorderIcon sx={{ fontSize: "19px" }} />}
                  color={"error.main"}
                  height={"30px"}
                  sx={{ fontSize: "11px" }}
                  onClick={toggleFavorite}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default ListProductCard;
