
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import { getToken } from "../GetToken";
import { useEffect } from "react";
import React, { useState } from 'react';


const Profesori = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const token = getToken();


  // const mockData = [{
  //   id: 1,
  //   lenda: "Shkenca Kompjuterike 1",
  //   ECTS: "5.00",
  //   nota: '9',
  //   kategoria: 'Obligative',
  //   notaShkronje: "B",
  //   statusi: "I rregullte",
  // },
  // {
  //   id: 2,
  //   lenda: "Shkenca Kompjuterike 1",
  //   ECTS: "5.00",
  //   nota: '9',
  //   kategoria: 'Obligative',
  //   notaShkronje: "B",
  //   statusi: "I rregullte",
  // }];
  const [mockData, setmockData] = useState({
    id: 1,
  })

  const getProvimetNotuara = async () => {
    axios.get('http://localhost:8080/student/getTranskripta', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // console.log("notimi : " + JSON.stringify(response.data))
        setmockData(response.data);

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const convertGradeToLettered =  (nota) => {
    switch(nota){
      case 10:
        return "A"
      case 9:
        return "B"
      case 8:
        return "C"
      case 7:
        return "D"
      case 6:
        return "E"
    }
  }

  useEffect(() => {
    getProvimetNotuara();
  }, [])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "emriLendes",
      headerName: "Lenda",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "provimi",
      headerName: "ECTS",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <>
            <div>{params.formattedValue.ligjerata.lenda.ects}</div>
          </>
        );
      },
    },
    {
      field: "nota",
      headerName: "Nota",
      flex: 1,
    },
    {
      field: "notaShkronje",
      headerName: "NotaShkronje",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div>{convertGradeToLettered(params.row.nota)}</div>
          </>
        );
      },
    },
    {
      field: "dataParaqitjes",
      headerName: "data e paraqitjes",
      flex: 1,
    },
    {
      field: "dataVendosjes",
      headerName: "data e vendosjes",
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