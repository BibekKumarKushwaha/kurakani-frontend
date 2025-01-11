// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { Phone as PhoneIcon, Lock as LockIcon, Key as KeyIcon } from "@mui/icons-material";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { server } from "../constants/config";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP
//   const [formData, setFormData] = useState({
//     phoneNumber: "",
//     otp: "",
//     newPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSendOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${server}/api/v1/auth/forgot-password`, {
//         phoneNumber: formData.phoneNumber,
//       });

//       if (response.data.success) {
//         toast.success("OTP sent to your phone number!");
//         setStep(2); // Move to step 2
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtpAndResetPassword = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${server}/api/v1/auth/verify-otp`, {
//         phoneNumber: formData.phoneNumber,
//         otp: formData.otp,
//         newPassword: formData.newPassword,
//       });

//       if (response.data.success) {
//         toast.success("Password updated successfully!");
//         setStep(1); // Reset step to 1 for potential reuse
//         setFormData({ phoneNumber: "", otp: "", newPassword: "" });
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Failed to reset password."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Stack
//         spacing={3}
//         direction="column"
//         alignItems="center"
//         sx={{ padding: 3 }}
//       >
//         <Typography variant="h5" fontWeight="bold" color="primary">
//           {step === 1 ? "Forgot Password" : "Reset Password"}
//         </Typography>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             step === 1 ? handleSendOtp() : handleVerifyOtpAndResetPassword();
//           }}
//           style={{ width: "100%", maxWidth: "400px" }}
//         >
//           <Stack spacing={2}>
//             {step === 1 && (
//               <>
//                 <TextField
//                   label="Phone Number"
//                   variant="outlined"
//                   fullWidth
//                   value={formData.phoneNumber}
//                   name="phoneNumber"
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{
//                     startAdornment: <PhoneIcon />,
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#1976D2",
//                     color: "white",
//                     textTransform: "none",
//                     "&:hover": {
//                       bgcolor: "#1976D2",
//                     },
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? "Sending OTP..." : "Send OTP"}
//                 </Button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <TextField
//                   label="OTP"
//                   variant="outlined"
//                   fullWidth
//                   value={formData.otp}
//                   name="otp"
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{
//                     startAdornment: <KeyIcon />,
//                   }}
//                 />
//                 <TextField
//                   label="New Password"
//                   variant="outlined"
//                   fullWidth
//                   value={formData.newPassword}
//                   name="newPassword"
//                   onChange={handleInputChange}
//                   required
//                   type="password"
//                   InputProps={{
//                     startAdornment: <LockIcon />,
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#1976D2",
//                     color: "white",
//                     textTransform: "none",
//                     "&:hover": {
//                       bgcolor: "#1976D2",
//                     },
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? "Resetting Password..." : "Reset Password"}
//                 </Button>
//               </>
//             )}
//           </Stack>
//         </form>
//       </Stack>
//     </>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Phone as PhoneIcon, Lock as LockIcon, Key as KeyIcon } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../constants/config";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${server}/api/v1/user/forgot-password`, {
        phoneNumber: formData.phoneNumber,
      });

      if (response.data.success) {
        toast.success("OTP sent to your phone number!");
        setStep(2);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${server}/api/v1/user/verify-otp`, {
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
      }
    } catch (error) {
      toast.error("Error verifying OTP or resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4" mb={2} textAlign="center">
        Forgot Password
      </Typography>

      {step === 1 ? (
        <>
          <TextField
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <PhoneIcon />,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSendOtp}
            disabled={loading}
            sx={{ marginTop: "10px" }}
          >
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="OTP"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <KeyIcon />,
            }}
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <LockIcon />,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleVerifyOtp}
            disabled={loading}
            sx={{ marginTop: "10px" }}
          >
            Reset Password
          </Button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

