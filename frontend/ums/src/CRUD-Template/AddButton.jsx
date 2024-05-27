import { createLenda, createLigjerata, createProfessor,createDepartamenti, createProvimi, createSalla, createFakulteti } from "../APIRequests";
import { lendaAddButton } from "./AddEditButtons/AddEditLenda"
import { ligjerataAddButton } from "./AddEditButtons/AddEditLigjerata"
import { provimiAddButton } from "./AddEditButtons/AddEditProvimet"
import { sallaAddButton } from "./AddEditButtons/AddEditSalla";
import {departamentiAddButton} from "./AddEditButtons/AddEditDepartamenti";
import { fakultetiAddButton } from "./AddEditButtons/AddEditFakulteti";
export default function AddButton ({setConfirmExit, renderBot, formDataJson, API}) {
  let prompt = {setConfirmExit, renderBot, formDataJson, API};

  const whichAdd = () => {
    switch (API.create()[0]){
      case createProvimi()[0]: 
        return provimiAddButton(prompt);
      case createLigjerata()[0] : 
        return ligjerataAddButton(prompt);
      case createLenda()[0]: 
        return lendaAddButton(prompt);
      case createSalla()[0]:
        return sallaAddButton(prompt);
      case createDepartamenti()[0]:
        return departamentiAddButton(prompt);
      case createFakulteti()[0]:
        return fakultetiAddButton(prompt);
      default:
        return API.errorAlert("Nuk ekziston add butoni per kete CRUD ose nuk e keni shtuar ne AddButton.jsx");
    }
  }
  
  return(<>{whichAdd()}</>)
}