import React from "react";
import Material from "./Material";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useMateriali from "./useMateriali";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CreateMaterial from "./CreateMaterial";
import CreatedNotifications from "../Notifications/CreatedNoftifications";
import DeletedNotification from "../Notifications/DeletedNotification";
const Materiali = ({ ligjerataId, token, USER_ROLE, user, professorId }) => {
  const {
    materiali,
    createMaterial,
    deleteMaterial,
    updateMaterial,
    downloadFile,
    showNotification,
    deleteNotification,
  } = useMateriali(ligjerataId, token);

  const initialData = {
    titulli: "",
    mesazhi: "",
    fileNames: [],
  };
  const [create, setCreate] = useState(false);
  const openCreate = () => setCreate(true);
  const closeCreate = () => setCreate(false);

  return (
    <>

      <Box>
      {showNotification && <CreatedNotifications message={"Material Created Successfully!"} />}
      {deleteNotification && <DeletedNotification  message={"Material Deleted Succesfully!"}/>}

        {USER_ROLE !== "ROLE_STUDENT" && user.id === professorId && (
          <Box
            sx={{ display: "flex" }}
            justifyContent={{ xs: "center", sm: "flex-end" }}
          >
            <Button variant="contained" color="secondary" onClick={openCreate}>
              +
            </Button>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {materiali.length === 0 ? (
            <Box>
              <Typography>No Material Has Been Posted!</Typography>
            </Box>
          ) : (
            <>
              {materiali.map((material) => (
                <Material
                  key={material.id}
                  material={material}
                  deleteMaterial={deleteMaterial}
                  updateMaterial={updateMaterial}
                  USER_ROLE={USER_ROLE}
                  downloadFile={downloadFile}
                />
              ))}
            </>
          )}
        </Box>
        <Modal open={create} onClose={closeCreate}>
          <Box sx={style}>
            <CreateMaterial
              onSubmit={createMaterial}
              onClose={closeCreate}
              initialData={initialData}
              ligjerataId={ligjerataId}
            />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Materiali;

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
