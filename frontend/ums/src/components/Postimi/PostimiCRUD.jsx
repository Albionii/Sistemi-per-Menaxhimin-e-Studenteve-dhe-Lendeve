import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Typography } from "@mui/material";

const PostimiCRUD = (isOpen) => {
  const handleClose = () => {
    isOpen = false;
  };

  return (
    <Box sx={{ padding: "20px", width:"100%", display: "flex", flexDirection:"column", gap:"15px" }}>

      <Box sx={{display:"flex", gap:"10px"}}>

        <Avatar></Avatar>
        <Box sx={{display:"flex", flexDirection:"column"}}>
          <Typography>Studenti</Typography>
          <Typography>Data</Typography>
        </Box>
      </Box>

      <TextField
        id="outlined-multiline-static"
        label="Posto"
        multiline
        rows={10}
        
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostimiCRUD;
