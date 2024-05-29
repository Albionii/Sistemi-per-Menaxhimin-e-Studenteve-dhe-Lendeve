
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import { getToken } from "../GetToken";
import { useEffect } from "react";




const Profesori = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const token = getToken();
  const mockData = [];
  
  const getProvimetNotuara = async() => {
    axios.get('http://localhost:8080/student',{
      headers: {
          'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("notimi : " + response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(()=>{
    getProvimetNotuara();
  },[])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "lenda",
      headerName: "Lenda",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ECTS",
      headerName: "ECTS",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "nota",
      headerName: "Nota",
      flex: 1,
    },
    {
      field: "kategoria",
      headerName: "Kategoria",
      flex: 1,
    },
    {
      field: "notaShkronje",
      headerName: "NotaShkronje",
      flex: 1,
    },
    {
      field: "statusi",
      headerName: "Statusi",
      flex: 1,
    },
  ];

  return (
      <Box
        height="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.primary[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
  );
};

export default Profesori;