import { updateDepartamentiByID, updateFakultetiByID, updateGrupiById, updateLajmiById, updateLendaByID, updateLigjerataByID, updateOrariById, updateOrariLigjerataById, updateProfessorByID, updateProvimiByID, updateSallaByID, updateSemesterById, updateStudentByID, updateUserByID } from "../APIRequests.js";
import { departamentiEditButton } from "./AddEditButtons/AddEditDepartamenti.jsx";
import { fakultetiEditButton } from "./AddEditButtons/AddEditFakulteti.jsx";
import { GrupiEditButton } from "./AddEditButtons/AddEditGrupi.jsx";
import { LajmiEditButton } from "./AddEditButtons/AddEditLajmi.jsx";
import { lendaEditButton } from "./AddEditButtons/AddEditLenda.jsx";
import { ligjerataEditButton } from "./AddEditButtons/AddEditLigjerata.jsx";
import { OrariEditButton } from "./AddEditButtons/AddEditOrari.jsx";
import { OrariLigjerataEditButton } from "./AddEditButtons/AddEditOrariLigjerata.jsx";
import { professorEditButton } from "./AddEditButtons/AddEditProfesori.jsx";
import { provimiEditButton } from "./AddEditButtons/AddEditProvimet.jsx";
import { sallaEditButton } from "./AddEditButtons/AddEditSalla.jsx";
import { SemesterEditButton } from "./AddEditButtons/AddEditSemester.jsx";
import { studentetEditButton } from "./AddEditButtons/AddEditStudentet.jsx";
import { userRoleEditButton } from "./AddEditButtons/AddEditUserRole.jsx";

export default function EditDialog({setConfirmExit, item, onLigjerataEdit, API}){
  
  let prompt = {setConfirmExit, item, onLigjerataEdit, API};
  const whichEdit = () => {
    switch (API.update()[0]){
      case updateProvimiByID()[0] : 
        return provimiEditButton(prompt);
      case updateLigjerataByID()[0] : 
        return ligjerataEditButton(prompt);
      case updateLendaByID()[0] : 
        return lendaEditButton(prompt);
      case updateSallaByID()[0]:
        return sallaEditButton(prompt);
      case updateProfessorByID()[0]:
        return professorEditButton(prompt);
      case updateStudentByID()[0]:
        return studentetEditButton(prompt);
      case updateUserByID()[0]:
        return userRoleEditButton(prompt);
      case updateFakultetiByID()[0]:
        return fakultetiEditButton(prompt);
      case updateDepartamentiByID()[0]:
        return departamentiEditButton(prompt);
      case updateSemesterById()[0]:
        return SemesterEditButton(prompt);
      case updateGrupiById()[0] :
        return GrupiEditButton(prompt);
      case updateOrariById()[0] : 
        return OrariEditButton(prompt);
      case updateLajmiById()[0] :
        return LajmiEditButton(prompt);
      case updateOrariLigjerataById()[0]:
        return OrariLigjerataEditButton(prompt);
      default:
        return API.errorAlert("Nuk ekziston edit butoni per kete CRUD ose nuk e keni shtuar ne EditDialog.jsx");
    }
  }
  
  return (<>{whichEdit()}</>)

}