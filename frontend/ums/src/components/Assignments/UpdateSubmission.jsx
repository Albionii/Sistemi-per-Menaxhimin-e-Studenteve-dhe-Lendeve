import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import extractFileName from "../global/extractFileName";



const UpdateSubmission = ({
  onSubmit,
  onClose,
  initialData,
  ligjerataId,
  assignmentId,
  token,
  setHasSubmitted,
}) => {
  const [Submission, setSubmission] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const fileNames = fileList.map((file) => file.name);
    setSubmission((prevState) => ({
      ...prevState,
      fileNames,
    }));
    setFiles(fileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmMsg("Are you sure you want to update your submission?");
    setConfirmation(true);
  };

  const handleConfirm = () => {
    setConfirmation(false);
    const formData = new FormData();
    formData.append("assignment", JSON.stringify(Submission));
    for (const file of files) {
      formData.append("files", file);
    }
    onSubmit(formData, ligjerataId, Submission);
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
      .delete(`http://localhost:8080/api/student/submit/delete/${Submission.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Deleted");
        setHasSubmitted(false);
        onClose();
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
                <Typography>{extractFileName(file)}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ mr: 2 }}
          >
            Submit
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
