import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Button,
  Modal,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdatePostimi from "./UpdatePostimi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Postim = ({ post, user, updatePostimi, deletePostimi, USER_ROLE }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [update, setUpdate] = useState(false);
  const openUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);

  const [deletePost, setDeletePost] = useState(false);
  const openDelete = () => setDeletePost(true);
  const closeDelete = () => setDeletePost(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmation = () => {
    deletePostimi(post.id);
    setDeletePost(false);
  };

  return (
    <Box key={post.id} sx={{ marginBottom: "40px" }}>
      <Box
        padding={"15px"}
        borderRadius={"15px"}
        sx={{ background: colors.primary[600] }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box display={"flex"}>
            <Avatar></Avatar>
            <Box ml={"15px"}>
              <Typography variant="h5">
                {post.user.firstName + " " + post.user.lastName}
              </Typography>
              <Typography fontSize={"12px"} color={"text.secondary"}>
                {formatDate(post.data_Postimit)}
              </Typography>
            </Box>
          </Box>
          {(user.id === post.user.id || USER_ROLE === "ROLE_ADMIN") && (
            <IconButton
              aria-label="settings"
              aria-controls={menuOpen ? "menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
        <Box padding={"25px 50px"}>
          <Typography>{post.mesazhi}</Typography>
        </Box>
        <Box
          sx={{ background: colors.primary[600] }}
          borderTop={"3px solid " + colors.primary[400]}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Avatar />
            <Box
              width={"95%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <input
                type="text"
                placeholder="Write something here"
                style={{
                  padding: "15px 30px",
                  width: "90%",
                  background: colors.primary[600],
                  borderRadius: "15px",
                  border: "2px solid " + colors.primary[400],
                }}
              />
              <Link to="/">
                <SendIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        keepMounted
      >
        {user.id === post.user.id && USER_ROLE !== "ROLE_ADMIN" && (
          <MenuItem
            onClick={() => {
              openUpdate();
              handleClose();
            }}
          >
            Edit
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            openDelete();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Modal
        open={update}
        onClose={closeUpdate}
        aria-labelledby="edit-post-modal"
        aria-describedby="modal-to-edit-post"
      >
        <Box
          p={4}
          bgcolor={colors.primary[500]}
          borderRadius={2}
          boxShadow={24}
          sx={{
            width: "60vw",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            maxWidth: "800px",
            maxHeight: "80%",
            overflowY: "auto",
            margin: "auto",
            "@media (max-width: 960px)": {
              width: "80vw",
            },
            "@media (max-width: 600px)": {
              width: "90vw",
            },
          }}
        >
          <UpdatePostimi
            onSubmit={updatePostimi}
            onClose={closeUpdate}
            initialData={post}
            postimiId={post.id}
          />
        </Box>
      </Modal>

      <ConfirmationModal
        open={deletePost}
        handleClose={closeDelete}
        handleConfirm={handleConfirmation}
        title="Delete Post"
        message="Are you sure you want to proceed with deleting this post?"
      />
    </Box>
  );
};

export default Postim;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
