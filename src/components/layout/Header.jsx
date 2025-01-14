// import {
//   AppBar,
//   Backdrop,
//   Badge,
//   Box,
//   IconButton,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import React, { Suspense, lazy, useState } from "react";
// import { orange } from "../../constants/color";
// import {
//   Add as AddIcon,
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   Group as GroupIcon,
//   Logout as LogoutIcon,
//   Notifications as NotificationsIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../constants/config";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { userNotExists } from "../../redux/reducers/auth";
// import {
//   setIsMobile,
//   setIsNewGroup,
//   setIsNotification,
//   setIsSearch,
// } from "../../redux/reducers/misc";
// import { resetNotificationCount } from "../../redux/reducers/chat";
// import { green, grey } from "@mui/material/colors";

// const SearchDialog = lazy(() => import("../specific/Search"));
// const NotifcationDialog = lazy(() => import("../specific/Notifications"));
// const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { isSearch, isNotification, isNewGroup } = useSelector(
//     (state) => state.misc
//   );
//   const { notificationCount } = useSelector((state) => state.chat);

//   const handleMobile = () => dispatch(setIsMobile(true));

//   const openSearch = () => dispatch(setIsSearch(true));

//   const openNewGroup = () => {
//     dispatch(setIsNewGroup(true));
//   };

//   const openNotification = () => {
//     dispatch(setIsNotification(true));
//     dispatch(resetNotificationCount());
//   };

//   const navigateToGroup = () => navigate("/groups");

//   const logoutHandler = async () => {
//     try {
//       const { data } = await axios.get(`${server}/api/v1/user/logout`, {
//         withCredentials: true,
//       });
//       dispatch(userNotExists());
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} height={"4rem"}>
//         <AppBar
//           position="static"
//           sx={{
//             bgcolor: grey,
//           }}
//         >
//           <Toolbar>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: { xs: "none", sm: "block" },
//               }}
//             >
//               Kurakani
//             </Typography>

//             <Box
//               sx={{
//                 display: { xs: "block", sm: "none" },
//               }}
//             >
//               <IconButton color="inherit" onClick={handleMobile}>
//                 <MenuIcon />
//               </IconButton>
//             </Box>
//             <Box
//               sx={{
//                 flexGrow: 1,
//               }}
//             />
//             <Box>
//               <IconBtn
//                 title={"Search"}
//                 icon={<SearchIcon />}
//                 onClick={openSearch}
//               />

//               <IconBtn
//                 title={"New Group"}
//                 icon={<AddIcon />}
//                 onClick={openNewGroup}
//               />

//               <IconBtn
//                 title={"Manage Groups"}
//                 icon={<GroupIcon />}
//                 onClick={navigateToGroup}
//               />

//               <IconBtn
//                 title={"Notifications"}
//                 icon={<NotificationsIcon />}
//                 onClick={openNotification}
//                 value={notificationCount}
//               />

//               <IconBtn
//                 title={"Logout"}
//                 icon={<LogoutIcon />}
//                 onClick={logoutHandler}
//               />
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </Box>

//       {isSearch && (
//         <Suspense fallback={<Backdrop open />}>
//           <SearchDialog />
//         </Suspense>
//       )}

//       {isNotification && (
//         <Suspense fallback={<Backdrop open />}>
//           <NotifcationDialog />
//         </Suspense>
//       )}

//       {isNewGroup && (
//         <Suspense fallback={<Backdrop open />}>
//           <NewGroupDialog />
//         </Suspense>
//       )}
//     </>
//   );
// };

// const IconBtn = ({ title, icon, onClick, value }) => {
//   return (
//     <Tooltip title={title}>
//       <IconButton color="inherit" size="large" onClick={onClick}>
//         {value ? (
//           <Badge badgeContent={value} color="error">
//             {icon}
//           </Badge>
//         ) : (
//           icon
//         )}
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default Header;


import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
import { green, grey } from "@mui/material/colors";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));
  const openSearch = () => dispatch(setIsSearch(true));
  const openNewGroup = () => dispatch(setIsNewGroup(true));
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };
  const navigateToGroup = () => navigate("/groups");

  // -- NEW: State and handlers for confirming logout --
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);

  const openLogoutConfirmation = () => {
    setConfirmLogoutDialog(true);
  };

  const handleLogoutCancel = () => {
    setConfirmLogoutDialog(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setConfirmLogoutDialog(false);
    }
  };
  // ---------------------------------------------------

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: grey,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Kurakani
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

              {/* Replace direct logout with opening the confirmation dialog */}
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={openLogoutConfirmation}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}

      {/* -- Dialog for Logout Confirmation -- */}
      <Dialog
        open={confirmLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="confirm-logout-dialog-title"
        aria-describedby="confirm-logout-dialog-description"
      >
        <DialogTitle id="confirm-logout-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            No
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* ------------------------------------ */}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
