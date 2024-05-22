import TopTable from './TopTable.jsx'
import BottomTable from './BottomTable.jsx'
import { useEffect, useState } from 'react';
import { errorAlert } from '../APIRequests.js';
import axios from 'axios';
export default function Crud({rows, createAPI,getAllAPI, getByIDAPI, updateAPI,deleteAPI,formDataJson, isPreviewAvailable,jsonName}){
  const[num, setNum] = useState(0);

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


  

  return(
    <>
      <TopTable renderBot={renderBot} formDataJson={formDataJson} API={API}/>
      <BottomTable 
        theKey={num} 
        rows={rows} 
        API={API} 
        formDataJson={formDataJson}
        isPreviewAvailable={isPreviewAvailable}
        jsonName={jsonName}
      />

     </>

  )
}