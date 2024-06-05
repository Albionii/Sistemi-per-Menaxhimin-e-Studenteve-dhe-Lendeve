import React from "react";
import { useState } from "react";
import UploadAvatar from "./UploadAvatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw", // responsive width
  maxWidth: "90vw", // responsive max width
  maxHeight: "90vh", // responsive max height
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2, // padding to accommodate larger content
  overflow: "auto", // add scroll for overflow
};

const ProfilePicture = ({ open, handleOpen, handleClose }) => {
  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={handleOpen}>Upload Picture</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadAvatar handleClose={handleClose}/>
          
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePicture;
