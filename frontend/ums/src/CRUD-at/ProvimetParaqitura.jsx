import React from 'react'
import Crud from '../CRUD-Template/Crud'

import {
  getLendaByID,
  updateLendaByID,
  createParaqitjaProvimit,
  getAllParaqitjaProvimeve,
  deleteParaqitjaProvimeveByID
} from '../APIRequests'
function ProvimetParaqitura() {
  const rowsNames = [
    "Lenda",
    "Emri Profesorit",
    "Mbiemri Profesorit",
    "Data Paraqitjes",
    "Data Notimit",
    "Nota"
  ]
  
  const jsonNames = ["provimi.ligjerata.lenda.emri", "provimi.ligjerata.professor.user.firstName","provimi.ligjerata.professor.user.lastName","dataParaqitjes", "dataVendosjes", "nota"];
  const buttonsAvailable = {
    preview: true,
    add: true,
    edit: false,
    delete: false
  }
  const formDataJson = {
    dataParaqitjes: "",
    dataVendosjes: "",
    nota: "",
    provimi:{
      ligjerata:{
        lenda:{
          emri:""
        },
        professor:{
          user:{
            firstName:"",
            lasttName:""
          }
        }
      }
    }
  }


  return (
    <>
      <Crud 
        rows={rowsNames}  
        createAPI = {createParaqitjaProvimit} 
        getAllAPI = {getAllParaqitjaProvimeve} 
        getByIDAPI = {getLendaByID}
        updateAPI = {updateLendaByID}
        deleteAPI = {deleteParaqitjaProvimeveByID}
        buttonsAvailable={buttonsAvailable}
        formDataJson = {formDataJson}
        jsonName={jsonNames}
         />
    </>
  )
}

export default ProvimetParaqitura