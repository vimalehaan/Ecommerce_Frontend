import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import {
  BlackBigButton,
  OutlinedIconButton,
  FilledIconButton,
} from "../Utils/Buttons";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ListProductCard = ({
  id,
  image,
  title,
  description,
  price,
  availableQuantity,
}) => {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleFavorite = () => {
    setFav((prev) => !prev);
  };

  const isInStock = availableQuantity > 0; // Determine stock status

  const handleCardClick = () => {
    navigate(`/product/${id}`); // Redirect to the product details page
  };

  const handleAddCartClick = () => {
    console.log("Hello cart");
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
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        image={image[0]}
        sx={{
          m: "20px",
          height: "220px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "contain",
          borderRadius: "20px",
          backgroundRepeat: "no-repeat",
          opacity: isInStock ? 1 : 0.5, // Set opacity based on stock status
        }}
      >
        {!isInStock && (
          <Chip
            label="Out of Stock"
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
      <CardContent sx={{ mt: "3px", position: "relative" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <Stack direction={"column"} spacing={0.2}>
              <Typography
                variant="body1"
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
              LKR {price}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Stack direction={"row"} spacing={1}>
              <BlackBigButton
                onClick={handleAddCartClick}
                text={isInStock ? "Add to Cart" : "Notify Me"}
                sx={{ height: "30px", fontSize: "11px" }}
                disabled={!isInStock} // Disable button if out of stock
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
    </Card>
  );
};

export default ListProductCard;
