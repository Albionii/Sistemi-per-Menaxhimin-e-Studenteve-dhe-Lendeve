import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createDepartamenti,
    getAllDepartamenti,
    getDepartamentiByID,
    updateDepartamentiByID,
    deleteDepartamentiByID
} from '../APIRequests'

function DepartamentiCrud() {
    const rowsNames = [
        "Kodi",
        "Emri",
        "Lokacioni",
        "Dekanti",
    ]
    const jsonNames = ["id", "emri", "lokacioni", "user.firstName"];
    const buttonsAvailable = {
      preview: false,
      add: true,
      update: true,
      delete: true

    }

    const formDataJson = {
        id: null,
        emri: "",
        lokacioni: "",
        email: "",
        fakulteti: {
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
        },
        user: {
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            dateLindja: "",
            gjinia: "",
            nrTelefonit: "",
            qyteti: null,
            zipcode: "",
            shteti: null,
            rruga: null,
            role: ""
        }
    }

    return (
        <>
            <Crud
                rows={rowsNames}
                createAPI={createDepartamenti}
                getAllAPI={getAllDepartamenti}
                getByIDAPI={getDepartamentiByID}
                updateAPI={updateDepartamentiByID}
                deleteAPI={deleteDepartamentiByID}
                buttonsAvailable={buttonsAvailable}
                formDataJson={formDataJson}
                jsonName={jsonNames}
            />
        </>
    )
}

export default DepartamentiCrud