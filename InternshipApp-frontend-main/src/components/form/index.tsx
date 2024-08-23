
import React, { FormEvent, useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  degree: string;
  experience: string;
  mobileNumber: string;
  role: string;
  city: string;
  state: string;
  joiningDate: string;
  address: string;
}

const EmpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    degree: "",
    experience: "",
    mobileNumber: "",
    role: "",
    city: "",
    state: "",
    joiningDate: "",
    address: "",
  });

  // const formUrl = import.meta.env.VITE_API_URL + "form/form-details";

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const addEmpUrl =import.meta.env.VITE_API_URL +`emp/add-emp/`;
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(addEmpUrl||'http://localhost:3000/emp/add-emp', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("response", response);
      setFormData({
        name: "",
        email: "",
        degree: "",
        experience: "",
        mobileNumber: "",
        role: "",
        city: "",
        state: "",
        joiningDate: "",
        address: "",
      });
    } catch (err) {
      console.log(`There was an error while submitting the form: ${err}`);
    }
  };

  return (
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
              <Typography variant="body2" sx={{ mb: 1 }}>Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Degree</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Degree"
                required
                value={formData.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Experience</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Experience"
                required
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Mobile Number</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Mobile Number"
                required
                value={formData.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Role</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Role"
                required
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>City</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>State</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="State"
                required
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Joining Date</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                value={formData.joiningDate}
                onChange={(e) => handleChange('joiningDate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>Address</Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={4}
                placeholder="Address"
                variant="outlined"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EmpForm;