import { useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
export const lendaAddButton = ({setConfirmExit, renderBot, formDataJson, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlCreate, errorCreate] = API.create();
  const[lendaEmri, setLendaEmri] = useState("");
  const[kodiLendes, setKodiLendes] = useState("");
  const[kredite, setKredite] = useState(0);
  const[obligative, setObligative] = useState(true);

  const [formData, setFormData] = useState(formDataJson);
  
  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleKodi = (e) => {
    setKodiLendes(e.target.value);
    setFormData({
      ...formData,
      kodi : e.target.value
    });
  }
  
  
  const handleLenda = (e) => {
    setLendaEmri(e.target.value);
    setFormData(
      {
        ...formData,
        emri : e.target.value

      });
  }
  
  
  const handleObligative = (e) => {
    setObligative(e.target.value);
    setFormData({
      ...formData,
      obligative : JSON.parse(e.target.value)
    });
  }

  
  const handleKredite = (e) => {
    setKredite(e.target.value);
    setFormData({
      ...formData,
      ects : e.target.value
    });
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlCreate, formData,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      renderBot();
    } catch (error) {
      API.errorAlert(errorCreate);
      console.error(error);
    }
    setConfirmExit();
  };
  

  return (
    <>
      <div className="relativew-full rounded-lg shadow" style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">
            Krijo Lëndën
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            onClick={handleClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-5 text-center">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-1 sm:col-span-1">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Kodi i Lëndës
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}} 
                  value={kodiLendes}
                  onInput={handleKodi}
                  placeholder='Kodi Lendes'  
                  required
                />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                ECTS
              </label>
              <input 
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                placeholder='Kredite'
                value={kredite}
                onInput={handleKredite}
                required
               />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Emri i Lëndës
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={lendaEmri}
                  onInput={handleLenda}
                  placeholder='Emri Lendes'  
                  required
                  />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Obligative
              </label>
              <div>
                <div className="flex items-center ps-4 border border-gray-400 rounded px-6"  style={{background: colors.primary[400]}}>
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4  border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" style={{background: colors.primary[400]}}
                    defaultChecked={true}
                    value={true}
                    onInput={handleObligative}
                    required

                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium"
                  >
                    Po
                  </label>
                </div>
                <div className="flex items-center ps-4 border border-gray-400 rounded px-6"  style={{background: colors.primary[400]}}>
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4  border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 " style={{background: colors.primary[400]}}
                    defaultChecked={false}
                    value={false}
                    onInput={handleObligative}
                    required
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium"
                  >
                    Jo
                  </label>
                </div>
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Lënda
          </button>
        </form>
      </div>
    </>
  )
}
export const lendaEditButton = ({setConfirmExit, item, onLigjerataEdit, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  //Per inputat select lendet
  const [formData, setFormData] = useState(item);

  const[lendaEmri, setLendaEmri] = useState(item.emri);
  const[kodiLendes, setKodiLendes] = useState(item.kodi);
  const[kredite, setKredite] = useState(item.ects);
  const[obligative, setObligative] = useState(item.obligative);


  const handleClick = () => {
    setConfirmExit();
  }

  const handleKodi = (e) => {
    setKodiLendes(e.target.value);
    setFormData({
      ...formData,
      kodi : e.target.value
    });
  }
  
  
  const handleLenda = (e) => {
    setLendaEmri(e.target.value);
    setFormData(
      {
        ...formData,
        emri : e.target.value

      });
  }
  
  
  const handleObligative = (e) => {
    setObligative(e.target.value);
    setFormData({
      ...formData,
      obligative : JSON.parse(e.target.value)
    });
    console.log("o : " + e.target.value);
  }

  

  
  const handleKredite = (e) => {
    setKredite(e.target.value);
    setFormData({
      ...formData,
      ects : e.target.value
    });
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      await axios.put(urlUpdate + item.id, formData,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setConfirmExit();
      onLigjerataEdit();
      
    } catch (error) {
      API.errorAlert(errorUpdate);
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="relative w-full rounded-lg shadow" style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">
            Edito Lëndën
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            onClick={handleClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-5 text-center">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-1 sm:col-span-1">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Kodi i Lëndës
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={kodiLendes==''&& formData != null?formData.kodi:kodiLendes}
                  onInput={handleKodi}
                  placeholder='Kodi Lendes'  
                />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                ECTS
              </label>
              <input 
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                placeholder='Kredite'
                value={kredite == 0 && formData != null? formData.ects : kredite}
                onInput={handleKredite}
               />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Emri i Lëndës
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={lendaEmri == '' && formData != null ? formData.emri : lendaEmri}
                  onInput={handleLenda}
                  placeholder='Emri Lendes'  
                  />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Obligative
              </label>
              <div>
                <div className="flex items-center ps-4 border border-gray-400 rounded px-6"  style={{background: colors.primary[400]}} >
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 " style={{background: colors.primary[400]}}
                    defaultChecked={obligative == null  && formData != null? formData.obligative : obligative}
                    value={true}
                    onInput={handleObligative}

                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium"
                  >
                    Po
                  </label>
                </div>
                <div className="flex items-center ps-4 border border-gray-400 rounded px-6"  style={{background: colors.primary[400]}}>
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 " style={{background: colors.primary[400]}}
                    defaultChecked={obligative == null  && formData != null ? !formData.obligative : !obligative}
                    value={false}
                    onInput={handleObligative}
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium"
                  >
                    Jo
                  </label>
                </div>
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Edit Lënda
          </button>
        </form>
      </div>
    </>
  )
}
