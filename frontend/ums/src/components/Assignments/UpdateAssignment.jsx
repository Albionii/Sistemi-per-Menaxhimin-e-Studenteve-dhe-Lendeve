import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ConfirmationModal from "./ConfirmationModal";
import extractFileName from "../global/extractFileName";

const UpdateAssignment = ({
  onSubmit,
  onClose,
  initialData,
  ligjerataId,
  onUpdateAssignment,
}) => {
  const [Assignment, setAssignment] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);
  const [files, setFiles] = useState([]);
  const [originalFileNames, setOriginalFileNames] = useState([]);

  useEffect(() => {
    setOriginalFileNames(initialData.fileNames);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const fileNames = fileList.map((file) => file.name);
    setAssignment((prevState) => ({
      ...prevState,
      fileNames,
    }));
    setFiles(fileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(true);
  };

  const handleConfirm = () => {
    setConfirmation(false);
    const formData = new FormData();
    formData.append("assignment", JSON.stringify(Assignment));

    if (files.length > 0) {
      for (const file of files) {
        formData.append("files", file);
      }
    }
    onSubmit(Assignment, ligjerataId, formData);
    onUpdateAssignment(Assignment);
    onClose();
    setAssignment(initialData);
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
              <Box key={index} display="flex" alignItems="center" mr={2} mb={1}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography>{extractFileName(file)}</Typography>
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
          Save
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
