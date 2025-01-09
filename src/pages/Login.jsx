
// import { useFileHandler, useInputValidation } from "6pp";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import {
//   Avatar,
//   Button,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   IconButton,
//   Link,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
// import { server } from "../constants/config";
// import { userExists } from "../redux/reducers/auth";
// import { usernameValidator } from "../utils/validators";

// // Import the logo image
// import logo from "../assets/logo.png"; // Adjust path to the logo file location
// import loginImage from "../assets/login.jpg"; // Adjust path to the login image file location

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleLogin = () => setIsLogin((prev) => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");

//   const avatar = useFileHandler("single");

//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Logging In...");

//     setIsLoading(true);
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//           username: username.value,
//           password: password.value,
//         },
//         config
//       );
//       dispatch(userExists(data.user));
//       toast.success(`Welcome back, ${data.user.name}!`, {
//         id: toastId,
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Signing Up...");
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);

//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/new`,
//         formData,
//         config
//       );

//       dispatch(userExists(data.user));
//       toast.success(`Welcome, ${data.user.name}! Your account has been created.`, {
//         id: toastId,
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "white",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="xl"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <Paper
//           elevation={5}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 5,
//             borderRadius: "20px",
//             maxWidth: "450px",
//             width: "100%",
//             backgroundColor: "#f5f5f5",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography
//                 variant="h4"
//                 fontWeight={700}
//                 textAlign="center"
//                 mb={2}
//                 color="#1976d2"
//               >
//                 Welcome Back!
//               </Typography>
//               <form onSubmit={handleLogin} style={{ marginTop: "1.5rem" }}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />
//                 <FormControlLabel
//                   control={<Checkbox color="primary" />}
//                   label="Remember Me"
//                   sx={{ marginTop: "10px" }}
//                 />
//                 <Button
//                   sx={{
//                     marginTop: "1.5rem",
//                     padding: "0.8rem",
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Login
//                 </Button>
//                 <Link
//                   href="#"
//                   underline="hover"
//                   sx={{
//                     display: "block",
//                     textAlign: "center",
//                     color: "#1976d2",
//                     fontWeight: 600,
//                     marginTop: 2,
//                   }}
//                 >
//                   Forgot Password?
//                 </Link>
//                 <Button
//                   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   sx={{ color: "#1976d2", fontWeight: 600, marginTop: 2 }}
//                   onClick={toggleLogin}
//                 >
//                   New here? Sign Up
//                 </Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Typography
//                 variant="h4"
//                 fontWeight={700}
//                 textAlign="center"
//                 mb={2}
//                 color="#1976d2"
//               >
//                 Create an Account
//               </Typography>
//               <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   style={{
//                     width: "120px", // Reduced size
//                     objectFit: "contain",
//                   }}
//                 />
//               </div>
//               <form onSubmit={handleSignUp} style={{ marginTop: "1.5rem" }}>
//                 <Stack position={"relative"} width={"10rem"} margin={"auto"}>
//                   <Avatar
//                     sx={{
//                       width: "10rem",
//                       height: "10rem",
//                       objectFit: "cover",
//                       border: "2px solid #1976d2",
//                     }}
//                     src={avatar.preview}
//                   />
//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       bottom: "0",
//                       right: "0",
//                       color: "white",
//                       bgcolor: "#1976d2",
//                     }}
//                     component="label"
//                   >
//                     <CameraAltIcon />
//                     <VisuallyHiddenInput
//                       type="file"
//                       onChange={avatar.changeHandler}
//                     />
//                   </IconButton>
//                 </Stack>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   margin="normal"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Bio"
//                   margin="normal"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />
//                 <Button
//                   sx={{
//                     marginTop: "1.5rem",
//                     padding: "0.8rem",
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   sx={{ color: "#1976d2", fontWeight: 600, marginTop: 2 }}
//                   onClick={toggleLogin}
//                 >
//                   Already have an account? Login
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//         <div style={{ width: "50%", height: "100vh", overflow: "hidden" }}>
//           <img
//             src={loginImage}
//             alt="Background"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Login;

import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

// Import the logo image
import logo from "../assets/logo.png"; // Adjust path to the logo file location
import loginImage from "../assets/login.jpg"; // Adjust path to the login image file location

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const phoneNumber = useInputValidation(""); // Added phone number validation

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(`Welcome back, ${data.user.name}!`, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("phoneNumber", phoneNumber.value); // Added phone number

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(`Welcome, ${data.user.name}! Your account has been created.`, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            borderRadius: "20px",
            maxWidth: "450px",
            width: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                mb={2}
                color="#1976d2"
              >
                Welcome Back!
              </Typography>
              <form onSubmit={handleLogin} style={{ marginTop: "1.5rem" }}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember Me"
                  sx={{ marginTop: "10px" }}
                />
                <Button
                  sx={{
                    marginTop: "1.5rem",
                    padding: "0.8rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: "#1976d2",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  Forgot Password?
                </Link>
                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  sx={{ color: "#1976d2", fontWeight: 600, marginTop: 2 }}
                  onClick={toggleLogin}
                >
                  New here? Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                mb={2}
                color="#1976d2"
              >
                Create an Account
              </Typography>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "120px", // Reduced size
                    objectFit: "contain",
                  }}
                />
              </div>
              <form onSubmit={handleSignUp} style={{ marginTop: "1.5rem" }}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      border: "2px solid #1976d2",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "#1976d2",
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  variant="outlined"
                  value={phoneNumber.value}
                  onChange={phoneNumber.changeHandler}
                />
                <Button
                  sx={{
                    marginTop: "1.5rem",
                    padding: "0.8rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  sx={{ color: "#1976d2", fontWeight: 600, marginTop: 2 }}
                  onClick={toggleLogin}
                >
                  Already have an account? Login
                </Button>
              </form>
            </>
          )}
        </Paper>
        <div style={{ width: "50%", height: "100vh", overflow: "hidden" }}>
          <img
            src={loginImage}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
