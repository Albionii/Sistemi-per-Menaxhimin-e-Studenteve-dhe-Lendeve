import { createLenda, createLigjerata, createProfessor,createDepartamenti, createProvimi, createSalla, createFakulteti, createSemester, createGrupi, createOrari, createLajmi, createOrariLigjerata } from "../APIRequests";
import { lendaAddButton } from "./AddEditButtons/AddEditLenda"
import { ligjerataAddButton } from "./AddEditButtons/AddEditLigjerata"
import { provimiAddButton } from "./AddEditButtons/AddEditProvimet"
import { sallaAddButton } from "./AddEditButtons/AddEditSalla";
import {departamentiAddButton} from "./AddEditButtons/AddEditDepartamenti";
import { fakultetiAddButton } from "./AddEditButtons/AddEditFakulteti";
import { AddEditSemester } from "./AddEditButtons/AddEditSemester";
import { GrupiAddButton } from "./AddEditButtons/AddEditGrupi";
import { OrariAddButton } from "./AddEditButtons/AddEditOrari";
import { LajmiAddButton } from "./AddEditButtons/AddEditLajmi";
import { OrariLigjerataAddButton } from "./AddEditButtons/AddEditOrariLigjerata";

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
      case createSemester()[0]:
        return AddEditSemester(prompt);
      case createGrupi()[0]:
        return GrupiAddButton(prompt);
      case createOrari()[0]:
        return OrariAddButton(prompt);
      case createLajmi()[0]:
        return LajmiAddButton(prompt);
      case createOrariLigjerata()[0]:
        return OrariLigjerataAddButton(prompt);
      default:
        return API.errorAlert("Nuk ekziston add butoni per kete CRUD ose nuk e keni shtuar ne AddButton.jsx");
    }
  }
  
  return(<>{whichAdd()}</>)
}