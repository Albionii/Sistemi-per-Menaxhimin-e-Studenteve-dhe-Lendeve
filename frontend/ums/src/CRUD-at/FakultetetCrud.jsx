import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createFakulteti,
    getAllFakulteti,
    getFakultetiById,
    updateFakultetiByID,
    deleteFakultetiById
} from '../APIRequests'

function FakultetetCrud({token}) {
    const rowsNames = [
        "Kodi",
        "Emri",
        "Email",
        "Lokacioni"
    ]
    const jsonNames = ["id", "emri", "email", "lokacioni"];

    const buttonsAvailable = {
      preview: false,
      add: true,
      edit:true,
      delete:true
    }

    const formDataJson =   {
        id:"",
        emri: "",
        lokacioni: "",
        email: ""
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
                buttonsAvailable={buttonsAvailable}
                formDataJson={formDataJson}
                jsonName={jsonNames}
                token={token}
            />
        </>
    )
}

export default FakultetetCrud