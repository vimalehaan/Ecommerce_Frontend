import React from "react";

import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import PlainBox from "../StyledComponents/PlainBox";
import FormTextField from "../Utils/FormTextField";
import { BlackButton } from "../Utils/Buttons";

import user from "../../Data/UserData";
import { height } from "@mui/system";

const UserInfoCompo = () => {
  console.log(user);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Grid2
          container
          spacing={3}
          sx={{ alignItems: "center", height: "100%" }} // Removed display: flex
        >
          <Grid2 size={{ lg: 5 }} sx={{}}>
            <PlainBox
              sx={{ minHeight: "600px", width: "100%", p: "0" }}
              innerSx={{
                backgroundColor: "white",
                p: "20px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Stack direction={"column"} spacing={1} sx={{ width: "100%" }}>
                <Stack
                  direction={"column"}
                  sx={{ display: "flex", alignItems: "start", width: "100%" }}
                >
                  <Typography variant="primeMedTitle">{user.name}</Typography>
                  <Typography
                    variant="primePara1"
                    sx={{ color: "primary.lighter", pl: "5px" }}
                  >
                    {user.user_name}
                  </Typography>
                </Stack>
                <Divider sx={{ width: "100%" }} />
                <Stack
                  direction={"column"}
                  spacing={1.5}
                  sx={{ display: "flex", alignItems: "start", width: "100%", pt: '5px' }}
                >
                  <Typography
                    variant="primePara1"
                    sx={{ color: "secondary.dark" }}
                  >
                    Email:{" "}
                    <Typography
                      variant="primePara1"
                      component="span"
                      sx={{ color: "primary.lighter", pl: '10px' }}
                    >
                      {user.email}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="primePara1"
                    sx={{ color: "secondary.dark" }}
                  >
                    Address:
                  </Typography>
                  <FormTextField label={"HouseNo"} />
                  <FormTextField label="Street" />
                  <FormTextField label="City" />
                  <FormTextField label="District" />
                  <FormTextField
                    label="Postal Code"
                    // textFieldProps={{
                    //   type: "number", // Example of overriding textFieldProps
                    // }}
                  />
                  <Typography
                    variant="primePara1"
                    sx={{ color: "secondary.dark" }}
                  >
                    Telephone:
                  </Typography>
                  <FormTextField
                    label=""
                    type="tel" // Use the 'tel' type for telephone input
                    placeholder="Enter your phone number"
                    inputProps={{
                      pattern: "[0-9]*", // Only numbers allowed
                      maxLength: 15, // Max length for international phone numbers
                    }}
                  />
                </Stack>
                <Box sx={{width: '100%',display: 'flex', justifyContent: 'end'}}>
                <BlackButton text={"Save"} sx={{width: '90px', m: '12px 10px 0 0', height: '43px' }}/>
                </Box>
              </Stack>
            </PlainBox>
          </Grid2>
          <Grid2 size={{ lg: 7 }} sx={{}}></Grid2>
        </Grid2>
      </Box>
    </div>
  );
};

export default UserInfoCompo;
