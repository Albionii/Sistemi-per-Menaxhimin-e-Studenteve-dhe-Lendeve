import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createGrupi,
  getAllGrupet,
  getGrupiById,
  updateGrupiById,
  deleteGrupiById
} from '../APIRequests'
function Lenda() {
  const rowsNames = [
    "Id",
    "Emri",
    "Semester",
    "Hapesira"
  ]
  
  const jsonNames = ["id", "emri","semester.name", "hapesira"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    id:"",
    emri:"",
    semester: {
        id: "",
        name: ""
    },
    hapesira: ""
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createGrupi} 
        getAllAPI = {getAllGrupet} 
        getByIDAPI = {getGrupiById}
        updateAPI = {updateGrupiById}
        deleteAPI = {deleteGrupiById}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Lenda