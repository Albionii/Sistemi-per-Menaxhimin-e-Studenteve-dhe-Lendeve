import { createLenda, createLigjerata, createProvimi } from "../APIRequests";
import { lendaAddButton } from "./AddEditButtons/AddEditLenda"
import { ligjerataAddButton } from "./AddEditButtons/AddEditLigjerata"
import { provimiAddButton } from "./AddEditButtons/AddEditProvimet"
export default function AddButton ({setConfirmExit, renderBot, formDataJson, API}) {

  const whichAdd = () => {
    switch (API.create()[0]){
      case createProvimi()[0]: 
        return provimiAddButton({setConfirmExit, renderBot, formDataJson, API});
      case createLigjerata()[0] : 
        return ligjerataAddButton({setConfirmExit, renderBot, formDataJson, API});
      case createLenda()[0]: 
        return lendaAddButton({setConfirmExit, renderBot, formDataJson, API});
      default:
        return null;
    }
  }
  
  return(<>{whichAdd()}</>)
}