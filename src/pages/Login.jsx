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
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import loginImage from "../assets/register.jpg";
// import backgroundImage from "../assets/bg.jpg";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const toggleLogin = () => setIsLogin((prev) => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");
//   const phoneNumber = useInputValidation("");

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
//     formData.append("phoneNumber", phoneNumber.value);

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
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "flex-start",
//         alignItems: "center",
//       }}
//     >
//       <Container
//         component="main"
//         maxWidth="xl"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           width: "100%",
//           height: "100%",
//           padding: 0,
//         }}
//       >
//         <Paper
//           elevation={5}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 2,
//             borderRadius: "10px",
//             maxWidth: "360px",
//             width: "100%",
//             backgroundColor: "rgba(255, 255, 255, 0.9)",
//             boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//             marginLeft: "10px",
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
//               <form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
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
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                   <Link
//                     href="#"
//                     underline="hover"
//                     sx={{
//                       color: "#1976d2",
//                       fontWeight: 600,
//                       cursor: "pointer",
//                     }}
//                     onClick={() => navigate("/forgot-password")}
//                   >
//                     Forgot Password?
//                   </Link>
//                   <FormControlLabel
//                     control={<Checkbox color="primary" />}
//                     label="Remember Me"
//                   />
//                 </Stack>
//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                     padding: "0.6rem",
//                     fontSize: "0.9rem",
//                     fontWeight: 600,
//                     borderRadius: "6px",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Login
//                 </Button>
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
//                 mb={3}
//                 sx={{ color: "#1976d2", fontSize: "1.8rem" }}
//               >
//                 Create an Account
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 textAlign="center"
//                 mb={3}
//                 sx={{ color: "#1976d2", fontSize: "1.1rem" }}
//               >
//                 Join us and start your journey today.
//               </Typography>
//               <div style={{ textAlign: "center", marginBottom: "15px" }}>
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   style={{
//                     width: "70px",
//                     height: "70px",
//                     objectFit: "contain",
//                     borderRadius: "50%",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </div>
//               <form onSubmit={handleSignUp} style={{ marginTop: "1rem" }}>
//                 <Stack position="relative" width="6rem" margin="auto">
//                   <Avatar
//                     sx={{
//                       width: "6rem",
//                       height: "6rem",
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
//                   sx={{ marginTop: "1rem" }}
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
//                 <TextField
//                   required
//                   fullWidth
//                   label="Phone Number"
//                   margin="normal"
//                   variant="outlined"
//                   value={phoneNumber.value}
//                   onChange={phoneNumber.changeHandler}
//                 />
//                 <Button
//                   sx={{
//                     marginTop: "0.8rem",
//                     padding: "0.6rem",
//                     fontSize: "0.9rem",
//                     fontWeight: 600,
//                     borderRadius: "6px",
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
//         <div style={{
//           flexGrow: 1,
//           height: "100vh",
//           backgroundImage: `url(${loginImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }} />
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
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImage from "../assets/register.jpg";
import backgroundImage from "../assets/bg.jpg";

// -- NEW: Phone number validator to ensure exactly 10 digits --
const phoneNumberValidator = (value) => {
  if (!/^\d{10}$/.test(value)) {
    return "Please enter a valid 10-digit phone number";
  }
  return null;
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  // -- USE phoneNumberValidator for phoneNumber field --
  const phoneNumber = useInputValidation("", phoneNumberValidator);

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
    formData.append("phoneNumber", phoneNumber.value);

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
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          padding: 0,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            borderRadius: "10px",
            maxWidth: "360px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            marginLeft: "10px",
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
              <form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/forgot_password")}
                  >
                    Forgot Password?
                  </Link>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember Me"
                  />
                </Stack>
                <Button
                  sx={{
                    marginTop: "1rem",
                    padding: "0.6rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    borderRadius: "6px",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>
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
                mb={3}
                sx={{ color: "#1976d2", fontSize: "1.8rem" }}
              >
                Create an Account
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign="center"
                mb={3}
                sx={{ color: "#1976d2", fontSize: "1.1rem" }}
              >
                Join us and start your journey today.
              </Typography>
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
              <form onSubmit={handleSignUp} style={{ marginTop: "1rem" }}>
                <Stack position="relative" width="6rem" margin="auto">
                  <Avatar
                    sx={{
                      width: "6rem",
                      height: "6rem",
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
                  sx={{ marginTop: "1rem" }}
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
                {/* 
                  -- Now phoneNumber has a validator for exactly 10 digits --
                  We pass `error` and `helperText` to show any validation errors 
                */}
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  variant="outlined"
                  value={phoneNumber.value}
                  onChange={phoneNumber.changeHandler}
                  error={Boolean(phoneNumber.error)}
                  helperText={phoneNumber.error || ""}
                />
                <Button
                  sx={{
                    marginTop: "0.8rem",
                    padding: "0.6rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    borderRadius: "6px",
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
        <div
          style={{
            flexGrow: 1,
            height: "100vh",
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Container>
    </div>
  );
};

export default Login;
