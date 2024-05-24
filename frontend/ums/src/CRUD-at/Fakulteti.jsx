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
  const isPreviewAvailable = false;
  const isAddAvailable = true;

  const formDataJson = {
    emri:"",
    ects:"",
    obligative:"",
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
        isPreviewAvailable = {isPreviewAvailable}
        isAddAvailable={isAddAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Lenda