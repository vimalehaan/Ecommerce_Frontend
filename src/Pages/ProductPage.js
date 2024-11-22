import { Box, Container, Grid2 } from "@mui/material";
import React from "react";
import NavBar from "../Components/Utils/NavBar";
import ProductDescriptionBox from "../Components/ProductDetailPage/ProductDescriptionBox";
import ProductImagesBox from "../Components/ProductDetailPage/ProductImagesBox";
import ProductDetailBox from "../Components/ProductDetailPage/ProductDetailBox";

const ProductPage = () => {
  // Dummy product object
  const product = {
    _id: 1,
    name: "Sample Product",
    category: "dress",
    discount: 50,
    description: "This is a detailed description of the sample product.",
    price: 500,
    seller: "John Doe",
    pictures: [
      "https://img.freepik.com/free-photo/front-view-young-attractive-female-colorful-coat-smiling-posing-pink-wall-model-color-female-young-girl_140725-37737.jpg?t=st=1732260684~exp=1732264284~hmac=eb3f9c1bf65511d1503840af76a01a649cfb0557e5b3c2178293d6d7d8a856ca&w=996",
      "https://img.freepik.com/free-photo/front-view-young-attractive-female-white-t-shirt-colored-coat-posing-with-slight-smile-pink-background_140725-26042.jpg?t=st=1732260717~exp=1732264317~hmac=d093eec900c955d185ea16b9c0126735675e11ca2f356455a4eb849a7372e1d6&w=996",
      "https://img.freepik.com/free-photo/young-girl-pointing-herself-t-shirt-jeans-looking-proud-front-view_176474-58831.jpg?t=st=1732277753~exp=1732281353~hmac=9a09cb932a6251af7357d813cbd8183e42138fede1dbfe6531eadf0262b573ba&w=996",
      "https://img.freepik.com/free-photo/pleased-young-pretty-girl-looking-side-pointing-up-isolated-orange-wall_141793-112458.jpg?t=st=1732277815~exp=1732281415~hmac=b11129ae37d5a3fa7cbc01076969460a7a8c4d9ebcf0d5e6632ca49f6af7ad70&w=900",
    ],
  };

  return (
    <div>
      <Box sx={{ p: "20px" }}>
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: "32px",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px),
              repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px)
            `,
            backgroundSize: "100% 100%",
          }}
        >
          <NavBar />
          {/* <Container sx={{ pt: 4 }}> */}
          <Grid2
            container
            spacing={4}
            bgcolor={"white"}
            borderRadius={"32px"}
            m={"40px"}
          >
            {/* Left Section: Images */}
            <Grid2 item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  m: "20px",
                  borderRadius: "32px",
                }}
              >
                <ProductImagesBox images={product.pictures} />
              </Box>
            </Grid2>

            {/* Right Section: Details and Description */}
            <Grid2 item xs={12} md={6} lg={6} width={"50%"}>
              <Box>
                <ProductDetailBox product={product} />
              </Box>
            </Grid2>
          </Grid2>
          <Box
            sx={{ backgroundColor: "white", m: "40px", borderRadius: "32px" }}
          >
            <ProductDescriptionBox description={product.description} />
          </Box>
        </Box>

        {/* </Container> */}
      </Box>
    </div>
  );
};

export default ProductPage;
