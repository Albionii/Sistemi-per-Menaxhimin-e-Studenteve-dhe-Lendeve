import { useState } from "react";
import { useEffect } from "react";
import EditButton from "./EditButton";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import PreviewButton from "./PreviewButton";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function BottomTable({ theKey, rows, API, buttonsAvailable, jsonName }) {
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
      try {
        result = result[prop];
        if (result === undefined) {
          return undefined; // Property not found
        }
      }catch(error){
        console.log(error);
      }
    }
    return result;
  }

  return (
    <>
      <div className="overflow-x-autowid" style={{margin:"15px"}}>
        <table className="w-full" style={{ background: colors.primary[600]}}>
          <thead className="text-xs uppercase">
            <tr>
              {rows.map((row, index) => (
                <th key={index} scope="col" className="p-4">
                  {row}
                </th>
              ))}
              <th>Butonat</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((p) => (
              <tr
                key={p.id}
                className="border-b"
                style={{
                  background: colors.primary[400],
                  borderBottomColor: colors.primary[500],

                }}
              >
                {jsonName.map(jsonNames => (
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {accessJsonNames(p, jsonNames) + ""}
                    </div>
                  </td>
                ))}



                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  <div className="flex items-center space-x-4 justify-center">
                    {buttonsAvailable.edit && <EditButton item={p} onLigjerataEdit={onLigjerataEdit} API={API} />}
                    {buttonsAvailable.preview && <PreviewButton />}
                    {buttonsAvailable.delete && <DeleteButton id={p.id} onDelete={deleteRow} />}
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
