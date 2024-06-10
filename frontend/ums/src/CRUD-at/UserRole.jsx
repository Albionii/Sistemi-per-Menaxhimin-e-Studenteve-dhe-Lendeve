import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createLenda,
  deleteLendaByID,
  getAllUsers,
  getLendaByID,
  updateUserByID
} from '../APIRequests'
function UserRole({token}) {
  const rowsNames = [
    "ID",
    "Emri",
    "Mbiemri",
    "Roli",
  ]
  
  const jsonNames = ["id", "firstName","lastName","role"];

  const formDataJson = {
    id:"",
    firstName:"",
    lastName:"",
    role:""
  }

  const buttonsAvailable = {
    preview: false,
    add: false,
    edit: true,
    delete: false
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createLenda} 
        getAllAPI = {getAllUsers} 
        getByIDAPI = {getLendaByID}
        updateAPI = {updateUserByID}
        deleteAPI = {deleteLendaByID}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
        token={token}
         />
    </>
  )
}

export default UserRole