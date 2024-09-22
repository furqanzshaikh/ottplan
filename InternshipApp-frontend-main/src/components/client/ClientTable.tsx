import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InternRow } from '../internForm/subComponent/row';
import { ToastContainer, toast } from "react-toastify";


const ClientTable = () => {
  const [searchText] = useState<string>('');
  const [filterText] = useState<string>('');
  const [internData, setInternData] = useState<InternRow[]>([]);
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
  
  const columns = useMemo<MRT_ColumnDef<InternRow>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 150 },
      { accessorKey: 'email', header: 'Email', size: 200 },
      { accessorKey: 'degree', header: 'Degree', size: 150 },
      { accessorKey: 'passoutYear', header: 'Passout Year', size: 100 },
      { accessorKey: 'college', header: 'College', size: 200 },
      { accessorKey: 'skills', header: 'Skills', size: 150 },
      { accessorKey: 'experience', header: 'Experience', size: 100 },
      { accessorKey: 'certificate', header: 'Certificate', size: 200 },
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
  const getClientUrl = import.meta.env.VITE_API_URL + "client/all-clients";
  const deleteClientUrl = import.meta.env.VITE_API_URL + `client/delete-client/${selectedItemId}`;

  const filteredRows = useMemo(
    () =>
      internData.filter((row) => {
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
    [searchText, filterText, internData]
  );
  
  const getAllInterns = () => {
    axios
      .get('http://localhost:3000/client/all-clients'||getClientUrl)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setInternData(response.data);
        } else {
          console.error('API did not return an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching interns:', error);
      });
  };

  useEffect(() => {
    getAllInterns();
  }, []);

  const handleEditItem = (row: InternRow) => {
    navigate(`/edit-client/${row.id}`, { state: row });
  };

  const handleClickOpen = (row: InternRow) => {
    setSelectedItemId(row.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = async () => {
    if (selectedItemId === null) return;

    try {
      await axios.delete(`http://localhost:3000/client/delete-client/${selectedItemId}`||deleteClientUrl);
      toast.success('Client delete successfully')
      getAllInterns(); // Refresh the data
    } catch (error) {
      console.error('Error deleting intern:', error);
      toast.success('Error While deleteing Client')
    } finally {
      setOpen(false);
    }
  };

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: 'bold' }}>
        Client Info
      </Typography>
      <ToastContainer position="top-right" autoClose={3000} />
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
        <DialogTitle id="alert-dialog-title">{"Delete This Intern?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteItem}>Yes</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientTable;
