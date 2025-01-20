// import { Stack } from "@mui/material";
// import React from "react";
// import ChatItem from "../shared/ChatItem";

// const ChatList = ({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessagesAlert = [
//     {
//       chatId: "",
//       count: 0,
//     },
//   ],
//   handleDeleteChat,
// }) => {
//   return (
//     <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
//       {chats?.map((data, index) => {
//         const { avatar, _id, name, groupChat, members } = data;

//         const newMessageAlert = newMessagesAlert.find(
//           ({ chatId }) => chatId === _id
//         );

//         const isOnline = members?.some((member) =>
//           onlineUsers.includes(member)
//         );

//         return (
//           <ChatItem
//             index={index}
//             newMessageAlert={newMessageAlert}
//             isOnline={isOnline}
//             avatar={avatar}
//             name={name}
//             _id={_id}
//             key={_id}
//             groupChat={groupChat}
//             sameSender={chatId === _id}
//             handleDeleteChat={handleDeleteChat}
//           />
//         );
//       })}
//     </Stack>
//   );
// };

// export default ChatList;

import { Stack, TextField, Typography, InputAdornment, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {/* Title */}
      <Typography
        variant="h6"
        component="div"
        textAlign="left"
        padding={"0 1rem"}
        sx={{ marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Messages
      </Typography>

      <Divider sx={{ margin: "0 1rem" }} />

      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search chats..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          margin: "1rem",
          borderRadius: "50px",
          width: "calc(100% - 1in)", // Shortened by 1 inch
          ".MuiOutlinedInput-root": {
            borderRadius: "50px",
            height: 35,
          },
        }}
      />

      <Divider sx={{ margin: "0 1rem" }} />

      {/* Chat Items */}
      {filteredChats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <>
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
            <Divider sx={{ margin: "0 1rem" }} />
          </>
        );
      })}
    </Stack>
  );
};

export default ChatList;
