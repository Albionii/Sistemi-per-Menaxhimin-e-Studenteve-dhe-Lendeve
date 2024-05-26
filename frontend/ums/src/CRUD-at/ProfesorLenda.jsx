import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createLigjerata,
  getAllLigjeratat,
  getLigjerataByID,
  updateLigjerataByID,
  deleteLigjerataByID,
} from '../APIRequests'
function ProfesorLenda() {
  const rowsNames = [
    "ID",
    "Emri",
    "Mbiemri",
    "Lenda",
    "Kredite",
  ]
  
  const jsonNames = ["professor.id", "professor.user.firstName","professor.user.lastName", "lenda.emri", "lenda.ects"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    professor : {
      id: "",
      user:{
        id:"",
        firstName:"",
        lastName:""
      }
    },
    lenda:{
      emri:"",
      ects:"",
      obligative:""
    }
  }



  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createLigjerata} 
        getAllAPI = {getAllLigjeratat} 
        getByIDAPI = {getLigjerataByID}
        updateAPI = {updateLigjerataByID}
        deleteAPI = {deleteLigjerataByID}
        formDataJson={formDataJson}
        buttonsAvailable={buttonsAvailable}
        jsonName={jsonNames}
         />
    </>
  )
}

export default ProfesorLenda