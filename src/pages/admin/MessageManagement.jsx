// import { useFetchData } from "6pp";
// import { Avatar, Box, Stack } from "@mui/material";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import RenderAttachment from "../../components/shared/RenderAttachment";
// import Table from "../../components/shared/Table";
// import { server } from "../../constants/config";
// import { useErrors } from "../../hooks/hook";
// import { fileFormat, transformImage } from "../../lib/features";

// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     headerClassName: "table-header",
//     width: 200,
//   },
//   {
//     field: "attachments",
//     headerName: "Attachments",
//     headerClassName: "table-header",
//     width: 200,
//     renderCell: (params) => {
//       const { attachments } = params.row;

//       return attachments?.length > 0
//         ? attachments.map((i) => {
//             const url = i.url;
//             const file = fileFormat(url);

//             return (
//               <Box>
//                 <a
//                   href={url}
//                   download
//                   target="_blank"
//                   style={{
//                     color: "black",
//                   }}
//                 >
//                   {RenderAttachment(file, url)}
//                 </a>
//               </Box>
//             );
//           })
//         : "No Attachments";
//     },
//   },

//   {
//     field: "content",
//     headerName: "Content",
//     headerClassName: "table-header",
//     width: 400,
//   },
//   {
//     field: "sender",
//     headerName: "Sent By",
//     headerClassName: "table-header",
//     width: 200,
//     renderCell: (params) => (
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
//         <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
//         <span>{params.row.sender.name}</span>
//       </Stack>
//     ),
//   },
//   {
//     field: "chat",
//     headerName: "Chat",
//     headerClassName: "table-header",
//     width: 220,
//   },
//   {
//     field: "groupChat",
//     headerName: "Group Chat",
//     headerClassName: "table-header",
//     width: 100,
//   },
//   {
//     field: "createdAt",
//     headerName: "Time",
//     headerClassName: "table-header",
//     width: 250,
//   },
// ];

// const MessageManagement = () => {
//   const { loading, data, error } = useFetchData(
//     `${server}/api/v1/admin/messages`,
//     "dashboard-messages"
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
//         data.messages.map((i) => ({
//           ...i,
//           id: i._id,
//           sender: {
//             name: i.sender.name,
//             avatar: transformImage(i.sender.avatar, 50),
//           },
//           createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
//         }))
//       );
//     }
//   }, [data]);

//   return (
//     <AdminLayout>
//       {loading ? (
//         <Skeleton height={"100vh"} />
//       ) : (
//         <Table
//           heading={"All Messages"}
//           columns={columns}
//           rows={rows}
//           rowHeight={200}
//         />
//       )}
//     </AdminLayout>
//   );
// };

// export default MessageManagement;


import { Avatar, Skeleton, Box, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
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

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const token = getCookie("chattu-admin-token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/admin/messages`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Token: ", token);
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

    fetchMessages();
  }, []);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((message) => ({
          ...message,
          id: message._id,
          sender: {
            name: message.sender.name,
            avatar: transformImage(message.sender.avatar, 50),
          },
          createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;

