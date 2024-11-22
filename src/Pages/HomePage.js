import React from "react";
import Grid2 from "@mui/material/Grid2";

import NavBar from "../Components/Utils/NavBar";
import RightSideCompo from "../Components/HomePage/RightSideCompo";
import LeftSideCompo from "../Components/HomePage/LeftSideCompo";
import HotProductsCompo from "../Components/HomePage/HotProductsCompo";
import StyledBox from "../Components/StyledComponents/CheckedBox";
import ScrollingBar from "../Components/HomePage/ScrollingBar";
import Footer from "../Components/Utils/Footer";

const HomePage = () => {
  return (
    <div>
      <StyledBox
        sx={{
          height: "calc(100vh - 40px)",
        }}
        innerSx={{
          backgroundColor: "bgSoft.main",
          height: "100%",
        }}
      >
        <NavBar />
        <Grid2 container>
          <Grid2 size={6}>
            <LeftSideCompo />
          </Grid2>

          <Grid2 size={6} sx={{ p: "4%" }}>
            <RightSideCompo />
          </Grid2>
        </Grid2>
      </StyledBox>
      <ScrollingBar />
      <StyledBox
        sx={{
          height: "calc(100vh - 40px)",
        }}
        innerSx={{
          backgroundColor: "bgSoft.main",
          height: "100%",
        }}
      >
        <HotProductsCompo />
      </StyledBox>
      <Footer />
    </div>
  );
};

export default HomePage;
