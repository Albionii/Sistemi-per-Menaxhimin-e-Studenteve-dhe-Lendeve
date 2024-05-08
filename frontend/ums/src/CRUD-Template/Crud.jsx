import TopTable from './TopTable.jsx'
import BottomTable from './BottomTable.jsx'
import { useState } from 'react';
import { errorAlert } from '../APIRequests.js';
export default function Crud({rows, createAPI,getAllAPI, getByIDAPI, updateAPI,deleteAPI, isPreviewAvailable, addButtonJson, editButtonJson, formDataJson}){
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
      <TopTable renderBot={renderBot} addButton={addButtonJson} formDataJson={formDataJson}/>
      <BottomTable 
        theKey={num} 
        rows={rows} 
        API={API} 
        addButtonJson={addButtonJson} 
        editButtonJson={editButtonJson} 
        formDataJson={formDataJson}
        isPreviewAvailable={isPreviewAvailable}
      />

     </>

  )
}