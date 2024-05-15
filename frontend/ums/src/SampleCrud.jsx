import React from 'react'
import Crud from './CRUD-Template/Crud'

import {
  createProvimi,
  getAllProvimet,
  getProvimiByID,
  updateProvimiByID,
  deleteProvimiByID,
  createLigjerata,
  getAllLigjeratat,
  getLigjerataByID,
  updateLigjerataByID,
  deleteLigjerataByID,
  createLenda,
  getAllLendet,
  getLendaByID,
  updateLendaByID,
  deleteLendaByID
} from './APIRequests'
function SampleCrud() {
  const rowsNames = [
    "Lenda",
    "EMri",
    "Data",
    "Lokacioni",
    "Butoni"
  ]
  // const rowsNames = [
  //   "Profesori ID",
  //   "Emri",
  //   "Mbiemri",
  //   "Lenda",
  //   "Kredite",
  //   "Obligative",
  //   "Butoni"
  // ]
  
  const jsonNames = ["ligjerata.lenda.emri", "ligjerata.professor.user.firstName","data","location"];
  // const jsonNames = ["professor.id","professor.user.firstName","professor.user.lastName", "lenda.emri", "lenda.ects", "lenda.obligative"];
  const isPreviewAvailable = false;

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


  // const formDataJson = {
  //  professor : {
  //   id : '',
  //   user : {
  //     id : "",
  //     firstName : "",
  //     lastName : ""
  //   },
  //   lenda : {
  //     emri : "",
  //     ects : "",
  //     obligative : ""
  //   }
  //  }
  // }

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
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default SampleCrud