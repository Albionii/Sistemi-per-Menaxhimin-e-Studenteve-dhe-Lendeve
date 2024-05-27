import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createFakulteti,
    getAllFakulteti,
    getFakultetiById,
    updateFakultetiByID,
    deleteFakultetiById
} from '../APIRequests'

function FakultetetCrud() {
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
        // user: {
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     dateLindja: "",
        //     gjinia: "",
        //     nrTelefonit: "",
        //     qyteti: "",
        //     zipcode: "",
        //     shteti: "",
        //     rruga: "",
        //     role: ""
        // }
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
            />
        </>
    )
}

export default FakultetetCrud