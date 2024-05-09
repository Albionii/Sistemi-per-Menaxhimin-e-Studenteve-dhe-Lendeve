import React from 'react'
import Crud from './CRUD-Template/Crud'

import {
  createLigjerata,
  getAllLigjeratat, 
  getLigjerataByID, 
  updateLigjerataByID, 
  deleteLigjerataByID,
  getAllLendet
} from './APIRequests'
function SampleCrud() {
  const rowsNames = [
    "Profesori ID",
    "Emri",
    "Mbiemri",
    "Gjinia",
    "Lenda",
    "ECTS",
    "email",
    "buttons"
  ]

  const isPreviewAvailable = false;

  const addButtonJson = {
    titulli : "Krijo Ligjeraten",
    inputat : {
      I1 : {
        emri : "ID",
        getAPI : ""
      },
      I2 : {
        emri : "Lenda",
        getAPI : getAllLendet
      },
      I3 : {
        emri : "Emri",
        getAPI : ""
      },
      I4 : {
        emri : "Mbiemri",
        getAPI : ""
      }
    },
    button : {
      emri : "Add Ligjerata"
    }
  }

  const editButtonJson = {
    titulli : "",
    inputat : {
      1 : {
        emri : "",
        getAPI : ""
      },
      2 : {
        emri : "",
        getAPI : ""
      },
      3 : {
        emri : "",
        getAPI : ""
      }
    },
    button : {
      emri : ""
    }
  }

  const formDataJson = {
    // Ketu eshte json per api qe ki me dergu ne backend (si ne Postman)
    professor: {
      id: '',
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        dateLindja: null,
        gjinia: '',
        role: null
      }
    },
    lenda: {
      id: '',
      emri: '',
      ects: '',
      obligative: false
    }
  }
  const jsonNames = ["professor.id","professor.user.firstName","professor.user.lastName","professor.user.gjinia","lenda.emri","lenda.ects","professor.user.email"];

  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createLigjerata} 
        getAllAPI = {getAllLigjeratat} 
        getByIDAPI = {getLigjerataByID}
        updateAPI = {updateLigjerataByID}
        deleteAPI = {deleteLigjerataByID}
        isPreviewAvailable = {isPreviewAvailable}
        addButtonJson = {addButtonJson}
        editButtonJson = {editButtonJson}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default SampleCrud