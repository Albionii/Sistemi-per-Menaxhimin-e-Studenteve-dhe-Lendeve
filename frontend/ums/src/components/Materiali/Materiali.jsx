import React from "react";
import Material from "./Material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import useMateriali from "./useMateriali";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CreateMaterial from "./CreateMaterial";
const Materiali = ({ ligjerataId, token, USER_ROLE }) => {
  const { materiali, createMaterial, deleteMaterial, updateMaterial } =
    useMateriali(ligjerataId, token);

  const initialData = {
    titulli: "",
    mesazhi: "",
    fileNames: [],
  };

  const [create, setCreate] = useState(false);
  const openCreate = () => setCreate(true);
  const closeCreate = () => setCreate(false);

  return (
    <Box>
      {USER_ROLE !== "ROLE_STUDENT" && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        {materiali.map((material) => (
          <Material
            key={material.id}
            material={material}
            deleteMaterial={deleteMaterial}
            updateMaterial={updateMaterial}
            USER_ROLE={USER_ROLE}
          />
        ))}
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
