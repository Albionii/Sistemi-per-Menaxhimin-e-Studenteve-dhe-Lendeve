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
    "Statusi"
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
         />
    </>
  )
}

export default SampleCrud