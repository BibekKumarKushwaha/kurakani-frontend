

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
//       const response = await axios.post(`${server}/api/v1/user/forgot_password`, {
//         phoneNumber: formData.phoneNumber,
//       });

//       if (response.data.success) {
//         toast.success("OTP sent to your phone number!");
//         setStep(2);
//       }
//     } catch (error) {
//       toast.error("Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${server}/api/v1/user/verify_otp`, {
//         otp: formData.otp,
//         newPassword: formData.newPassword,
//       });

//       if (response.data.success) {
//         toast.success("Password reset successfully!");
//       }
//     } catch (error) {
//       toast.error("Error verifying OTP or resetting password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <Typography variant="h4" mb={2} textAlign="center">
//         Forgot Password
//       </Typography>

//       {step === 1 ? (
//         <>
//           <TextField
//             label="Phone Number"
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputProps={{
//               startAdornment: <PhoneIcon />,
//             }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSendOtp}
//             disabled={loading}
//             sx={{ marginTop: "10px" }}
//           >
//             Send OTP
//           </Button>
//         </>
//       ) : (
//         <>
//           <TextField
//             label="OTP"
//             type="text"
//             name="otp"
//             value={formData.otp}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputProps={{
//               startAdornment: <KeyIcon />,
//             }}
//           />
//           <TextField
//             label="New Password"
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputProps={{
//               startAdornment: <LockIcon />,
//             }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleVerifyOtp}
//             disabled={loading}
//             sx={{ marginTop: "10px" }}
//           >
//             Reset Password
//           </Button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default ForgotPassword;


// import React, { useState } from 'react';
// import { useForgotPasswordMutation, useVerifyOtpMutation } from '../redux/api/api';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ForgotPassword = () => {
//     const [phone, setPhone] = useState('');
//     const [isSent, setIsSent] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [loading, setLoading] = useState(false);

//     const [forgotPassword] = useForgotPasswordMutation();
//     const [verifyOtp] = useVerifyOtpMutation();

//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const res = await forgotPassword({ phoneNumber: phone }).unwrap();
//             toast.success(res.message);
//             setIsSent(true);
//         } catch (error) {
//             toast.error(error.data?.message || 'Error sending OTP. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const res = await verifyOtp({ phoneNumber: phone, otp, newPassword }).unwrap();
//             toast.success(res.message);
//         } catch (error) {
//             toast.error(error.data?.message || 'Error verifying OTP or resetting password.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h3>Forgot Password</h3>
//             <form>
//                 <div>
//                     <span>
//                         <h4>+977</h4>
//                         <input
//                             disabled={isSent}
//                             onChange={(e) => setPhone(e.target.value)}
//                             type="number"
//                             placeholder="Enter valid phone number"
//                         />
//                     </span>
//                 </div>
//                 <button
//                     disabled={isSent || loading}
//                     onClick={handleSendOtp}
//                 >
//                     {loading && !isSent ? 'Sending...' : 'Send OTP'}
//                 </button>

//                 {isSent && (
//                     <>
//                         <hr />
//                         <p>OTP has been sent to {phone} ✅</p>
//                         <div>
//                             <input
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 type="number"
//                                 placeholder="Enter valid OTP"
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 type="password"
//                                 placeholder="Set new password"
//                             />
//                         </div>
//                         <button
//                             disabled={loading}
//                             onClick={handleVerifyOtp}
//                         >
//                             {loading ? 'Processing...' : 'Verify OTP and Set Password'}
//                         </button>
//                     </>
//                 )}
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default ForgotPassword;



import React, { useState } from 'react';
import { useForgotPasswordMutation, useVerifyOtpMutation } from '../redux/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/background.png';

const ForgotPassword = () => {
    const [phone, setPhone] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await forgotPassword({ phoneNumber: Number(phone) }).unwrap();
            toast.success(res.message);
            setIsSent(true);
        } catch (error) {
            toast.error(error.data?.message || 'Error sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await verifyOtp({ phoneNumber: Number(phone), otp: Number(otp), newPassword }).unwrap();
            toast.success(res.message);
        } catch (error) {
            toast.error(error.data?.message || 'Error verifying OTP or resetting password.');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const boxStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        marginBottom: '15px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const dividerStyle = {
        margin: '20px 0',
        border: '1px solid #ddd',
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Forgot Password</h3>
                <form>
                    <div>
                        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#555' }}>Phone Number</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px', fontSize: '1rem', color: '#333' }}>+977</span>
                            <input
                                id="phone"
                                disabled={isSent}
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                style={inputStyle}
                                placeholder="Enter valid phone number"
                            />
                        </div>
                    </div>
                    <button
                        disabled={isSent || loading}
                        onClick={handleSendOtp}
                        style={buttonStyle}
                    >
                        {loading && !isSent ? 'Sending...' : 'Send OTP'}
                    </button>

                    {isSent && (
                        <>
                            <hr style={dividerStyle} />
                            <p style={{ textAlign: 'center', color: '#333', marginBottom: '15px' }}>OTP has been sent to {phone} ✅</p>
                            <div>
                                <label htmlFor="otp" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#555' }}>OTP</label>
                                <input
                                    id="otp"
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="number"
                                    style={inputStyle}
                                    placeholder="Enter valid OTP"
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#555' }}>New Password</label>
                                <input
                                    id="newPassword"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password"
                                    style={inputStyle}
                                    placeholder="Set new password"
                                />
                            </div>
                            <button
                                disabled={loading}
                                onClick={handleVerifyOtp}
                                style={buttonStyle}
                            >
                                {loading ? 'Processing...' : 'Verify OTP and Set Password'}
                            </button>
                        </>
                    )}
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPassword;
