import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";

const UpdateSubmission = ({
  onSubmit,
  onClose,
  initialData,
  ligjerataId,
  assignmentId,
  token,
}) => {
  const [Submission, setSubmission] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileNames = Array.from(e.target.files).map((file) => file.name);
    setSubmission((prevState) => ({
      ...prevState,
      fileNames,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmMsg("Are you sure you want to update this assignment?");
    setConfirmation(true);
  };

  const handleConfirm = () => {
    setConfirmation(false);
    onSubmit(ligjerataId, Submission);
    onClose();
    setSubmission(initialData);
  };

  const getSubmissionOfUser = (assignmentId) => {
    axios
      .get(`http://localhost:8080/api/user/get/submission/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubmission(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const deleteSubmission = () => {
    axios
      .delete(`http://localhost:8080/api/user/submit/delete/${Submission.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Deleted");
        onClose(); // Close the modal after deletion
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  useEffect(() => {
    getSubmissionOfUser(assignmentId);
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="CreateSubmission" variant="h6" component="h2">
        Update Submission
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="mesazhi"
        label="Mesazhi"
        variant="outlined"
        required
        multiline
        rows={4}
        value={Submission.mesazhi}
        defaultValue={Submission.mesazhi}
        onChange={handleInputChange}
      />
      <Box mt={2} mb={2}>
        {Submission.fileNames.length > 0 && (
          <Box display="flex" flexWrap="wrap" mb={2}>
            {Submission.fileNames.map((file, index) => (
              <Box key={index} display="flex" alignItems="center" mr={2} mb={1}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography>{file}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
      </Box>
      <Box mt={2} sx={{display:"flex", justifyContent:"space-between"}}>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ mr: 2 }}
          >
            Update
          </Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            Anulo
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setConfirmMsg("Are you sure you want to delete this submission?");
              setDeleteConfirm(true);
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <ConfirmationModal
        open={confirmation}
        handleClose={() => setConfirmation(false)}
        handleConfirm={handleConfirm}
        title="Confirm Update"
        message={confirmMsg}
      />
      <ConfirmationModal
        open={deleteConfirm}
        handleClose={() => setDeleteConfirm(false)}
        handleConfirm={deleteSubmission}
        title="Confirm Delete"
        message="Are you sure you want to delete this submission?"
      />
    </Box>
  );
};

export default UpdateSubmission;
