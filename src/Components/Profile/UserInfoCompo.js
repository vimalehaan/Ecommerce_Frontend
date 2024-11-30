import React, { useState } from "react";

import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import PlainBox from "../StyledComponents/PlainBox";
import FormTextField from "../Utils/FormTextField";
import { BlackButton, OutlinedBlackButton } from "../Utils/Buttons";

import user from "../../Data/UserData";
import { height } from "@mui/system";

const UserInfoCompo = () => {
  console.log(user);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    house_no: user.house_no || "",
    street: user.street || "",
    city: user.city || "",
    district: user.district || "",
    postal_code: user.postal_code || "",
    phone_no: user.phone_no || "",
  });

  const fields = [
    { label: "HouseNo", name: "house_no" },
    { label: "Street", name: "street" },
    { label: "City", name: "city" },
    { label: "District", name: "district" },
    { label: "Postal Code", name: "postal_code" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field ${name} to value: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Current form data:", formData);
  console.log("Current State:", editMode);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };
  const handleCancel = () => {
    setFormData({
      house_no: user.house_no || "",
      street: user.street || "",
      city: user.city || "",
      district: user.district || "",
      postal_code: user.postal_code || "",
      phone_no: user.phone_no || "",
    });
    setEditMode(false); // Switch back to view mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // setEditMode(false);

    // Example validation
    if (!formData.phone_no.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit telephone number.");
      return;
    }

    // Example API call (pseudo-code)
    // fetch('/api/updateUser', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // }).then(response => console.log(response));
    setEditMode(false);
    alert("Details updated successfully!"); // Notify the user of success
  };

  console.log(formData.house_no);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid2
            container
            spacing={3}
            sx={{display: 'flex', alignItems: "center", height: "100%", justifyContent: 'center' }} // Removed display: flex
          >
            <Grid2 size={{ lg: 7 }} sx={{}}>
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
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      width: "100%",
                      pt: "5px",
                    }}
                  >
                    <Typography
                      variant="primePara1"
                      sx={{ color: "secondary.dark" }}
                    >
                      Email:{" "}
                      <Typography
                        variant="primePara1"
                        component="span"
                        sx={{ color: "primary.lighter", pl: "10px" }}
                      >
                        {user.email}
                      </Typography>
                    </Typography>
                  <Divider sx={{ width: "100%" }} />

                    <Typography
                      variant="primePara1"
                      sx={{ color: "secondary.dark" }}
                    >
                      Address:
                    </Typography>

                    {fields.map((field) =>
                      !editMode ? (
                        <Box sx={{ py: "2px" }}>
                          <Stack
                            direction={"row"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="primePara1"
                              fontSize={13}
                              textAlign={"end"}
                              sx={{ minWidth: "100px", flexShrink: 0 }}
                            >
                              {field.label}:
                            </Typography>
                            <Typography
                              fontSize={14}
                              variant="primePara1"
                              component="span"
                              sx={{
                                color: user[field.name]
                                  ? "primary.lighter"
                                  : "error.light",
                                pl: "10px",
                              }}
                            >
                              {user[field.name] ? user[field.name] : "No Data"}
                            </Typography>
                          </Stack>
                        </Box>
                      ) : (
                        <FormTextField
                          key={field.name}
                          label={field.label}
                          name={field.name}
                          value={formData[field.name]}
                          defaultValue={formData[field.name]}
                          onChange={handleChange}
                        />
                      )
                    )}
                  <Divider sx={{ width: "100%" }} />

                    {!editMode ? (
                      <Typography
                        variant="primePara1"
                        sx={{ color: "secondary.dark" }}
                      >
                        Telephone:{" "}
                        <Typography
                          variant="primePara1"
                          component="span"
                          fontSize={14}
                          sx={{
                            color: user.phone_no
                              ? "primary.lighter"
                              : "error.light",
                            pl: "10px",
                          }}
                        >
                          {user.phone_no ? user.phone_no : "No Data"}
                        </Typography>
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          variant="primePara1"
                          sx={{ color: "secondary.dark" }}
                        >
                          Telephone:
                        </Typography>
                        <FormTextField
                          label=""
                          name="telephone"
                          value={formData.phone_no}
                          defaultValue={formData.phone_no}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Enter your phone number"
                          inputProps={{
                            pattern: "[0-9]*",
                            maxLength: 15,
                          }}
                        />
                      </>
                    )}
                  </Stack>
                  <Divider sx={{ width: "100%" }} />

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      {!editMode ? (
                        <BlackButton
                          text="Edit Details"
                          // type={editMode ? "submit" : "button"} // Only allow "submit" when in edit mode
                          onClick={handleEditClick} // Only trigger handleEditClick for "Edit Details"
                          sx={{
                            minWidth: "90px",
                            m: "12px 10px 0 0",
                            height: "43px",
                          }}
                        />
                      ) : (
                        <>
                          <OutlinedBlackButton
                            text="Cancel"
                            type="button"
                            onClick={handleCancel}
                            sx={{
                              minWidth: "90px",
                              m: "12px 10px 0 0",
                              height: "43px",
                              mr: 1,
                            }}
                          />
                          <BlackButton
                            text="Submit"
                            // type="button"
                            onClick={handleSubmit}
                            sx={{
                              minWidth: "90px",
                              m: "12px 10px 0 0",
                              height: "43px",
                              mr: 2,
                            }}
                          />
                        </>
                      )}
                    </Box>
                  
                </Stack>
              </PlainBox>
            </Grid2>
            {/* <Grid2 size={{ lg: 7 }} sx={{}}></Grid2> */}
          </Grid2>
        </form>
      </Box>
    </div>
  );
};

export default UserInfoCompo;
