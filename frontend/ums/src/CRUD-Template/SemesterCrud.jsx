import React from "react";
import Crud from '../CRUD-Template/Crud'

import { createSemester, deleteSemesterById, getAllSemester, getStudentByID, updateStudentByID } from "../APIRequests";
import { Box } from "@mui/material";

function SemestriCrud() {
  const rowsNames = [
    "Semestri ID",
    "Semestri",
    "Data e fillimit",
    "Data e mbarimit",
    "Butonat"
  ];
  const isPreviewAvailable = false;

  const jsonNames = [
    "id",
    "name",
    "startDate",
    "endDate"
  ];

  return (
    <Box m={'20px'}>
    <Crud
      rows={rowsNames}
      createAPI={createSemester}
      getAllAPI={getAllSemester}
      getByIDAPI={getStudentByID}
      updateAPI={updateStudentByID}
      deleteAPI={deleteSemesterById}
      isPreviewAvailable={isPreviewAvailable}
      jsonName={jsonNames}
    />
    </Box>
  );
}

export default SemestriCrud;
