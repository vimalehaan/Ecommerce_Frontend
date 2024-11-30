import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import PlainBox from "../StyledComponents/PlainBox";
import FormTextField from "../Utils/FormTextField";
import { BlackButton, OutlinedBlackButton } from "../Utils/Buttons";
import { getUserById, updateUserAddress } from "../../Actions/AuthAction";

// import user from "../../Data/UserData";

const UserInfoCompo = () => {
  const userId = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({
    name: "",
    userName: null,
    email: "",
    address: {
      houseNo: null,
      street: null,
      city: "",
      district: null,
      province: null,
      postalCode: null,
    },
    phoneNo: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [telephoneNum, setTelephoneNum] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
        setAddressData(data.address || {}); // Ensure address is an object
        setTelephoneNum(data.phoneNo || "");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const fields = [
    { label: "HouseNo", name: "houseNo" },
    { label: "Street", name: "street" },
    { label: "City", name: "city" },
    { label: "District", name: "district" },
    { label: "Province", name: "province" },
    { label: "Postal Code", name: "postalCode" },
  ];
  // console.log("field", user.address.city)
  console.log("userID", userId);
  console.log("user", user);
  console.log("address", addressData);

  console.log("tel", telephoneNum);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field ${name} to value: ${value}`);
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTeleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field ${name} to value: ${value}`);
    setTelephoneNum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Current formmmm data:", addressData);
  console.log("Current State:", editMode);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };
  const handleCancel = () => {
    setAddressData(user.address);
    setEditMode(false); // Switch back to view mode
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("Form submitted with data:", addressData);
    console.log("Form submitted with data:", telephoneNum);

    // setAddressData(user.address);

    try {
      const updatedUser = await updateUserAddress(userId, addressData);
      console.log("Address updated successfully:", updatedUser);
      setEditMode(false);
      alert("Details updated successfully!");
      setAddressData(user.address);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  // console.log(addressData.houseNo);
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
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }} // Removed display: flex
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

                    {user && addressData && fields.map((field) =>
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
                                color: user.address[field.name]
                                  ? "primary.lighter"
                                  : "error.light",
                                pl: "10px",
                              }}
                            >
                              {user.address[field.name]
                                ? user.address[field.name]
                                : "No Data"}
                            </Typography>
                          </Stack>
                        </Box>
                      ) : (
                        <FormTextField
                          key={field.name}
                          label={field.label}
                          type={field.name === "postalCode" ? "number" : "text"}
                          name={field.name}
                          value={user.address[field.name]}
                          defaultValue={user.address[field.name]}
                          onChange={handleAddressChange}
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
                            color: user.phoneNo
                              ? "primary.lighter"
                              : "error.light",
                            pl: "10px",
                          }}
                        >
                          {user.phoneNo ? user.phoneNo : "No Data"}
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
                          name="phoneNo"
                          value={user.phoneNo}
                          defaultValue={user.phoneNo}
                          onChange={handleTeleChange}
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
