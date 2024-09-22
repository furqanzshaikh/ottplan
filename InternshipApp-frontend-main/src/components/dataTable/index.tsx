import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Row {
  id: number;
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
  serviceType: string;
}

const DataTable = () => {
  const [searchText] = useState<string>('');
  const [filterText] = useState<string>('');
  const [profileData, setProfileData] = useState<Row[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 150 },
      { accessorKey: 'email', header: 'Email', size: 200 },
      { accessorKey: 'degree', header: 'Degree', size: 150 },
      { accessorKey: 'experience', header: 'Experience', size: 100 },
      { accessorKey: 'mobileNumber', header: 'Mobile Number', size: 150 },
      { accessorKey: 'role', header: 'Role', size: 100 },
      { accessorKey: 'city', header: 'City', size: 150 },
      { accessorKey: 'state', header: 'State', size: 150 },
      {
        accessorKey: 'joiningDate',
        header: 'Joining Date',
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue<string>();
          return formatDate(dateValue);
        },
      },
      { accessorKey: 'address', header: 'Address', size: 250 },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ cell }) => (
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleEditItem(cell.row.original)}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => handleClickOpen(cell.row.original)}>Delete</Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const getEmpsUrl = import.meta.env.VITE_API_URL + "emp/all-emp";
  const deleteEmpsUrl = import.meta.env.VITE_API_URL + `emp/delete-emp/${selectedItemId}`;

  const filteredRows = useMemo(
    () =>
      profileData.filter((row) => {
        const serviceType = row.serviceType || ''; // Default to an empty string if undefined
        return (
          Object.values(row).some(
            (val) =>
              typeof val === 'string' &&
              val.toLowerCase().includes(searchText.toLowerCase())
          ) &&
          serviceType.toLowerCase().includes(filterText.toLowerCase())
        );
      }),
    [searchText, filterText, profileData]
  );

  const getAllProfiles = () => {
    axios
      .get('http://localhost:3000/emp/all-emp' || getEmpsUrl)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProfileData(response.data);
        } else {
          console.error('API did not return an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
      });
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  const handleEditItem = (row: Row) => {
    navigate(`/edit-employee/${row.id}`, { state: { ...row } });
  };

  const handleClickOpen = (row: Row) => {
    setSelectedItemId(row.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = async () => {
    if (selectedItemId === null) return;

    try {
      await axios.delete(`http://localhost:3000/emp/delete-emp/${selectedItemId}` || deleteEmpsUrl);
      toast.success('Employee deleted successfully!'); // Success message
      getAllProfiles(); // Refresh the data
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error deleting employee.'); // Error message
    } finally {
      setOpen(false);
    }
  };

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: 'bold' }}>
        Employee Info
      </Typography>

      <div style={{ overflowX: 'auto' }}>
        <MaterialReactTable
          columns={columns}
          data={filteredRows}
          initialState={{ pagination: { pageIndex: 0, pageSize: 5 }, density: 'compact' }}
          enableRowSelection
          enableDensityToggle={false}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete This Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteItem}>Yes</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DataTable;
