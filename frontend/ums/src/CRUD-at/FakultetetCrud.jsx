import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createFakulteti,
    getAllFakulteti,
    getFakultetiById,
    updateFakultetiByID,
    deleteFakultetiById
} from '../APIRequests'

function DepartamentiCrud() {
    const rowsNames = [
        "Kodi",
        "Emri",
        "Lokacioni",
        "Drejtori",
    ]
    const jsonNames = ["id", "emri", "lokacioni", "user.firstName"];
    const isPreviewAvailable = false;
    const isAddAvailable = true;

    const formDataJson =   {
        id: null,
        emri: "",
        lokacioni: "",
        email: "",
        user: {
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            dateLindja: "",
            gjinia: "",
            nrTelefonit: "",
            qyteti: "",
            zipcode: "",
            shteti: "",
            rruga: "",
            role: ""
        }
    }

    return (
        <>
            <Crud
                rows={rowsNames}
                createAPI={createFakulteti}
                getAllAPI={getAllFakulteti}
                getByIDAPI={getFakultetiById}
                updateAPI={updateFakultetiByID}
                deleteAPI={deleteFakultetiById}
                isPreviewAvailable={isPreviewAvailable}
                isAddAvailable={isAddAvailable}
                formDataJson={formDataJson}
                jsonName={jsonNames}
            />
        </>
    )
}

export default DepartamentiCrud