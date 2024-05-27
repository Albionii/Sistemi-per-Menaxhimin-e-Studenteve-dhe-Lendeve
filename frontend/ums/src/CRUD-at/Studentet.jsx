import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudentByID,
  deleteStudentByID
} from '../APIRequests'
function Studentet() {
  const rowsNames = [
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
  
  const jsonNames = ["user.firstName","user.lastName","user.email","user.dateLindja", "user.gjinia", "user.nrTelefonit", "user.shteti", "user.qyteti", "user.rruga", "user.zipcode", "user.role"];
  const buttonsAvailable = {
    preview: false,
    add: false,
    edit: true,
    delete: true
  }
  const formDataJson = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        dateLindja: "",
        gjinia: "",
        nrTelefonit: "",
        qyteti: "",
        zipcode: "",
        shteti: "",
        rruga: "",
        role: ""
    }  
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createStudent} 
        getAllAPI = {getAllStudents} 
        getByIDAPI = {getStudentByID}
        updateAPI = {updateStudentByID}
        deleteAPI = {deleteStudentByID}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Studentet