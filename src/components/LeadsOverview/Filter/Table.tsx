import { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Select, MenuItem, Button, Box, Modal } from "@mui/material";
import randomData from "../../../data/MOCK_DATA.json";
import EditIcon from '@mui/icons-material/Edit';
import { sxStyles } from "../../../utils/constants";

// Define possible statuses
const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];

const Table = () => {
  // State to track row-specific statuses
  const [statuses, setStatuses] = useState<{ [key: number]: string }>(() => {
    return randomData.reduce((acc, row) => {
      acc[row.id] = "Pending"; // Default status
      return acc;
    }, {} as { [key: number]: string });
  });

  // State for modal
  const [openNoteId, setOpenNoteId] = useState<number | null>(null);

  // Handle status change
  const handleStatusChange = (id: number, value: string) => {
    setStatuses((prev) => ({ ...prev, [id]: value }));
  };

  // Define table columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "property", headerName: "Property", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "developer", headerName: "Developer", width: 150 },
    
    { field: "assigned", headerName: "N", width: 150,renderCell: (params) => (
        <Select
          value={statuses[params.row.id] || "Pending"}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red !important", // Changes default border to red
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkred !important", // Changes border on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red !important", // Changes border when focused
                },
            },
            "& .MuiSelect-select": {
                padding: "0px 14px !important",
                minHeight: "27px !important",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontSize:"14px",
                textAlign: "center",
                displayPrint:"flex",
                justifyContent:"center",
                alignContent:"center",
                backgroundColor:"black",
                height:"27px !important",
                boxShadow: "0px 5px 5.5px 0px rgba(0, 0, 0, 0.05) inset",
                borderRadius: "6px",
            },
        }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ), },
    {
      field: "note",
      headerName: "Note",
      width: 80,
      renderCell: (params) => (
       <Box
       sx={{
      
      }}
       >
         <Button
        variant="text"
        size="small"
        sx={{
          color: "black",
          justifyContent:"center",
          display: "flex",
          borderRadius: "6px",
          fontSize: "14px", // Controls text size
          alignItems: "center",
          width:"20px",
          minWidth: "40px !important",
          minHeight: "27px !important",
          gap: "5px", // Adds space between icon & text
        }}
        onClick={() => setOpenNoteId(params.row.id)}
      >
        <EditIcon sx={{ fontSize: "20px" }} /> {/* Adjust size here */}
        
      </Button>
       </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Select
          value={statuses[params.row.id] || "Pending"}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red !important", // Changes default border to red
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkred !important", // Changes border on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red !important", // Changes border when focused
                },
            },
            "& .MuiSelect-select": {
                padding: "0px 14px !important",
                minHeight: "27px !important",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontSize:"14px",
                textAlign: "center",
                displayPrint:"flex",
                justifyContent:"center",
                alignContent:"center",
                backgroundColor:"black",
                height:"27px !important",
                boxShadow: "0px 5px 5.5px 0px rgba(0, 0, 0, 0.05) inset",
                borderRadius: "6px",
            },
        }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];



  return (
    <div className="w-full overflow-x-auto">
      <DataGrid rows={randomData} columns={columns}
      sx={sxStyles}
      />

      {/* Notes Modal */}
      <Modal open={openNoteId !== null} onClose={() => setOpenNoteId(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Note Details</h2>
          <p>Notes for ID {openNoteId}</p>
          <Button onClick={() => setOpenNoteId(null)}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default Table;