import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
import Avatar from "@mui/material/Avatar";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const UpdatePostimi = ({ onSubmit, onClose, initialData, postimiId }) => {
  const [post, setPost] = useState(initialData);
  const [confirmation, setConfirmation] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(true);
  };

  const handleConfirm = () => {
    setConfirmation(false);
    onSubmit(postimiId, post);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography id="edit-post-modal" variant="h6" component="h2">
        Update Post
      </Typography>

      <Box display={"flex"} sx={{ paddingTop: "10px" }}>
        <Avatar></Avatar>
        <Box ml={"15px"}>
          <Typography variant="h5">
            {post.user.firstName + " " + post.user.lastName}
          </Typography>
          <Typography fontSize={"12px"} color={"text.secondary"}>
            {post.data_Postimit}
          </Typography>
        </Box>
      </Box>
      <TextField
        fullWidth
        margin="normal"
        name="mesazhi"
        label="Message"
        variant="outlined"
        required
        multiline
        rows={4}
        value={post.mesazhi}
        onChange={handleInputChange}
      />
      <Box sx={{display:"flex", justifyContent:"flex-end"}}>
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
        message="Are you sure you want to update this post?"
      />
    </Box>
  );
};

export default UpdatePostimi;
