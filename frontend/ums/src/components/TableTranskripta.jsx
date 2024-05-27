
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const mockData = [
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
  {
    id: 1,
    lenda: "Shkenca Kompjuterike 1",
    ECTS: "5.00",
    nota: '9',
    kategoria: 'Obligative',
    notaShkronje: "B",
    statusi: "I rregullte",
  },
];


const Profesori = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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