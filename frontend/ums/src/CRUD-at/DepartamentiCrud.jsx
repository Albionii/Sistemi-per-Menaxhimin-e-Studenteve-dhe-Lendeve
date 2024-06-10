import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createDepartamenti,
    getAllDepartamenti,
    getDepartamentiByID,
    updateDepartamentiByID,
    deleteDepartamentiByID
} from '../APIRequests'

function DepartamentiCrud({token}) {
    const rowsNames = [
        "Kodi",
        "Emri",
        "Lokacioni",
        "Email",
        "Fakulteti",
    ]
    const jsonNames = ["id", "emri", "lokacioni","email", "fakulteti.emri"];
    const buttonsAvailable = {
      preview: false,
      add: true,
      edit: true,
      delete: true

    }

    const formDataJson = {
        emri: "",
        lokacioni: "",
        email: "",
        fakulteti: {
            emri: "",
            lokacioni: "",
            email: ""
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
                token={token}
            />
        </>
    )
}

export default DepartamentiCrud