import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { getAllGrupet } from '../../APIRequests';
export const OrariAddButton = ({setConfirmExit, renderBot, formDataJson, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlGrupi, errorGrupi] = getAllGrupet();


  const [urlCreate, errorCreate] = API.create();
  const [formData, setFormData] = useState(formDataJson);

  const [name, setEmri] = useState("");
  const [grupi, setGrupi] = useState("");
  const [grupet, setGrupet] = useState([]);


  useEffect(() => {
    getGrupet();
  }, []);

  const getGrupet = async () => {
    try {
      const fetchGrupet = await axios.get(urlGrupi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGrupet(fetchGrupet.data);
    } catch (error) {
      API.errorAlert(errorGrupi);
      console.log(error);
    }
  };
  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      name : e.target.value
    });
  }

  const handleChangedGrupet = (e) => {
    setGrupi(e.target.value);
    setFormData({
      ...formData,
      grupi : grupet.find(grup => grup.id == e.target.value)
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlCreate, formData, {
        headers: {
          Authorization: `Bearer ${token}`
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
            Krijo Orarin
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
                  Emri
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}} 
                  value={name}
                  onInput={handleEmri}
                  placeholder='Emri Orarit'
                  required  
                />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Grupi
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={grupi}
                onChange={handleChangedGrupet}
              >
                <option value="">Selekto Grupin</option>
                {grupet.map(grup => (
                  <option key={grup.id} value={grup.id}>{grup.emri}</option>
                ))}
              </select>
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
            Add Orari
          </button>
        </form>
      </div>
    </>
  )
}
export const OrariEditButton = ({setConfirmExit, item, onLigjerataEdit, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlGrupi, errorGrupi] = getAllGrupet();

  const [grupet, setGrupet] = useState([]);
  const [grupi, setSelectedGrupi] = useState(item.grupi.emri);

  const [urlUpdate, errorUpdate] = API.update();
  const [formData, setFormData] = useState(item);

  const [name, setEmri] = useState('');

  useEffect(() => {
    getGrupet();
  }, []);

  const getGrupet = async () => {
    try {
      const fetchGrupet = await axios.get(urlGrupi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGrupet(fetchGrupet.data);
    } catch (error) {
      API.errorAlert(errorGrupi);
      console.log(error);
    }
  };

  const handleChangedGrupet = (e) => {
    setSelectedGrupi(e.target.value);
    setFormData({
      ...formData,
      grupi : grupet.find(grup => grup.id == e.target.value)
    })
  }
  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      name : e.target.value
    });
  }
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(urlUpdate + item.id, formData, {
        headers: {
          Authorization: `Bearer ${token}`
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
      <div className="relativew-full rounded-lg shadow" style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">
            Edito Orarin
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
                  Emri
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}} 
                  value={name == "" && formData != null ? formData.name : name}
                  onInput={handleEmri}
                  placeholder='Emri Fakultetit'  
                />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Grupi
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={grupi}
                onChange={handleChangedGrupet}
              >
                <option value="">{formData != null ? formData.grupi.emri : ""}</option>
                {grupet.map(grup => (
                  <option key={grup.id} value={grup.id}>{grup.emri}</option>
                ))}
              </select>
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
            Edit Orari
          </button>
        </form>
      </div>
    </>
  )
}
