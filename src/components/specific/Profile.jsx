
// import React from "react";
// import { Avatar, Stack, Typography, Button } from "@mui/material";
// import {
//   Face as FaceIcon,
//   AlternateEmail as UserNameIcon,
//   CalendarMonth as CalendarIcon,
//   Phone as PhoneIcon,  // Import the phone icon
// } from "@mui/icons-material";
// import moment from "moment";
// import { transformImage } from "../../lib/features";

// const Profile = ({ user }) => {
//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//       {/* Avatar */}
//       <Avatar
//         src={transformImage(user?.avatar?.url)}
//         sx={{
//           width: 200,
//           height: 200,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white",
//         }}
//       />

//       {/* Profile Cards */}
//       <ProfileCard heading={"Bio"} text={user?.bio} />
//       <ProfileCard
//         heading={"Username"}
//         text={user?.username}
//         Icon={<UserNameIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
//       <ProfileCard
//         heading={"Joined"}
//         text={moment(user?.createdAt).fromNow()}
//         Icon={<CalendarIcon />}
//       />
//       <ProfileCard
//         heading={"Phone Number"}  // New ProfileCard for phone number
//         text={user?.phoneNumber}  // Display the phone number
//         Icon={<PhoneIcon />}  // Add phone icon
//       />

//       {/* Edit Profile Button */}
//       <Button
//         variant="contained"
//         sx={{
//           bgcolor: "#1976D2",
//           color: "white",
//           textTransform: "none",
//           mt: "1rem",
//           "&:hover": {
//             bgcolor: "#1976D2",
//           },
//         }}
//         onClick={() => alert("Edit Profile Clicked")}
//       >
//         Edit Profile
//       </Button>
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => (
//   <Stack
//     direction={"row"}
//     alignItems={"center"}
//     spacing={"1rem"}
//     color={"white"}
//     textAlign={"center"}
//   >
//     {Icon && Icon}

//     <Stack>
//       <Typography variant="body1">{text}</Typography>
//       <Typography color={"gray"} variant="caption">
//         {heading}
//       </Typography>
//     </Stack>
//   </Stack>
// );

// export default Profile;



import React, { useState } from "react";
import { Avatar, Stack, Typography, Button, Modal, Box } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon, Phone as PhoneIcon } from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import EditProfile from "../../pages/editprofile"; // Import the EditProfile component

const Profile = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      {/* Avatar */}
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />

      {/* Profile Cards */}
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} Icon={<UserNameIcon />} />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
      <ProfileCard heading={"Phone Number"} text={user?.phoneNumber} Icon={<PhoneIcon />} />

      {/* Edit Profile Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "#1976D2",
          color: "white",
          textTransform: "none",
          mt: "1rem",
          "&:hover": {
            bgcolor: "#1976D2",
          },
        }}
        onClick={handleOpenModal}
      >
        Edit Profile
      </Button>

      {/* Modal for Edit Profile */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: 400, margin: "auto", bgcolor: "white", padding: 2 }}>
          <EditProfile /> {/* Pass the necessary data if needed */}
        </Box>
      </Modal>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
