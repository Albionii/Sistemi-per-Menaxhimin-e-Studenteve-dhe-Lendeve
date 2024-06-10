import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const CreateAssignment = ({ onSubmit, onClose, initialData, ligjerataId }) => {
  const [newAssignment, setNewAssignment] = useState(initialData);
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const fileNames = fileList.map((file) => file.name);
    setNewAssignment((prevState) => ({
      ...prevState,
      fileNames,
    }));
    setFiles(fileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assignment", JSON.stringify(newAssignment));
    for (const file of files) {
      formData.append("files", file);
    }
    onSubmit(newAssignment, formData, ligjerataId);
    onClose();
    setNewAssignment(initialData);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="CreateAssignment" variant="h6" component="h2">
        Create New Assignment
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="titulli"
        label="Titulli"
        variant="outlined"
        required
        value={newAssignment.titulli}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="mesazhi"
        label="Mesazhi"
        variant="outlined"
        multiline
        rows={4}
        value={newAssignment.mesazhi}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="expireAt"
        label="Expire At"
        type="datetime-local"
        variant="outlined"
        required
        InputLabelProps={{
          shrink: true,
        }}
        value={newAssignment.expireAt}
        onChange={handleInputChange}
        inputProps={{
          min: getCurrentDateTime(),
        }}
      />
      <Box mt={2} mb={2}>
        {newAssignment.fileNames.length > 0 && (
          <Box display="flex" flexWrap="wrap" mb={2}>
            {newAssignment.fileNames.map((file, index) => (
              <Box key={index} display="flex" alignItems="center" mr={2} mb={1}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography>{file}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Button variant="contained" color="neutral" component="label">
          <Typography color={"white"}>Upload File </Typography>{" "}
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ mr: 2 }}
        >
          Create
        </Button>
        <Button variant="outlined" color="error" onClick={onClose}>
          cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAssignment;
