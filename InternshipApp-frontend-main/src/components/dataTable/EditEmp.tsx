import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditItem = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { state: rowData } = location;

    const [name, setName] = useState(rowData?.name);
    const [email, setEmail] = useState(rowData?.email);
    const [degree, setDegree] = useState(rowData?.degree);
    const [experience, setExperience] = useState(rowData?.experience);
    const [mobileNumber, setMobileNumber] = useState(rowData?.mobileNumber);
    const [role, setRole] = useState(rowData?.role);
    const [city, setCity] = useState(rowData?.city);
    const [state, setState] = useState(rowData?.state);
    const [joiningDate, setJoiningDate] = useState(() => {
        if (rowData?.joiningDate) {
            return new Date(rowData.joiningDate).toISOString().split('T')[0];
        }
        return '';
    });
    const [address, setAddress] = useState(rowData?.address);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = event.target.value;
        setJoiningDate(dateString);
    };

    const updateEmpsUrl = import.meta.env.VITE_API_URL + `emp/update-emp/${id}`;

    const handleEditData = async (e: FormEvent) => {
        e.preventDefault();
        const isoDate = new Date(joiningDate).toISOString();

        try {
            await axios.patch(`http://localhost:3000/emp/update-emp/${id}` || updateEmpsUrl, {
                name,
                email,
                degree,
                experience,
                mobileNumber,
                role,
                city,
                state,
                joiningDate: isoDate,
                address
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            toast.success("Form edited successfully!");
            setTimeout(() => {
                navigate("/table");
            }, 1000);
            
        } catch (err) {
            console.error("Error submitting edit form", err);
            toast.error("Error editing form. Please try again.");
        }
    }

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
                    Edit Employee
                </Typography>
            </Box>
            <Box sx={{ bgcolor: "#FFFFFF", borderRadius: 5, p: 3 }}>
                <form onSubmit={handleEditData}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Name</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Degree</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Degree"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Experience</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Mobile Number</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Role</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>City</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>State</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Joining Date</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                value={joiningDate}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Address</Typography>
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
                                    Edit Form
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <ToastContainer />
        </Box>
    );
}
