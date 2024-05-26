import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createProfessor,
  getAllProfessors,
  getProfessorByID,
  updateProfessorByID,
  deleteProfessorByID
} from '../APIRequests'
function Profesoret() {
  const rowsNames = [
    "ID",
    "Emri",
    "Mbiemri",
    "Email",
    "Datelindja",
    "Gjinia",
    "nrTelefonit",
    "Shteti",
    "Qyteti",
    "Rruga",
    "Zip",
    "Roli",
  ]
  
  const jsonNames = ["id", "user.firstName","user.lasttName","user.email","user.datelindja", "user.gjinia", "user.nrTelefonit", "user.shteti", "user.qyteti", "user.rruga", "user.zip", "user.role"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  
  const formDataJson = {
    id: 3,
    user: {
        id: 3,
        firstName: "Blend",
        lastName: "Elezi",
        email: "",
        dateLindja: null,
        gjinia: null,
        nrTelefonit: null,
        qyteti: null,
        zipcode: null,
        shteti: null,
        rruga: null,
        role: null
    }  
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createProfessor} 
        getAllAPI = {getAllProfessors} 
        getByIDAPI = {getProfessorByID}
        updateAPI = {updateProfessorByID}
        deleteAPI = {deleteProfessorByID}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Profesoret