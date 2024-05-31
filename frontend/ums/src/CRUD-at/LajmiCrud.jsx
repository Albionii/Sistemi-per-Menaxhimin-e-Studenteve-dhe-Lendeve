import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  createLajmi,
  getAllLajmet,
  getLajmiById,
  updateLajmiById,
  deleteLajmiById
} from '../APIRequests'
function Lajmi() {
  const rowsNames = [
    "Id",
    "Mesazhi",
    "Departamenti"
  ]
  
  const jsonNames = ["id", "mesazhi","departamenti.emri"];
  const buttonsAvailable = {
    preview: false,
    add: true,
    edit: true,
    delete: true
  }
  const formDataJson = {
    id:"",
    mesazhi:"",
    departamenti: {
        id: "",
        emri: ""
    }
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createLajmi} 
        getAllAPI = {getAllLajmet} 
        getByIDAPI = {getLajmiById}
        updateAPI = {updateLajmiById}
        deleteAPI = {deleteLajmiById}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default Lajmi