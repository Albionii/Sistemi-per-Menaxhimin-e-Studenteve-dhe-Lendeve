import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createProvimi,
  getAllProvimet,
  getProvimiByID,
  updateProvimiByID,
  deleteProvimiByID
} from '../APIRequests'
function Provimi() {
  const rowsNames = [
    "Lenda",
    "Emri",
    "Mbiemri",
    "Data",
    "Lokacioni"
  ]
  
  const jsonNames = ["ligjerata.lenda.emri", "ligjerata.professor.user.firstName", "ligjerata.professor.user.lastName", "data","location"];
  const isPreviewAvailable = false;
  const isAddAvailable = true;

  const formDataJson = {
    ligjerata : {
      professor : {
        id : '',
        user : {
          id : "",
          firstName : "",
          lastName : ""
        }
      },
      lenda : {
        emri : "",
        ects : "",
        obligative : ""
      }
    },
    data : '',
    location : ''
  }


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
        isAddAvailable={isAddAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Provimi