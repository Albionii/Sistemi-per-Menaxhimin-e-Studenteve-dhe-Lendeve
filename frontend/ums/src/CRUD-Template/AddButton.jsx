import { lendaAddButton } from "./AddEditButtons/AddEditLenda"
import { ligjerataAddButton } from "./AddEditButtons/AddEditLigjerata"
import { provimiAddButton } from "./AddEditButtons/AddEditProvimet"
export default function AddButton ({setConfirmExit, renderBot, formDataJson, API}) {
  
  return(
    <>
      {/* {ligjerataAddButton({setConfirmExit, renderBot, formDataJson, API})} */}
      {/* {lendaAddButton({setConfirmExit, renderBot, formDataJson, API})} */}
      {provimiAddButton({setConfirmExit, renderBot, formDataJson, API})}
      {/* {userAddButton({setConfirmExit, renderBot, formDataJson, API})} */}
    </>
  )
}