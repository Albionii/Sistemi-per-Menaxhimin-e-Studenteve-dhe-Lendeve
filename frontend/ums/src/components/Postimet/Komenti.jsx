import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmationModal from "./ConfirmationModal";
import { tokens } from "../../theme";
import UpdateKomenti from "./UpdateKomenti";

const Komenti = ({ koment, user, deleteKomenti,updateKomenti }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const [deleteKoment, setDeleteKoment] = useState(false);
  const openDelete = () => setDeleteKoment(true);
  const closeDelete = () => setDeleteKoment(false);

  const [update, setUpdate] = useState(false);
  const openUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmation = () => {
    deleteKomenti(koment.id);
    setDeleteKoment(false);
  };

  const handleConfirm = () => {};

  return (
    <Box
      display="flex"
      gap="15px"
      padding="10px"
      sx={{
        backgroundColor: colors.primary[600],
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <Avatar
        alt={`${koment.userID.firstName} ${koment.userID.lastName}`}
        src={koment.userID.avatarUrl}
      />
      <Box flex="1">
        <Box
          sx={{
            background: colors.primary[400],
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {koment.userID.firstName + " " + koment.userID.lastName}
            </Typography>
            <IconButton
              aria-label="settings"
              aria-controls={menuOpen ? "menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ marginTop: "5px" }}>
            {koment.teksti}
          </Typography>
        </Box>
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        keepMounted
      >
        {(user.id === koment.userID.id ||
          koment.userID.role !== "ROLE_ADMIN") && (
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

      <ConfirmationModal
        open={deleteKoment}
        handleClose={closeDelete}
        handleConfirm={handleConfirmation}
        title="Delete Comment"
        message="Are you sure you want to proceed with deleting this comment?"
      />
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
          <UpdateKomenti
            onSubmit={updateKomenti}
            onClose={closeUpdate}
            initialData={koment}
            postimiId={koment.id}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Komenti;
