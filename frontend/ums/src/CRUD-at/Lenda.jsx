import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createLenda,
  getAllLendet,
  getLendaByID,
  updateLendaByID,
  deleteLendaByID
} from '../APIRequests'
function Lenda() {
  const rowsNames = [
    "Kodi",
    "Lenda",
    "Obligative",
    "Kredite",
  ]
  
  const jsonNames = ["kodi", "emri","obligative","ects"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    emri:"",
    ects:"",
    obligative: true,
    kodi:""
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createLenda} 
        getAllAPI = {getAllLendet} 
        getByIDAPI = {getLendaByID}
        updateAPI = {updateLendaByID}
        deleteAPI = {deleteLendaByID}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Lenda