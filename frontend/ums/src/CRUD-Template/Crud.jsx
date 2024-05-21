import TopTable from './TopTable.jsx'
import BottomTable from './BottomTable.jsx'
import { useEffect, useState } from 'react';
import { errorAlert } from '../APIRequests.js';
import axios from 'axios';
export default function Crud({rows, createAPI,getAllAPI, getByIDAPI, updateAPI,deleteAPI, isPreviewAvailable,jsonName}){
  const[num, setNum] = useState(0);
  let mockForm = null;

  const renderBot = () => {
    setNum(num+1);
  }

  const API = {
    create: createAPI,
    delete: deleteAPI,
    getByID: getByIDAPI,
    getAll: getAllAPI,
    update: updateAPI,
    errorAlert : errorAlert
  };

  const mockFormData = async() => {
    try{
      const t = await axios.get(API.getByID()[0]  + "mockForm"); // Marre API getById sepse ka url e RequestMapping edhe nje "/".
      mockForm = JSON.stringify(t.data);
    }catch(error){
      API.errorAlert("In Spring Boot there should be a mockForm() method with an object with all attributes null.")
      console.log("In Spring Boot there should be a mockForm method with an object with all data null.")
    }
  }

  useEffect(()=>{mockFormData()},[])

  

  return(
    <>
      <TopTable renderBot={renderBot} formDataJson={mockForm} API={API}/>
      <BottomTable 
        theKey={num} 
        rows={rows} 
        API={API} 
        formDataJson={mockForm}
        isPreviewAvailable={isPreviewAvailable}
        jsonName={jsonName}
      />

     </>

  )
}