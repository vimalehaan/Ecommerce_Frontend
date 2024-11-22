import React from "react";
import Box from "@mui/material/Box";

const PlainBox = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        // height: "calc(100vh - 40px)",
        
        p: "20px",
        ...props.sx, // Allow additional styles to be passed
      }}
    >
      <Box
        sx={{
        //   backgroundColor: "bgSoft.main",
          height: "100%",
          borderRadius: "32px",
          ...props.innerSx, // Allow additional styles for the inner Box
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PlainBox;
