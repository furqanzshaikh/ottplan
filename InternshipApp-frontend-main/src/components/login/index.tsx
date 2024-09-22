import React, { FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InternshipLogo from "../../assets/images/adminLogo.jpg";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const loginURL = import.meta.env.VITE_API_URL + "auth/login";
  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post( 'http://localhost:3000/auth/login'  , {
        email,
        password,
      });

      console.log(response.data);
      localStorage.setItem("accessToken", response.data.token);
      toast.success("Logged in successfully!", {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500); // Delay to allow the toast to display before redirecting
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        toast.error("Invalid email or password.", {
          position: "top-right",
        });
      } else {
        toast.error("An error occurred while logging in.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8f7fa",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "white",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
          borderRadius: 2,
          fontFamily: "'Ubuntu' sans-serif",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={InternshipLogo} alt="Logo" style={{ maxWidth: "80%", height: "10rem" }} />
        </Box>

        <Typography
          sx={{
            p: "1rem",
            textAlign: "left",
            color: "#333533",
            fontSize: "18px",
            fontWeight: "500",
            mb: "-20px",
          }}
        >
          LOGIN
        </Typography>
        <Typography
          sx={{
            p: 2,
            fontSize: "13px",
            color: "grey",
            textAlign: "left",
          }}
        >
          Please sign-in to your account and explore
        </Typography>
        <form onSubmit={handleLoginClick}>
          <Box sx={{ p: 1, mt: 2 }}>
            <Typography
              sx={{
                mb: "0.25rem",
                px: 2,
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(47, 43, 61, 0.78) !important",
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              placeholder="johndoe@gmail.com"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
            />
            <Typography
              sx={{
                mt: "0.9rem",
                mb: "0.25rem",
                px: 2,
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(47, 43, 61, 0.78) !important",
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              placeholder="Password"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            {error && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "left",
                  mt: 1,
                  ml: 2,
                }}
              >
                {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#e63946 !important",
                  width: "50%",
                  fontSize: "0.9375rem",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "2rem",
                }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
