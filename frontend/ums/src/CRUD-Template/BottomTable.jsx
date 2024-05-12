import { useState } from 'react';
import { useEffect } from 'react';
import EditButton from "./EditButton";
import axios from 'axios';
import DeleteButton from './DeleteButton';
import PreviewButton from './PreviewButton';

export default function BottomTable({ theKey, rows, API, addButtonJson, editButtonJson, isPreviewAvailable, formDataJson, jsonName }) {
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
    try {
      const fetchAllProfesorLenda = await axios.get(urlGetAll);
      setFormData(fetchAllProfesorLenda.data);
    } catch (error) {
      errorAlert(messageGetAll);
      console.log(error);
    }

  }


  const deleteRow = async (id) => {
    try {
      await axios.delete(urlDelete + `${id}`);
      getAllRows();

    } catch (error) {
      errorAlert(messageDelete)
      console.log(error);
    }
  }

  function accessJsonNames(obj, jsonNames) {


    //i merr emrat qe jan dergu ne parameter
    const properties = jsonNames.split('.');

    //komplet objektin e run ne variablen result
    let result = obj;

    //for loop qe i merr krejt stringjet e parametrit qe jan ba split
    for (const prop of properties) {

      //vlera e re e objektit osht vlera e parametrit jsonName
      result = result[prop];
      if (result === undefined) {
        return undefined; // Property not found
      }
    }
    return result;
  }


  return (
    <>
      <div className="overflow-x-autowid">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr key={p.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                {
                  jsonName.map(jsonNames => (
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {accessJsonNames(p, jsonNames)}
                      </div>
                    </td>
                  ))
                }
                
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center space-x-4">
                    

                    <EditButton ligjerataID={p.id} onLigjerataEdit={onLigjerataEdit} />
                    {
                      isPreviewAvailable ? <PreviewButton /> : ""
                    }
                    <DeleteButton id={p.id} onDelete={deleteRow} />
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