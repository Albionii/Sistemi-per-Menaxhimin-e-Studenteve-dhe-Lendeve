import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

const ConfirmationModal = ({ open, handleClose, handleConfirm, title, message }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {xs:300, sm:500, lg:600},
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={handleConfirm} sx={{ mr: 2 }}>
            Yes
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose} >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
