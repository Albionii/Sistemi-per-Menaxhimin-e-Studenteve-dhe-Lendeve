import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ConfirmationModal from "./ConfirmationModal";

const UpdateAssignment = ({ onSubmit, onClose, initialData, ligjerataId, onUpdateAssignment }) => {
  const [Assignment, setAssignment] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileNames = Array.from(e.target.files).map((file) => file.name);
    setAssignment((prevState) => ({
      ...prevState,
      fileNames,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(true);
  };
  
  const handleConfirm = () => {
    setConfirmation(false);
    onSubmit(Assignment, ligjerataId);
    onUpdateAssignment(Assignment);
    onClose();
    setAssignment(initialData); 
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="CreateAssignment" variant="h6" component="h2">
        Update Assignment
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="titulli"
        label="Titulli"
        variant="outlined"
        required
        value={Assignment.titulli}
        defaultValue={Assignment.titulli}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="mesazhi"
        label="Mesazhi"
        variant="outlined"
        required
        multiline
        rows={4}
        defaultValue={Assignment.mesazhi}
        value={Assignment.mesazhi}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="expireAt"
        label="Expire At"
        type="datetime-local"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={Assignment.expireAt}
        onChange={handleInputChange}
        required
        inputProps={{
          min: getCurrentDateTime(),
        }}
      />
      <Box mt={2} mb={2}>
        {Assignment.fileNames.length > 0 && (
          <Box display="flex" flexWrap="wrap" mb={2}>
            {Assignment.fileNames.map((file, index) => (
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
      <ConfirmationModal
        open={confirmation}
        handleClose={() => setConfirmation(false)}
        handleConfirm={handleConfirm}
        title="Confirm Update"
        message="Are you sure you want to update this assignment?"
      />
    </Box>
  );
};

export default UpdateAssignment;
