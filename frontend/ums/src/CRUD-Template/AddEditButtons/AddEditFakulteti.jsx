import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllLendet, getAllProfessors } from '../../APIRequests';
export const fakultetiAddButton = ({setConfirmExit, renderBot, formDataJson, API}) => {
  const [urlCreate, errorCreate] = API.create();
  
  const [emri, setEmri] = useState('')
  const [lokacioni, setLokacioni] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null);


  const [formData, setFormData] = useState(formDataJson);



  const handleClick = () => {
    setConfirmExit();
  }

  
  useEffect(() => {
  }, []);

  
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
            Krijo Ligjeraten
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
                  Emri dhe Mbiemri i Profesorit
                </label>
                <select
                  // id="pr"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedProfesori}
                  onChange={handleChangedProfesoret}
                >
                  <option value="">Selekto Profesorin</option>
                  {profesoret.map(profesori => (
                    <option key={profesori.id} value={profesori.id}>{profesori.user.firstName + " " + profesori.user.lastName}</option>
                  ))}
                </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
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
                <option value="">Selekto Lëndën</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
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
            Add Ligjerata
          </button>
        </form>
      </div>
    </>
  )
}
export const ligjerataEditButton = ({setConfirmExit, ligjerataID, formDataJson, onLigjerataEdit, API}) => {
  const [urlLigjerata, errorLigjerata] = API.getByID();
  const [urlUpdate, errorUpdate] = API.update();
  const [urlLendet, messageLendet] = getAllLendet();
  const [urlProfessor, messageProfessor] = getAllProfessors();

  //Per inputat select lendet
  const [lendet, setLendet] = useState([]);
  const [selectedLenda, setSelectedLenda] = useState('');

  //Per inputat select profesoret
  const [profesoret, setProfesoret] = useState([]);
  const [selectedProfesori, setSelectedProfesori] = useState('');

  const [formData, setFormData] = useState(formDataJson);

  const handleClick = () => {
    setConfirmExit();
  }

  useEffect(() => {
    getLigjerata();
    getLendet();
    getProfesoret();
  }, []);


  const getLigjerata = async () => {
    try{
      const fetchLigjerata = await axios.get(urlLigjerata + `${ligjerataID}`);
      setFormData(fetchLigjerata.data)
    }catch(error) {
      console.log(error)
    }
  }
  
  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get(urlLendet);
      setLendet(fetchLendet.data);
    } catch (error) {
      API.errorAlert(messageLendet);
      console.log(error);
    }
  };

  const getProfesoret = async () => {
    try {
      const fetchProfesoret = await axios.get(urlProfessor);
      setProfesoret(fetchProfesoret.data);
    } catch (error) {
      API.errorAlert(messageProfessor);
      console.log(error);
    }
  };



  const handleChangedLendet = (e) => {
    setSelectedLenda(e.target.value);
    setFormData({
      ...formData,
      lenda : lendet.find(lenda => lenda.id == e.target.value)
    })
  };

  const handleChangedProfesoret = (e) => {
    setSelectedProfesori(e.target.value);
    setFormData({
      ...formData,
      professor : profesoret.find(profesori => profesori.id == e.target.value)
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(urlUpdate + `${ligjerataID}`, formData);
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
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Emri dhe Mbiemri i Profesorit
                </label>
                <select
                  // id="pr"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedProfesori}
                  onChange={handleChangedProfesoret}
                >
                  <option value="">{formData != null ? formData.professor.user.firstName + " " + formData.professor.user.lastName:""}</option>
                  {profesoret.map(profesori => (
                    <option key={profesori.id} value={profesori.id}>{profesori.user.firstName + " " + profesori.user.lastName}</option>
                  ))}
                </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
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
                <option value="">{formData != null ? formData.lenda.emri : ""}</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
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
            Edit Ligjerata
          </button>
        </form>
      </div>
    </>
  )
}
