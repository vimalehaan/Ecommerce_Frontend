import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import NavBar from "../Components/Utils/NavBar";
import ProductDescriptionBox from "../Components/ProductDetailPage/ProductDescriptionBox";
import ProductImagesBox from "../Components/ProductDetailPage/ProductImagesBox";
import ProductDetailBox from "../Components/ProductDetailPage/ProductDetailBox";
import { fetchProductById } from "../Actions/ProductApi"; // Import the API function
import Footer from "../Components/Utils/Footer";

const ProductPage = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null); // State for product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetchProductById(productId); // Fetch product using the dynamic productId
        setProduct(response);
        setError(null);
        console.log("res in Page", response);
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [productId]); // Trigger re-fetch if productId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            paddingBottom: "40px",
          }}
        >
          <NavBar />
          <Grid2
            container
            spacing={4}
            bgcolor={"white"}
            borderRadius={"32px"}
            m={"40px"}
          >
            {/* Left Section: Images */}
            <Grid2 item xs={12} md={6} lg={6}>
              <Box sx={{ m: "20px", borderRadius: "32px" }}>
                <ProductImagesBox images={product?.productImg} />
              </Box>
            </Grid2>

            {/* Right Section: Details and Description */}
            <Grid2 item xs={12} md={6} lg={6} width={"50%"}>
              <Box>
                <ProductDetailBox product={product} />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default ProductPage;
