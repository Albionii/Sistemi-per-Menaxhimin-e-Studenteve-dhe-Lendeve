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
    "Semestri"
  ]
  
  const jsonNames = ["professor.id", "professor.user.firstName","professor.user.lastName", "lenda.emri", "lenda.ects", "semester.name"];
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
    },
    semester:{
      name : "",
      startDate: "",
      endDate: "",
      departamenti: {
        emri: "",
        lokacioni:"",
        email:"",
        fakulteti:{
          emri:"",
          lokacioni:"",
          email:""
        }
      }
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