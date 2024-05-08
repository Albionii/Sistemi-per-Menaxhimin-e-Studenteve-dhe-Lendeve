import { useEffect, useState } from "react";
import axios from "axios";

export default function EditDialog({setConfirmExit, ligjerataID, onLigjerataEdit}){
  const [newFormLigjerata, setNewFormLigjerata] = useState({
    professor: {
      id: '',
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        dateLindja: null,
        gjinia: '',
        addresses: [],
        nrTelefonit: [],
        role: null
      }
    },
    lenda: {
      id: '',
      emri: '',
      ects: '',
      obligative: false
    },
    assignments: [],
    postimet: []
  })

  const [lendet, setLendet] = useState([]);
  const [selectedLenda, setSelectedLenda] = useState('');

  const getLigjerata = async () => {
    try{
      const fetchLigjerata = await axios.get(`http://localhost:8080/professorLenda/${ligjerataID}`);
      console.log(fetchLigjerata.data)
      setNewFormLigjerata(fetchLigjerata.data)
    }catch(error) {
      console.log(error)
    }
  }

  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get('http://localhost:8080/lenda');
      setLendet(fetchLendet.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    getLigjerata();
    getLendet();
  }, [])

  const handleClick = () => {
    setConfirmExit();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/professorLenda/update/${ligjerataID}`, newFormLigjerata);
      setConfirmExit();
      onLigjerataEdit();
      
    }catch(error) {
      console.log(error);
    }
  }

  const handleID = (data) => {

    setNewFormLigjerata({
      ...newFormLigjerata,
      professor: {
        ...newFormLigjerata.professor,
        id : data.target.value,
      }
    });
    

    
  }

  const handleChangedLendet = (e) => {
    setSelectedLenda(e.target.value);
    setNewFormLigjerata({
      ...newFormLigjerata,
      lenda : lendet.find(lenda => lenda.id == e.target.value)
    })
  }

  return(
    <>
    <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edito Ligjeraten
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
                htmlFor="price"
                className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID
              </label>
              <input
                type="number"
                name="id"
                id="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ID e Profesorit"
                required=""
                value={newFormLigjerata.professor.id}
                onInput={handleID}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lënda
              </label>
              <select
                id="lenda"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedLenda}
                onChange={handleChangedLendet}
              >
                <option value="">{newFormLigjerata.lenda.emri}</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
                ))}



              </select>
            </div>
            {/* <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="name"
                className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emri
              </label>
              <input
                type="text"
                name="emri"
                id="emri"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Emri i Profesorit"
                required=""
                readOnly
                value={newFormLigjerata.professor.user.firstName}
              />
            </div> */}
            
            {/* <div className="col-span-1 sm:col-span-1">
              <label htmlFor="name" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mbiemri
              </label>
              <input
                type="text"
                name="mbiemri"
                id="mbiemri"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Mbiemri i Profesorit"
                required=""
                value={newFormLigjerata.professor.user.lastName}
                readOnly
              />
            </div> */}
        
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </form>
      </div>
 
    </>
  )
}