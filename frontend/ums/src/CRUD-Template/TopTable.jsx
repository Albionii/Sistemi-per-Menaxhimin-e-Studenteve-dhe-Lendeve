import { useState } from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddButton from './AddButton';
import SearchBar from './SearchBar';

export default function TopTable({renderBot, addButton, formDataJson}){
  const [open, setOpen] = useState(false);
  // const [confirmExit, setConfirmExit] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  return(
      <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-2/3">
          <form className="flex items-center md:w-2/3">
            <SearchBar/>
          {/* <select
                id="lenda"
                className="md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                // value=""
                // onChange=""
              >
                <option>Selekto Kategorinë</option>
                <option>Profesori ID</option>
                <option>Emri</option>
                <option>Mbiemri</option>
                <option>Gjinia</option>
                <option>Lenda</option>
                <option>ECTS</option>
          </select> */}
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            type="button"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            onClick={handleClickOpen}
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            {addButton.button.emri}
          </button>
          </div>
      </div>
      <Fragment>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogContent sx={{ padding: '0px' }}>
            <AddButton setConfirmExit = {handleClose} renderBot={renderBot} addButtonJson={addButton} formDataJson={formDataJson}/>
          </DialogContent>
        </Dialog>
      </Fragment>
      </>
    
  )
}