import { useState } from 'react';
import { useEffect } from 'react';
import EditButton from "./EditButton";
import axios from 'axios';
import DeleteButton from './DeleteButton';
import PreviewButton from './PreviewButton';

export default function BottomTable({theKey, rows, API, addButtonJson, editButtonJson, isPreviewAvailable, formDataJson}){
 const [formData, setFormData] = useState([]);
 const [urlGetAll, messageGetAll] = API.getAll();
 const [urlDelete, messageDelete] = API.delete();
 const errorAlert = (message) => API.errorAlert(message);

   useEffect(() => {  
    getAllRows();
  }, [theKey]);

  const onLigjerataEdit = () => {
    getAllRows();
  }


  const getAllRows = async () => {
    try{
      const fetchAllProfesorLenda = await axios.get(urlGetAll);
      setFormData(fetchAllProfesorLenda.data);
    }catch(error){
      errorAlert(messageGetAll);
      console.log(error);
    }
    
  }


  const deleteRow = async (id) => {
    try{
      await axios.delete(urlDelete + `${id}`);
      getAllRows();
      
    }catch(error){
      errorAlert(messageDelete)
      console.log(error);
    }
  }

  
  return (
    <>   
      <div className="overflow-x-autowid">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>    
              {
                rows.map((row, index) => (
                  <th key={index} scope="col" className="p-4">
                    {row}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {formData.map(p => (
                <tr key = {p.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.firstName}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.lastName}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.gjinia}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.lenda.emri}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.lenda.ects}
                      </div>
                    </td>
                  
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center space-x-4">

                    <EditButton ligjerataID = {p.id} onLigjerataEdit={onLigjerataEdit}/>
                    {
                      isPreviewAvailable ? <PreviewButton/> : ""
                    }
                    <DeleteButton id={p.id} onDelete={deleteRow}/>
                  </div>
                </td>
              </tr>  
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}