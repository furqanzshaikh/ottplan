import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useState, FormEvent } from 'react';
import axios from 'axios';

export const EditIntern = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { state: rowData } = location;
    
    const [name, setName] = useState(rowData?.name);
    const [email, setEmail] = useState(rowData?.email);
    const [degree, setDegree] = useState(rowData?.degree);
    const [passoutYear, setPassoutYear] = useState(rowData?.passoutYear);
    const [college, setCollege] = useState(rowData?.college);
    const [skills, setSkills] = useState(rowData?.skills);
    const [experience, setExperience] = useState(rowData?.experience);
    const [certificate, setCertificate] = useState(rowData?.certificate);
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
    const editRoleUrl = import.meta.env.VITE_API_URL + `role/update-role/${id}`;
    const getSingle = import.meta.env.VITE_API_URL + `role/get-role/${id}`;

    const handleEditData = async (e: FormEvent) => {
        e.preventDefault();
        const isoDate = new Date(joiningDate).toISOString();

        await axios.patch(editRoleUrl || `http://localhost:3000/role/update-role/${id}`, {
            name,
            email,
            degree,
            passoutYear,
            college,
            skills,
            experience,
            certificate,
            city,
            state,
            joiningDate: isoDate,
            address
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response, "edit form Response");
                alert("Intern details edited successfully!!");
                navigate("/role-table");
            })
            .catch((err) => {
                console.log(err, "error submitting edit form");
            })
    };
    console.log(rowData)
    const getSingleRole = async()=>{
     const response = await axios.get(getSingle ||`http://localhost:3000/role/get-role/${id}`)
     console.log(response.data)

    }

useEffect(() => {
    getSingleRole()
}, [])

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
                    Edit Role 
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
                            <Typography variant="body2" sx={{ mb: 1 }}>Passout Year</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Passout Year"
                                value={passoutYear}
                                onChange={(e) => setPassoutYear(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>College</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="College"
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Skills</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
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
                            <Typography variant="body2" sx={{ mb: 1 }}>Certificate</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Certificate"
                                value={certificate}
                                onChange={(e) => setCertificate(e.target.value)}
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
                                    Edit Intern
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}
