import { Box, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../Components/Utils/NavBar";
import WishListCard from "../Components/WishLishCard/WishListCard";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistItems,
  removeFromWishlist,
} from "../Actions/WishlistAction"; // Action to fetch wishlist items

const WishlistPage = () => {
  const userId = useSelector((state) => state.auth.user); // Get user ID from Redux state
  const [products, setProducts] = useState();
  const [deleted, setDeleted] = useState();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const response = await getWishlistItems(userId); // Call the function
          console.log(response);
          setProducts(response); // Update the state with cart items
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      }
    };

    fetchWishlist(); // Invoke the function inside useEffect
  }, [userId, deleted]); // Dependency on userId

  const handleDelete = async (productId) => {
    try {
      await removeFromWishlist(productId, userId); // Pass userId and productId to the deleteCartItem function
      console.log("Item deleted successfully");
      setDeleted(deleted + 1);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleAddToCart = (id) => {
    console.log(`Add to cart item with id: ${id}`);
    // You can dispatch an add-to-cart action or call API to add the product to the cart
  };

  return (
    <div>
      <StyledBox
        sx={
          {
            // height: "calc(100vh - 40px)",
          }
        }
        innerSx={{
          paddingBottom: "10px",
          backgroundColor: "bgSoft.main",
          minHeight: "calc(100vh - 40px)",
        }}
      >
        <NavBar />
        <Container>
          <Box
            sx={{
              backgroundColor: "white",
              minHeight: "100%",
              my: "40px",
              borderRadius: "32px",
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="title" textAlign="left" fontWeight={"bold"}>
              My Wishlist
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Check if products are available */}
            {products && products.length === 0 ? (
              <Typography variant="body1" textAlign="center">
                Your wishlist is empty!
              </Typography>
            ) : (
              <div>
                {products &&
                  products.map((product) => (
                    <WishListCard
                      key={product.id}
                      id={product.productId}
                      image={product.productImg}
                      title={product.productName}
                      details={product.productDescription}
                      price={product.productPrice}
                      onDelete={() => handleDelete(product.productId)}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
              </div>
            )}
          </Box>
        </Container>
      </StyledBox>
    </div>
  );
};

export default WishlistPage;
