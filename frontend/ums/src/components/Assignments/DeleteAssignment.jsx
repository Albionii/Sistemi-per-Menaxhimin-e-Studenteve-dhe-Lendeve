import React, { useState } from 'react';
import { Button } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';

const DeleteAssignment = ({ assignmentId, deleteAssignment }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    deleteAssignment(assignmentId, handleClose);
  };

  return (
    <>
      <Button variant="contained" color='error' onClick={handleOpen}>
        Delete
      </Button>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this assignment?"
      />
    </>
  );
};

export default DeleteAssignment;
