import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

import PlainBox from "../StyledComponents/PlainBox";

import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";

const IconBut = ({ icon }) => (
  <IconButton
    variant="outlined"
    sx={{
      border: "1px solid",
      borderColor: "secondary.lighter",
      color: "secondary.lighter",
    }}
  >
    {icon}
  </IconButton>
);

const Footer = () => {
  return (
    <div>
      <PlainBox
        sx={{
          height: "270px",
          pt: "0",
        }}
        innerSx={{
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Container>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-around", pt: "30px" }}
          >
            <Box sx={{}}>
              <Stack
                direction={"column"}
                spacing={3.5}
                sx={{ alignItems: "start" }}
              >
                <Typography variant="primeMedTitle" textTransform={"uppercase"}>
                  Quick Links
                </Typography>
                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ alignItems: "start" }}
                >
                  <Typography variant="primePara1">ABOUT US</Typography>
                  <Typography variant="primePara1">SHOP</Typography>
                  <Typography variant="primePara1"> BLOG</Typography>
                  <Typography variant="primePara1">CONTACT US</Typography>
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Stack
                direction={"column"}
                spacing={3.5}
                sx={{ alignItems: "start" }}
              >
                <Typography variant="primeMedTitle" textTransform={"uppercase"}>
                  Contact us
                </Typography>
                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ alignItems: "start" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6, // Spacing between icon and text
                    }}
                  >
                    <EmailIcon
                      sx={{ fontSize: "18px", color: "secondary.lighter" }}
                    />
                    <Typography variant="primePara1" sx={{ color: "white" }}>
                      contact@glammod.com
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6, // Spacing between icon and text
                    }}
                  >
                    <FmdGoodIcon
                      sx={{
                        fontSize: "18px",
                        color: "secondary.lighter",
                        mt: 0.3,
                      }}
                    />
                    <Typography variant="primePara1" sx={{ color: "white" }}>
                      21/A, Galle Rd, Colombo 07
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6, // Spacing between icon and text
                    }}
                  >
                    <CallIcon
                      sx={{ fontSize: "18px", color: "secondary.lighter" }}
                    />
                    <Typography variant="primePara1" sx={{ color: "white" }}>
                      +94 70 123 4567
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Stack
                direction={"column"}
                spacing={3.5}
                sx={{ alignItems: "start" }}
              >
                <Typography variant="primeMedTitle" textTransform={"uppercase"}>
                  Social Links
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  <IconBut icon={<FacebookIcon />} />
                  <IconBut icon={<InstagramIcon />} />
                  <IconBut icon={<PinterestIcon />} />
                  <IconBut icon={<XIcon />} />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
          <Box sx={{display: 'flex', mt: '1.5%', justifyContent: 'end', pr: '2%'}}>
            <Typography variant="primePara1" fontSize={'13px'} sx={{color: 'primary.lighter'}}>
              &copy; {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </Typography>
          </Box>
      </PlainBox>
    </div>
  );
};

export default Footer;