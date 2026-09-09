import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import NavBar from "../Components/Utils/NavBar";
import PlainBox from "../Components/StyledComponents/PlainBox";
import Footer from "../Components/Utils/Footer";
import UserInfoCompo from "../Components/Profile/UserInfoCompo";

const ProfilePage = () => {
  return (
    <div>
      <PlainBox
        sx={{ minHeight: "100vh" }}
        innerSx={{ backgroundColor: "bgSoft.main", minHeight: "100vh" }}
      >
        <NavBar />
        <Container sx={{ pt: "20px" }}>
            <UserInfoCompo />
        </Container>
      </PlainBox>
      <Footer />
    </div>
  );
};

export default ProfilePage;
