import { updateLendaByID, updateLigjerataByID, updateProfessorByID, updateProvimiByID } from "../APIRequests.js";
import { lendaEditButton } from "./AddEditButtons/AddEditLenda.jsx";
import { ligjerataEditButton } from "./AddEditButtons/AddEditLigjerata.jsx";
import { provimiEditButton } from "./AddEditButtons/AddEditProvimet.jsx";

export default function EditDialog({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API}){
  
  const whichEdit = () => {
    switch (API.update()[0]){
      case updateProvimiByID()[0] : 
        return provimiEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API});
      case updateLigjerataByID()[0] : 
        return ligjerataEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API});
      case updateLendaByID()[0] : 
        return lendaEditButton({setConfirmExit, ligjerataID, onLigjerataEdit, formDataJson, API});
      default:
        return null;
    }
  }
  
  return (<>{whichEdit()}</>)

}