// import { useFetchData } from "6pp";
// import {
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Group as GroupIcon,
//   Message as MessageIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import {
//   Box,
//   Container,
//   Paper,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import moment from "moment";
// import React from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { DoughnutChart, LineChart } from "../../components/specific/Charts";
// import {
//   CurveButton,
//   SearchField,
// } from "../../components/styles/StyledComponents";
// import { matBlack } from "../../constants/color";
// import { server } from "../../constants/config";
// import { useErrors } from "../../hooks/hook";


// const Dashboard = () => {
//   const { loading, data, error } = useFetchData(
//     `${server}/api/v1/admin/stats`,
//     "dashboard-stats"
//   );

//   const { stats } = data || {};

//   useErrors([
//     {
//       isError: error,
//       error: error,
//     },
//   ]);

//   const Appbar = (
//     <Paper
//       elevation={3}
//       sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
//     >
//       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
//         <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

//         <SearchField placeholder="Search..." />

//         <CurveButton>Search</CurveButton>
//         <Box flexGrow={1} />
//         <Typography
//           display={{
//             xs: "none",
//             lg: "block",
//           }}
//           color={"rgba(0,0,0,0.7)"}
//           textAlign={"center"}
//         >
//           {moment().format("dddd, D MMMM YYYY")}
//         </Typography>

//         <NotificationsIcon />
//       </Stack>
//     </Paper>
//   );

//   const Widgets = (
//     <Stack
//       direction={{
//         xs: "column",
//         sm: "row",
//       }}
//       spacing="2rem"
//       justifyContent="space-between"
//       alignItems={"center"}
//       margin={"2rem 0"}
//     >
//       <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
//       <Widget
//         title={"Chats"}
//         value={stats?.totalChatsCount}
//         Icon={<GroupIcon />}
//       />
//       <Widget
//         title={"Messages"}
//         value={stats?.messagesCount}
//         Icon={<MessageIcon />}
//       />
//     </Stack>
//   );

//   return (
//     <AdminLayout>
//       {loading ? (
//         <Skeleton height={"100vh"} />
//       ) : (
//         <Container component={"main"}>
//           {Appbar}

//           <Stack
//             direction={{
//               xs: "column",
//               lg: "row",
//             }}
//             flexWrap={"wrap"}
//             justifyContent={"center"}
//             alignItems={{
//               xs: "center",
//               lg: "stretch",
//             }}
//             sx={{ gap: "2rem" }}
//           >
//             <Paper
//               elevation={3}
//               sx={{
//                 padding: "2rem 3.5rem",
//                 borderRadius: "1rem",
//                 width: "100%",
//                 maxWidth: "45rem",
//               }}
//             >
//               <Typography margin={"2rem 0"} variant="h4">
//                 Last Messages
//               </Typography>

//               <LineChart value={stats?.messagesChart || []} />
//             </Paper>

//             <Paper
//               elevation={3}
//               sx={{
//                 padding: "1rem ",
//                 borderRadius: "1rem",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: { xs: "100%", sm: "50%" },
//                 position: "relative",
//                 maxWidth: "25rem",
//               }}
//             >
//               <DoughnutChart
//                 labels={["Single Chats", "Group Chats"]}
//                 value={[
//                   stats?.totalChatsCount - stats?.groupsCount || 0,
//                   stats?.groupsCount || 0,
//                 ]}
//               />

//               <Stack
//                 position={"absolute"}
//                 direction={"row"}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 spacing={"0.5rem"}
//                 width={"100%"}
//                 height={"100%"}
//               >
//                 <GroupIcon /> <Typography>Vs </Typography>
//                 <PersonIcon />
//               </Stack>
//             </Paper>
//           </Stack>

//           {Widgets}
//         </Container>
//       )}
//     </AdminLayout>
//   );
// };

// const Widget = ({ title, value, Icon }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       padding: "2rem",
//       margin: "2rem 0",
//       borderRadius: "1.5rem",
//       width: "20rem",
//     }}
//   >
//     <Stack alignItems={"center"} spacing={"1rem"}>
//       <Typography
//         sx={{
//           color: "rgba(0,0,0,0.7)",
//           borderRadius: "50%",
//           border: `5px solid ${matBlack}`,
//           width: "5rem",
//           height: "5rem",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {value}
//       </Typography>
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
//         {Icon}
//         <Typography>{title}</Typography>
//       </Stack>
//     </Stack>
//   </Paper>
// );

// export default Dashboard;







// import {
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Group as GroupIcon,
//   Message as MessageIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { DoughnutChart, LineChart } from "../../components/specific/Charts";
// import {
//   CurveButton,
//   SearchField,
// } from "../../components/styles/StyledComponents";
// import { matBlack } from "../../constants/color";
// import { server } from "../../constants/config";
// import { useErrors } from "../../hooks/hook";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useErrors([
//     {
//       isError: error,
//       error: error,
//     },
//   ]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(`${server}/api/v1/admin/stats`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const result = await response.json();
//         setData(result);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const { stats } = data || {};

//   // Appbar Component
//   const Appbar = (
//     <Paper
//       elevation={3}
//       sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
//     >
//       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
//         <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
//         <SearchField placeholder="Search..." />
//         <CurveButton>Search</CurveButton>
//         <Box flexGrow={1} />
//         <Typography
//           display={{
//             xs: "none",
//             lg: "block",
//           }}
//           color={"rgba(0,0,0,0.7)"}
//           textAlign={"center"}
//         >
//           {moment().format("dddd, D MMMM YYYY")}
//         </Typography>
//         <NotificationsIcon />
//       </Stack>
//     </Paper>
//   );

//   // Widgets Component
//   const Widgets = (
//     <Stack
//       direction={{
//         xs: "column",
//         sm: "row",
//       }}
//       spacing="2rem"
//       justifyContent="space-between"
//       alignItems={"center"}
//       margin={"2rem 0"}
//     >
//       <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
//       <Widget
//         title={"Chats"}
//         value={stats?.totalChatsCount}
//         Icon={<GroupIcon />}
//       />
//       <Widget
//         title={"Messages"}
//         value={stats?.messagesCount}
//         Icon={<MessageIcon />}
//       />
//     </Stack>
//   );

//   return (
//     <AdminLayout>
//       {loading ? (
//         <Skeleton height={"100vh"} />
//       ) : (
//         <Container component={"main"}>
//           {Appbar}

//           <Grid container spacing={4} sx={{ marginTop: "1rem" }}>
//             {/* Last Messages Chart */}
//             <Grid item xs={12} lg={7}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: "2rem 3.5rem",
//                   borderRadius: "1rem",
//                   height: "100%",
//                 }}
//               >
//                 <Typography margin={"2rem 0"} variant="h4">
//                   Last Messages
//                 </Typography>
//                 <LineChart value={stats?.messagesChart || []} />
//               </Paper>
//             </Grid>

//             {/* Single and Group Comparison Chart */}
//             <Grid item xs={12} lg={5}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: "1rem",
//                   borderRadius: "1rem",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   position: "relative",
//                   height: "100%",
//                 }}
//               >
//                 <DoughnutChart
//                   labels={["Single Chats", "Group Chats"]}
//                   value={[
//                     stats?.totalChatsCount - stats?.groupsCount || 0,
//                     stats?.groupsCount || 0,
//                   ]}
//                 />
//                 <Stack
//                   position={"absolute"}
//                   direction={"row"}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                   spacing={"0.5rem"}
//                   width={"100%"}
//                   height={"100%"}
//                 >
//                   <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />
//                 </Stack>
//               </Paper>
//             </Grid>
//           </Grid>

//           {Widgets}
//         </Container>
//       )}
//     </AdminLayout>
//   );
// };

// // Widget Component
// const Widget = ({ title, value, Icon }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       padding: "2rem",
//       margin: "2rem 0",
//       borderRadius: "1.5rem",
//       width: "20rem",
//     }}
//   >
//     <Stack alignItems={"center"} spacing={"1rem"}>
//       <Typography
//         sx={{
//           color: "rgba(0,0,0,0.7)",
//           borderRadius: "50%",
//           border: `5px solid ${matBlack}`,
//           width: "5rem",
//           height: "5rem",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {value}
//       </Typography>
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
//         {Icon}
//         <Typography>{title}</Typography>
//       </Stack>
//     </Stack>
//   </Paper>
// );

// export default Dashboard;




import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredStats, setFilteredStats] = useState(null); // State for filtered stats

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${server}/api/v1/admin/stats`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setFilteredStats(result); // Initial data set to filtered stats
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredStats(data); // Reset to original data if search term is empty
      return;
    }

    // Search logic: Filter stats based on the search term
    const filteredData = {
      ...data,
      stats: {
        ...data.stats,
        usersCount: data.stats.usersCount.toString().includes(searchTerm) ? data.stats.usersCount : null,
        totalChatsCount: data.stats.totalChatsCount.toString().includes(searchTerm) ? data.stats.totalChatsCount : null,
        messagesCount: data.stats.messagesCount.toString().includes(searchTerm) ? data.stats.messagesCount : null,
        groupsCount: data.stats.groupsCount.toString().includes(searchTerm) ? data.stats.groupsCount : null,
      }
    };

    setFilteredStats(filteredData);
  };

  const { stats } = filteredStats || {};

  // Appbar Component
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <CurveButton onClick={handleSearch}>Search</CurveButton> {/* Search button */}
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  // Widgets Component
  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
      <Widget
        title={"Chats"}
        value={stats?.totalChatsCount}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={stats?.messagesCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Grid container spacing={4} sx={{ marginTop: "1rem" }}>
            {/* Last Messages Chart */}
            <Grid item xs={12} lg={7}>
              <Paper
                elevation={3}
                sx={{
                  padding: "2rem 3.5rem",
                  borderRadius: "1rem",
                  height: "100%",
                }}
              >
                <Typography margin={"2rem 0"} variant="h4">
                  Last Messages
                </Typography>
                <LineChart value={stats?.messagesChart || []} />
              </Paper>
            </Grid>

            {/* Single and Group Comparison Chart */}
            <Grid item xs={12} lg={5}>
              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  height: "100%",
                }}
              >
                <DoughnutChart
                  labels={["Single Chats", "Group Chats"]}
                  value={[stats?.totalChatsCount - stats?.groupsCount || 0, stats?.groupsCount || 0]}
                />
                <Stack
                  position={"absolute"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={"0.5rem"}
                  width={"100%"}
                  height={"100%"}
                >
                  <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

// Widget Component
const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
