


import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { Face as FaceIcon, Phone as PhoneIcon, CameraAlt as CameraAltIcon } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../constants/config";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth); // Assuming user state is in Redux
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
    avatar: user?.avatar?.url || "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: file, // Store the file for FormData submission
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("bio", formData.bio);
    updatedData.append("phoneNumber", formData.phoneNumber);

    if (formData.avatar instanceof File) {
      updatedData.append("avatar", formData.avatar);
    }

    try {
      const response = await axios.put(
        `${server}/api/v1/user/me`,
        updatedData,
        { withCredentials: true }
      );

      const updatedUser = response.data.user;
      setFormData((prevData) => ({
        ...prevData,
        avatar: updatedUser.avatar?.url || prevData.avatar,
      }));

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Stack spacing={3} direction="column" alignItems="center" sx={{ padding: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Edit Profile
        </Typography>
        <Stack position="relative" width="8rem" margin="auto">
          <Avatar
            src={
              formData.avatar instanceof File
                ? URL.createObjectURL(formData.avatar)
                : formData.avatar
            }
            sx={{
              width: 150,
              height: 150,
              objectFit: "cover",
              marginBottom: "1rem",
              border: "5px solid white",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              color: "white",
              bgcolor: "#1976D2",
            }}
            component="label"
          >
            <CameraAltIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </IconButton>
        </Stack>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: <FaceIcon />,
              }}
            />
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              value={formData.bio}
              name="bio"
              onChange={handleInputChange}
              required
              multiline
              rows={4}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: <PhoneIcon />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#1976D2",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#1976D2",
                },
              }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default EditProfile;
