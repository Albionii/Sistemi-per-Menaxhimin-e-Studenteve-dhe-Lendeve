import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';


export default function DeleteAlert({open, close, runDelete}){

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    close();
  }

  const noDelete = ()=>{
    handleClose();
  }
  
  const yesDelete = ()=>{
    runDelete();
    handleClose()
  }



  return(
    <>
   <Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ padding: '0px'}}>
          <div className="relative  w-full h-full rounded-lg shadow " style={{backgroundColor: colors.primary[500]}}>
            <div className="relative w-full h-full md:h-auto">
              <div className="relative p-4 text-center  rounded-lg shadow  sm:p-5" style={{backgroundColor: colors.primary[500]}}>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  style={{backgroundColor: colors.primary[500]}}
                  data-modal-toggle="deleteModal"
                  onClick={handleClose}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mb-4 " style={{backgroundColor: colors.primary[500]}}>
                  A jeni të sigurt që doni të fshini këtë rresht?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    type="button"
                    className="py-2 px-3 text-sm font-medium   rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10   dark:border-gray-500  dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={noDelete}
                    style={{backgroundColor: colors.primary[600]}}
                  >
                    Jo, nuk jam
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={yesDelete}
                  >
                    Po, jam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>


      
    </>
  )
}