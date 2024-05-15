import { lendaEditButton } from "./AddEditButtons/AddEditLenda.jsx";
import { ligjerataEditButton } from "./AddEditButtons/AddEditLigjerata.jsx";
import { provimiEditButton } from "./AddEditButtons/AddEditProvimet.jsx";

export default function EditDialog({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API}){
  return (
    <>
      {/* {ligjerataEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API})} */}
      {/* {lendaEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API})} */}
      {provimiEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API})}
    </>
  )

}