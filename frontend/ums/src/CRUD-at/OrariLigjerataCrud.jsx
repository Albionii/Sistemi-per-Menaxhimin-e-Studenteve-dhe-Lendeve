import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createOrariLigjerata,
  getAllOrariLigjeratat,
  getOrariLigjerataById,
  updateOrariLigjerataById,
  deleteOrariLigjerataById
} from '../APIRequests'
function OrariLigjerata({token}) {
  const rowsNames = [
    "Id",
    "Orari",
    "Ligjerata",
    "Emri",
    "Mbiemri",
    "Dita",
    "Ora",
    "Salla"
  ]
  
  const jsonNames = ["id", "orari.name","ligjerata.lenda.emri","ligjerata.professor.user.firstName", "ligjerata.professor.user.lastName", "dita", "ora", "salla"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    id:"",
    orari:{
      id: "",
      name: ""
    },
    ligjerata: {
        id: "",
        lenda: {
          id: "",
          emri: ""
        },
        professor: {
          id: "",
          user: {
            id: "",
            firstName: "",
            lastName: ""
          }
        }
    },
    dita: "",
    ora: "",
    salla: ""
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createOrariLigjerata} 
        getAllAPI = {getAllOrariLigjeratat} 
        getByIDAPI = {getOrariLigjerataById}
        updateAPI = {updateOrariLigjerataById}
        deleteAPI = {deleteOrariLigjerataById}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
        token={token}
         />
    </>
  )
}

export default OrariLigjerata