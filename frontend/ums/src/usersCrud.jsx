import React from 'react'
import Crud from './CRUD-Template/Crud'

import {
  createProvimi,
  getAllProvimet,
  getProvimiByID,
  updateProvimiByID,
  deleteProvimiByID,
} from './APIRequests'
function SampleCrud() {
  const rowsNames = [
    "Lenda",
    "EMri",
    "Data",
    "Lokacioni"
  ]
  
  const jsonNames = ["ligjerata.lenda.emri", "ligjerata.professor.user.firstName","data","location"];
  const isPreviewAvailable = false;


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createProvimi} 
        getAllAPI = {getAllProvimet} 
        getByIDAPI = {getProvimiByID}
        updateAPI = {updateProvimiByID}
        deleteAPI = {deleteProvimiByID}
        isPreviewAvailable = {isPreviewAvailable}
        jsonName={jsonNames}
         />
    </>
  )
}

export default SampleCrud