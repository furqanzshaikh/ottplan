import React, { FormEvent, useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS
import { useNavigate } from "react-router-dom";

const EmpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [address, setAddress] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate()
  const addEmpUrl = import.meta.env.VITE_API_URL + `emp/add-emp`;

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/emp/add-emp' || addEmpUrl, {
        name,
        email,
        degree,
        experience,
        mobileNumber,
        role,
        city,
        state,
        joiningDate,
        address,
        isActive,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Employee added successfully:", response.data);
      toast.success("Employee added successfully!");
      setTimeout(() => {
        navigate('/table')
      }, 1000);
    } catch (err) {
      console.log(`There was an error while submitting the form: ${err}`);
      toast.error("There was an error while submitting the form.");
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer to your component */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#F6F7F8",
          p: 2,
          width: "100%",
          maxWidth: "100%",
          margin: "auto",
          borderRadius: 5,
        }}
      >
        <Box sx={{ bgcolor: "#F5F5F8", p: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Add Employee
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "#FFFFFF", borderRadius: 5, p: 3 }}>
          <form onSubmit={handleSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Degree</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Password</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Experience</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Mobile Number</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Role</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">City</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">State</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Joining Date</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Address</Typography>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Add Employee
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default EmpForm;
