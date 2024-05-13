import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const Postimi = ({ Emri, data, teksti }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [comment, setComment] = React.useState(false);
  const handleComment = () => {
    setComment(!comment);
  };
  return (
    <Box
      sx={{
        width: "inherit",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "15px",
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingBottom: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Avatar></Avatar>
          <Box>
            <Typography variant="h5">{Emri}</Typography>
            <Typography sx={{ fontSize: "13px" }}>{data}</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography>{teksti}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleComment}>
            <ModeCommentOutlinedIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <IconButton>
            <ThumbUpAltOutlinedIcon sx={{ cursor: "pointer" }} />
          </IconButton>

          <IconButton>
            <ThumbDownOffAltOutlinedIcon sx={{ cursor: "pointer" }} />
          </IconButton>
        </Box>
        {comment === true && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              sx={{
                width: "80%",
                border: "1px solid",
                borderRadius: "20px",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar></Avatar>
              <TextField
                sx={{ width: "90%" }}
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Postimi;


