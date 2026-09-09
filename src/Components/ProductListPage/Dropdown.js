import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = ({ label, selectedValue, setSelectedValue, options }) => {
  console.log("count", selectedValue);
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 90,
        height: "30px",
        height: "30px",
        "& .MuiOutlinedInput-root": {
          height: "30px",
          borderRadius: "200px",
          borderWidth: "0px",
          "& fieldset": {
            borderWidth: "0px",
            borderColor: "black",
          },
          "&:hover fieldset": {
            borderWidth: "0px",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "0px",
          },
        },
      }}
    >
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": label }}
        sx={{
          fontFamily: "Noto Sans",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "13px",
            }}
            value={option.id || option}
          >
            {option.name || `${option} items per page`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
