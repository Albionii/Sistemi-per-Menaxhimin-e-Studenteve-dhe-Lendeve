import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { getToken } from "../../GetToken";
import { getFromCookies } from "../../getUserFromJWT";

const UploadAvatar = ({ handleClose, refreshUserData }) => {
  const token = getToken();

  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };



  const handleSave = async () => {
    try {
      const blob = await fetch(preview).then((res) => res.blob());
      const formData = new FormData();
      formData.append('files', blob, 'avatar.png'); 
  
      const response = await axios.post('http://localhost:8080/api/storage/profile/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File uploaded successfully:', response.data);

      window.location.reload();

      handleClose();
    } catch (error) {
      if (error.response) {
        console.error('Error uploading avatar:', error.response.data);
      } else {
        console.error('Error uploading avatar:', error.message);
      }
    }

  };
  
  

  useEffect(() => {
    console.log(preview);
  }, [preview]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {preview && (
        <img
          src={preview}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
        />
      )}

      <Avatar
        width={300}
        height={200}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
        cropRadius={50}
        cropColor="transparent"
        closeIconColor="transparent"
        lineWidth={0}
        style={{
          width: "100%",
          maxWidth: 300,
          height: "auto",
        }}
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Anulo
        </Button>
      </Box>
    </Box>
  );
};

export default UploadAvatar;
