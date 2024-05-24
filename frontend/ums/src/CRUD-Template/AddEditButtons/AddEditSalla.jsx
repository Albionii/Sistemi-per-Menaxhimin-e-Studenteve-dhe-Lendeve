import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllLendet, getAllProfessors } from '../../APIRequests';
export const sallaAddButton = ({setConfirmExit, renderBot, formDataJson, API}) => {
  const [urlCreate, errorCreate] = API.create();

  const [numriSalles, setNumriSalles] = useState('');
  const [lokacioni, setLokacioni] = useState('');
  
  const handleClick = () => {
    setConfirmExit();
  }
  

  const [formData, setFormData] = useState(formDataJson);



  const handleSalla = (e) => {
    setNumriSalles(e.target.value);
    setFormData({
      ...formData,
      numriSalles : e.target.value
    })
  }
  
  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      lokacioni : e.target.value
    })
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlCreate, formData);
      renderBot();
    } catch (error) {
      API.errorAlert(errorCreate);
      console.error(error);
    }
    setConfirmExit();
  };
  

  return (
    <>
      <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Krijo Sallen
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
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Numri Salles
                </label>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={numriSalles}
                  onInput={handleSalla}
                  placeholder='Numri i Salles'  
                  />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lokacioni
              </label>

              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={lokacioni}
                  onInput={handleLokacioni}
                  placeholder='Lokacioni'  
                  />
             
             
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
            Add Salla
          </button>
        </form>
      </div>
    </>
  )
}
export const sallaEditButton = ({setConfirmExit, item, onLigjerataEdit, API}) => {
  const [urlUpdate, errorUpdate] = API.update();
  
  const [numriSalles, setNumriSalles] = useState('');
  const [lokacioni, setLokacioni] = useState('');
  
  
  const [formData, setFormData] = useState(item);

  const handleClick = () => {
    setConfirmExit();
  }
  
  const handleSalla = (e) => {
    setNumriSalles(e.target.value);
    setFormData({
      ...formData,
      numriSalles : e.target.value
    })
  }
  
  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      lokacioni : e.target.value
    })
  }


 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(urlUpdate + item.id, formData);
      setConfirmExit();
      onLigjerataEdit();
      
    } catch (error) {
      API.errorAlert(errorUpdate);
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edito Sallen
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
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Numri Salles
                </label>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={numriSalles == '' && formData != null ? formData.numriSalles:numriSalles}
                  onInput={handleSalla}
                  placeholder='Numri i Salles'  
                  />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lokacioni
              </label>

              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={lokacioni == '' && formData != null ? formData.lokacioni : lokacioni}
                  onInput={handleLokacioni}
                  placeholder='Lokacioni'  
                  />
             
             
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
            Edito Salla
          </button>
        </form>
      </div>
    </>
  )
}
