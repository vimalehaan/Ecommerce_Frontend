import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const FormTextField = ({ label, textFieldProps, sx = {} }) => {
  return (
    <Box
    //   direction={"row"}
    //   spacing={0}
      sx={{ alignItems: "center", width: "100%", ...sx }}
    >
      {/* <Typography
        variant="primePara1"
        sx={{ color: "secondary.dark", minWidth: "100px" }}
      >
        {label}
      </Typography> */}
      <TextField
        id={label.toLowerCase().replace(/\s+/g, "-")}
        label={label}
        // color="secondary.dark"
        //  variant="filled"
        // variant="standard"
        sx={{
          width: "96%",
          fontSize: "50px",
          "& .MuiOutlinedInput-root": {
            // height: "30px",
            borderRadius: "10px",
            borderWidth: "1.5px",
            "& fieldset": {
              borderWidth: "1.5px",
              borderColor: "primary.lighter",
              
            },
            "&:hover fieldset": {
              borderWidth: "1.5px",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1.5px",
              borderColor: "secondary.dark",
            },
          },
          "& .MuiInputLabel-root": {
            color: "primary.lighter",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "secondary.dark",
            fontWeight: 'bold',
            fontSize: '12px',
          }
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

export default FormTextField;
