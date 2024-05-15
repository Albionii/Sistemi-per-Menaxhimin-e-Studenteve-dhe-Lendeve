import { useState } from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditDialog from './EditDialog';


export default function EditButton ({ligjerataID, onLigjerataEdit, formDataJson, API}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }


  return (
    <>
       <button
        type="button"
        data-drawer-target="drawer-update-product"
        data-drawer-show="drawer-update-product"
        aria-controls="drawer-update-product"
        className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 -ml-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        Edit
      </button>
      <Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ padding: '0px' }}>
          <EditDialog setConfirmExit = {handleClose} ligjerataID = {ligjerataID} onLigjerataEdit={onLigjerataEdit} formDataJsoN={formDataJson} API={API}/>
        </DialogContent>
      </Dialog>
    </Fragment>
    </>
  )
}