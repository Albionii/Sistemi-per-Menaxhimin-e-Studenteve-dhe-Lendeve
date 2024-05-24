import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '80%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmissionsModal = ({ open, onClose, assignmentId, token }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:8080/api/professor/assignment/get/submissions/${assignmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSubmissions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching submissions: ", error);
        });
    }
  }, [open, assignmentId, token]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="submissions-modal-title" aria-describedby="submissions-modal-description">
      <Box sx={style}>
        <Typography id="submissions-modal-title" variant="h6" component="h2">
          Submissions for Assignment {assignmentId}
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="submissions table">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>{submission.submissionDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        // Implement file download logic here
                      }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default SubmissionsModal;
