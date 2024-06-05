import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Modal,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import ConfirmationModal from "../Postimet/ConfirmationModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdateMaterial from "./UpdateMaterial";
import extractFileName from "../global/extractFileName";

const Material = ({ material, deleteMaterial, updateMaterial, downloadFile, USER_ROLE }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [deleteMod, setDeleteMod] = useState(false);
  const openDelete = () => setDeleteMod(true);
  const closeDelete = () => setDeleteMod(false);

  const [updateMod, setUpdateMod] = useState(false);
  const openUpdate = () => setUpdateMod(true);
  const closeUpdate = () => setUpdateMod(false);

  const [update, setUpdate] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmation = () => {
    deleteMaterial(material.id);
    setDeleteMod(false);
  };

  const handleDownload = (assignmentId,fileName) => {
    downloadFile(assignmentId, fileName)
  } 


  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, paddingTop:"5px"}}>
          {material.titulli}
        </Typography>
        <hr width="88%" noshade style={{background: colors.gray[200]}}/>
      </Box>

      <Box
        sx={{
          borderRadius: "15px",
          display: "flex",
          background: colors.primary[600],
          flexDirection: "column",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{material.mesazhi}</Typography>
            {USER_ROLE !== "ROLE_STUDENT" && (
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {material.fileNames.map((item, index) => (

              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  border: "1px dashed",
                  borderRadius: "10px",
                  ":hover": {
                    cursor:"pointer",
                    bgcolor:colors.primary[400]
                  }
                }}
                key={index}
                onClick={() => handleDownload(material.id,item)}
              >
                <PictureAsPdfIcon />
                <Typography>{extractFileName(item)}</Typography>
              </Box>

          ))}
        </Box>
      </Box>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            openUpdate();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
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
        open={updateMod}
        onClose={closeUpdate}
        aria-labelledby="edit-material-modal"
        aria-describedby="modal-to-edit-material"
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
          <UpdateMaterial
            onSubmit={updateMaterial}
            onClose={closeUpdate}
            initialData={material}
            materialId={material.id}
          />
        </Box>
      </Modal>

      <ConfirmationModal
        open={deleteMod}
        handleClose={closeDelete}
        handleConfirm={handleConfirmation}
        title="Delete Material"
        message="Are you sure you want to delete this?"
      />
    </Box>
  );
};

export default Material;

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
