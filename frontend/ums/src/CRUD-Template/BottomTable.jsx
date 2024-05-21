import { useState } from "react";
import { useEffect } from "react";
import EditButton from "./EditButton";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import PreviewButton from "./PreviewButton";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function BottomTable({ theKey, rows, API, isPreviewAvailable, formDataJson, jsonName}) {
  const [formData, setFormData] = useState([]);
  const [urlGetAll, messageGetAll] = API.getAll();
  const [urlDelete, messageDelete] = API.delete();
  const errorAlert = (message) => API.errorAlert(message);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getAllRows();
  }, [theKey]);

  const onLigjerataEdit = () => {
    getAllRows();
  };

  const getAllRows = async () => {
    try {
      const fetchAllProfesorLenda = await axios.get(urlGetAll);
      setFormData(fetchAllProfesorLenda.data);
    } catch (error) {
      errorAlert(messageGetAll);
      console.log(error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(urlDelete + `${id}`);
      getAllRows();
    } catch (error) {
      errorAlert(messageDelete);
      console.log(error);
    }
  };

  function accessJsonNames(obj, jsonNames) {

    const properties = jsonNames.split('.');
    let result = obj;
    for (const prop of properties) {
      result = result[prop];
      if (result === undefined) {
        return undefined; // Property not found
      }
    }
    return result;
  }

  return (
    <>
      <div className="overflow-x-autowid overflow-y-scroll max-h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {rows.map((row, index) => (
                <th key={index} scope="col" className="p-4">
                  {row}
                </th>
              ))}
              <th>
                Butonat
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.map(p => (
              <tr key={p.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                {
                  jsonName.map((jsonNames, index) => (
                    <td key={index} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {accessJsonNames(p, jsonNames)+""}
                      </div>
                    </td>
                  ))
                }
                
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center space-x-4">
                    <EditButton ligjerataID={p.id} onLigjerataEdit={onLigjerataEdit} formDataJson={formDataJson} API = {API}/>
                    {isPreviewAvailable ? <PreviewButton /> : ""}
                    <DeleteButton id={p.id} onDelete={deleteRow} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}