


// import { Avatar, Skeleton } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Table from "../../components/shared/Table";
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
//     renderCell: (params) => (
//       <Avatar alt={params.row.name} src={params.row.avatar} />
//     ),
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     headerClassName: "table-header",
//     width: 200,
//   },
//   {
//     field: "username",
//     headerName: "Username",
//     headerClassName: "table-header",
//     width: 200,
//   },
//   {
//     field: "friends",
//     headerName: "Friends",
//     headerClassName: "table-header",
//     width: 150,
//   },
//   {
//     field: "groups",
//     headerName: "Groups",
//     headerClassName: "table-header",
//     width: 200,
//   },
// ];

// const UserManagement = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [rows, setRows] = useState([]);

//   useErrors([
//     {
//       isError: error,
//       error: error,
//     },
//   ]);

//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   };
//   const token = getCookie("chattu-admin-token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/v1/admin/users`,{
//           headers:{
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           }
//         });
//         console.log("token ",token)
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

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data) {
//       setRows(
//         data.users.map((user) => ({
//           ...user,
//           id: user._id,
//           avatar: transformImage(user.avatar, 50),
//         }))
//       );
//     }
//   }, [data]);

//   return (
//     <AdminLayout>
//       {loading ? (
//         <Skeleton height={"100vh"} />
//       ) : (
//         <Table heading={"All Users"} columns={columns} rows={rows} />
//       )}
//     </AdminLayout>
//   );
// };

// export default UserManagement;


import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const { id } = useParams(); // Get the `id` parameter from the URL

  useErrors([{ isError: error, error }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = id
          ? `http://localhost:3000/api/v1/admin/users/${id}` // Endpoint for a single user
          : `http://localhost:3000/api/v1/admin/users`; // Endpoint for all users

        const response = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(id ? [result.user] : result.users); // Handle single or multiple users
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      setRows(
        data.map((user) => ({
          ...user,
          id: user._id,
          avatar: transformImage(user.avatar, 50),
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
          heading={id ? "User Details" : "All Users"}
          columns={columns}
          rows={rows}
        />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
