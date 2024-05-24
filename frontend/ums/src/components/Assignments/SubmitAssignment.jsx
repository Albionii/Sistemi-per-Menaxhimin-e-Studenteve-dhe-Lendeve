import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ConfirmationModal from "./ConfirmationModal";

const SubmitSubmission = ({ onSubmit, onClose, initialData, ligjerataId }) => {
  const [Submission, setSubmission] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);

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
    onSubmit(ligjerataId, Submission);
    onClose();
    setSubmission(initialData);
  };
  

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="CreateSubmission" variant="h6" component="h2">
        Create Submission
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
        onChange={handleInputChange}
      />
      <Box mt={2} mb={2}>
        {Submission.fileNames.length > 0 && (
          <Box display="flex" flexWrap="wrap" mb={2}>
            {Submission.fileNames.map((file, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                mr={2}
                mb={1}
              >
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography>{file}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      <Box mt={2}>
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

    </Box>
  );
};

export default SubmitSubmission;
