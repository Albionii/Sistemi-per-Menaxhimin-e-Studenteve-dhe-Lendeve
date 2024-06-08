import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createOrari,
  getAllOraret,
  getOrariById,
  updateOrariById,
  deleteOrariById
} from '../APIRequests'
function Lenda({token}) {
  const rowsNames = [
    "Id",
    "Emri",
    "Grupi"
  ]
  
  const jsonNames = ["id", "name","grupi.emri"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    id:"",
    name:"",
    grupi: {
        id: "",
        emri: ""
    }
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createOrari} 
        getAllAPI = {getAllOraret} 
        getByIDAPI = {getOrariById}
        updateAPI = {updateOrariById}
        deleteAPI = {deleteOrariById}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
        token={token}
         />
    </>
  )
}

export default Lenda