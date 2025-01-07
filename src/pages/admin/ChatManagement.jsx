// import { useFetchData } from "6pp";
// import { Avatar, Skeleton, Stack } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import AvatarCard from "../../components/shared/AvatarCard";
// import Table from "../../components/shared/Table";
// import { server } from "../../constants/config";
// import { useErrors } from "../../hooks/hook";
// import { transformImage } from "../../lib/features";

// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     headerClassName: "table-header",
//     width: 200,
//   },
//   {
//     field: "avatar",
//     headerName: "Avatar",
//     headerClassName: "table-header",
//     width: 150,
//     renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
//   },

//   {
//     field: "name",
//     headerName: "Name",
//     headerClassName: "table-header",
//     width: 300,
//   },

//   {
//     field: "groupChat",
//     headerName: "Group",
//     headerClassName: "table-header",
//     width: 100,
//   },
//   {
//     field: "totalMembers",
//     headerName: "Total Members",
//     headerClassName: "table-header",
//     width: 120,
//   },
//   {
//     field: "members",
//     headerName: "Members",
//     headerClassName: "table-header",
//     width: 400,
//     renderCell: (params) => (
//       <AvatarCard max={100} avatar={params.row.members} />
//     ),
//   },
//   {
//     field: "totalMessages",
//     headerName: "Total Messages",
//     headerClassName: "table-header",
//     width: 120,
//   },
//   {
//     field: "creator",
//     headerName: "Created By",
//     headerClassName: "table-header",
//     width: 250,
//     renderCell: (params) => (
//       <Stack direction="row" alignItems="center" spacing={"1rem"}>
//         <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
//         <span>{params.row.creator.name}</span>
//       </Stack>
//     ),
//   },
// ];

// const ChatManagement = () => {
//   const { loading, data, error } = useFetchData(
//     `${server}/api/v1/admin/chats`,
//     "dashboard-chats"
//   );

//   useErrors([
//     {
//       isError: error,
//       error: error,
//     },
//   ]);

//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setRows(
//         data.chats.map((i) => ({
//           ...i,
//           id: i._id,
//           avatar: i.avatar.map((i) => transformImage(i, 50)),
//           members: i.members.map((i) => transformImage(i.avatar, 50)),
//           creator: {
//             name: i.creator.name,
//             avatar: transformImage(i.creator.avatar, 50),
//           },
//         }))
//       );
//     }
//   }, [data]);

//   return (
//     <AdminLayout>
//       {loading ? (
//         <Skeleton height={"100vh"} />
//       ) : (
//         <Table heading={"All Chats"} columns={columns} rows={rows} />
//       )}
//     </AdminLayout>
//   );
// };

// export default ChatManagement;



import { Avatar, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/admin/chats`, {
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
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
          members: chat.members.map((member) =>
            transformImage(member.avatar, 50)
          ),
          creator: {
            name: chat.creator.name,
            avatar: transformImage(chat.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Groups"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;

