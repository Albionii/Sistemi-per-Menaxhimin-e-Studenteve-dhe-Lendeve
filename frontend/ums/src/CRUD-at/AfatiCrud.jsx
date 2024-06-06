import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
    createAfati,
    getAllAfatet,
    getAfatiByID,
    updateAfatiByID,
    deleteAfatiByID
} from '../APIRequests'

function AfatiCrud() {
    const rowsNames = [
        "Id",
        "Emri",
        "Data Fillimit",
        "Data Mbarimit"
    ]
    const jsonNames = ["id", "name", "dataFillimit","dataMbarimit"];
    const buttonsAvailable = {
      preview: false,
      add: true,
      edit: true,
      delete: true

    }

    const formDataJson = {
        id: "",
        emri: "",
        dataFillimit: "",
        dataMbarimit: "",
    }

    return (
        <>
            <Crud
                rows={rowsNames}
                createAPI={createAfati}
                getAllAPI={getAllAfatet}
                getByIDAPI={getAfatiByID}
                updateAPI={updateAfatiByID}
                deleteAPI={deleteAfatiByID}
                buttonsAvailable={buttonsAvailable}
                formDataJson={formDataJson}
                jsonName={jsonNames}
            />
        </>
    )
}

export default AfatiCrud