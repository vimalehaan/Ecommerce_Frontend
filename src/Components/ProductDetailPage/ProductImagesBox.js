import React, { useState } from "react";
import Box from "@mui/material/Box";

const ProductImagesBox = ({ images }) => {
  const [activeImg, setActiveImage] = useState(
    images && images.length > 0 ? images[0] : ""
  );

  if (!images || images.length === 0) {
    return null; // Return null or a placeholder component if images are not available
  }

  return (
    <Box
      id="Two"
      height={600}
      width={600}
      borderRadius={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1px",
        boxSizing: "border-box",
      }}
    >
      {/* <h4>{images}</h4> */}
      <Box
        id="Three"
        width={500}
        height={450}
        borderRadius={"10px"}
        sx={{ overflow: "hidden", marginBottom: "10px" }}
      >
        <img
          src={activeImg}
          alt="active-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "10px",
            }}
            onClick={() => setActiveImage(img)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductImagesBox;
