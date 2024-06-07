import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import ConfirmationModal from "../Postimet/ConfirmationModal";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import extractFileName from "../global/extractFileName";

const UpdateMaterial = ({ onSubmit, onClose, initialData, materialId }) => {
  const [material, setMaterial] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);
  const [files, setFiles] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const fileNames = fileList.map((file) => file.name);
    setMaterial((prevState) => ({
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
    formData.append("assignment", JSON.stringify(material));
    for (const file of files) {
      formData.append("files", file);
    }
    onSubmit(materialId, material, formData);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="edit-post-modal" variant="h6" component="h2">
        Update Material
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        name="titulli"
        label="Title"
        variant="outlined"
        required
        multiline
        rows={4}
        value={material.titulli}
        onChange={handleInputChange}
      />

      <TextField
        fullWidth
        margin="normal"
        name="mesazhi"
        label="Message"
        variant="outlined"
        required
        multiline
        rows={4}
        value={material.mesazhi}
        onChange={handleInputChange}
      />

      <Box mt={2} mb={2}>
        {material.fileNames.length > 0 && (
          <Box display="flex" flexWrap="wrap" mb={2}>
            {material.fileNames.map((file, index) => (
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" color="secondary">
          Save
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>

      <ConfirmationModal
        open={confirmation}
        handleClose={() => setConfirmation(false)}
        handleConfirm={handleConfirm}
        title="Confirm Update"
        message="Are you sure you want to update the material?"
      />
    </Box>
  );
};

export default UpdateMaterial;
