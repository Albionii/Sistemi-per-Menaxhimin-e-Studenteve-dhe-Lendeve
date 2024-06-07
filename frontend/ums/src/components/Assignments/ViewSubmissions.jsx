import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EnhancedTableToolbar() {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Submissions
      </Typography>
    </Toolbar>
  );
}

export default function ViewSubmissions({
  assignment,
  token,
  open,
  onClose,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (open) {
      axios
        .get(
          `http://localhost:8080/api/professor/assignment/get/submissions/${assignment.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setSubmissions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching submissions: ", error);
        });
    }
  }, [open, assignment.id, token]);

  const downloadSubmission = (submissionId, submiterName) => {
    axios
      .get(`http://localhost:8080/api/storage/${assignment.id}/${submissionId}`, {
        responseType: "blob",
      })
      .then((response) => {
  
        const blob = new Blob([response.data], {
          type: "application/zip",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileName = submissionId + "_" + submiterName + ".zip";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading submission:", error);
      });
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.submiter.firstName + " " + params.row.submiter.lastName}
          </>
        );
      },
    },
    {
      field: "submitedAt",
      headerName: "Submission Date",
      flex: 1,
    },
    {
      field: "mesazhi",
      headerName: "Message",
      flex: 1,
    },
    {
      field: "files",
      headerName: "Files",
      flex: 1,
      renderCell: (params) => {
        return (
          <a
            onClick={() => downloadSubmission(params.row.id, params.row.submiter.firstName+ params.row.submiter.lastName)}
            style={{ textDecoration: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Download Files
          </a>
        );
      },
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <EnhancedTableToolbar />
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
            "& .expiredSubmission": {
              backgroundColor: `${colors.redAccent[800]}`,
            },
          }}
        >
          <DataGrid
            rows={submissions}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowClassName={(params) =>
              params.row.submitedAt > assignment.expireAt ? "expiredSubmission" : ""
            }
          />
        </Box>
      </Box>
    </Modal>
  );
}
