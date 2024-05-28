import React from 'react';
import Crud from '../CRUD-Template/Crud';

import {
    createSemester,
    getAllSemester,
    getSemesterById,
    updateSemesterById,
    deleteSemesterById
} from '../APIRequests';

function AltiniCrud() {
    const rowsNames = [
        "Id",
        "Emri",
        "Data e Fillimit",
        "Data e Mbarimit",
        "Departamenti",
    ];
    const jsonNames = ["id", "name", "startDate","endDate", "departamenti.emri"];
    const buttonsAvailable = {
      preview: false,
      add: true,
      edit: true,
      delete: true
    };

    const formDataJson = {
        id: "",
        name: "",
        startDate: "",
        endDate: "",
        departamenti: {
            id: "" ,
            emri: ""
        }
    };

    return (
        <Crud
            rows={rowsNames}
            createAPI={createSemester}
            getAllAPI={getAllSemester}
            getByIDAPI={getSemesterById}
            updateAPI={updateSemesterById}
            deleteAPI={deleteSemesterById}
            buttonsAvailable={buttonsAvailable}
            formDataJson={formDataJson}
            jsonName={jsonNames}
        />
    );
}

export default AltiniCrud;
