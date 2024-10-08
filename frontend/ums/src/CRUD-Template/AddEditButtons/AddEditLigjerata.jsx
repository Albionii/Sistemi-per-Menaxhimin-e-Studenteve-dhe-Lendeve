import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllLendet, getAllProfessors, getAllSemester} from '../../APIRequests';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
export const ligjerataAddButton = ({setConfirmExit, renderBot, formDataJson, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [urlCreate, errorCreate] = API.create();
  const [urlLendet, messageLendet] = getAllLendet();
  const [urlProfessor, messageProfessor] = getAllProfessors();
  const [urlSemester, errorSemester] = getAllSemester();

  const handleClick = () => {
    setConfirmExit();
  }

  const [lendet, setLendet] = useState([]);
  const [selectedLenda, setSelectedLenda] = useState('');

  const [profesoret, setProfesoret] = useState([]);
  const [selectedProfesori, setSelectedProfesori] = useState('');
  const [semestrat, setSemestrat] = useState([]);
  const [selectedSemestri, setSelectedSemestri] = useState('');

  const [formData, setFormData] = useState(formDataJson);
  
  useEffect(() => {
    getLendet();
    getProfesoret();
    getSemestrat();
  }, []);

  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get(urlLendet,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setLendet(fetchLendet.data);
    } catch (error) {
      API.errorAlert(messageLendet);
      console.log(error);
    }
  };

  const getProfesoret = async () => {
    try {
      const fetchProfesoret = await axios.get(urlProfessor,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setProfesoret(fetchProfesoret.data);
    } catch (error) {
      API.errorAlert(messageProfessor);
      console.log(error);
    }
  };

  const getSemestrat = async () => {
    try {
      const fetchSemestrat = await axios.get(urlSemester,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setSemestrat(fetchSemestrat.data);
    } catch (error) {
      API.errorAlert(errorSemester);
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

  const handleChangedSemestrat = (e) => {
    setSelectedSemestri(e.target.value);
    setFormData({
      ...formData,
      semester : semestrat.find(s => s.id == e.target.value)
    })
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
      <div className="relative w-full rounded-lg shadow" style={{background: colors.primary[400]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-lg font-semibold">
            Krijo Ligjeraten
          </h3>
          <button
            type="button"
            className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Emri dhe Mbiemri i Profesorit
                </label>
                <select
                  // id="pr"
                  className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={selectedProfesori}
                  onChange={handleChangedProfesoret}
                  required
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
                  className="block text-left mb-2 text-sm font-medium "
              >
                Lënda
              </label>
              <select
                id="lenda"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={selectedLenda}
                onChange={handleChangedLendet}
                required
              >
                <option value="">Selekto Lëndën</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Semestri
                </label>
                <select
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={selectedSemestri}
                  onChange={handleChangedSemestrat}
                >
                  <option value="">Selekto Semestrin</option>
                  {semestrat.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
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
export const ligjerataEditButton = ({setConfirmExit, item, onLigjerataEdit, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  const [urlLendet, messageLendet] = getAllLendet();
  const [urlProfessor, messageProfessor] = getAllProfessors();
  const [urlSemester, messageSemester] = getAllSemester();

  //Per inputat select lendet
  const [lendet, setLendet] = useState([]);
  const [selectedLenda, setSelectedLenda] = useState(item.lenda.emri);

  //Per inputat select profesoret
  const [profesoret, setProfesoret] = useState([]);
  const [selectedProfesori, setSelectedProfesori] = useState(item.professor.user.firstName + item.professor.user.lastName);

  const [semestrat, setSemestrat] = useState([]);
  const [selectedSemestri, setSelectedSemestri] = useState('');


  const [formData, setFormData] = useState(item);

  const handleClick = () => {
    setConfirmExit();
  }

  useEffect(() => {
    getLendet();
    getProfesoret();
    getSemestrat();
  }, []);

  
  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get(urlLendet,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setLendet(fetchLendet.data);
    } catch (error) {
      API.errorAlert(messageLendet);
      console.log(error);
    }
  };

  const getProfesoret = async () => {
    try {
      const fetchProfesoret = await axios.get(urlProfessor,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setProfesoret(fetchProfesoret.data);
    } catch (error) {
      API.errorAlert(messageProfessor);
      console.log(error);
    }
  };


  const getSemestrat = async () => {
    try {
      const fetchSemestrat = await axios.get(urlSemester,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setSemestrat(fetchSemestrat.data);
    } catch (error) {
      API.errorAlert(errorSemester);
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

  
  const handleChangedSemestrat = (e) => {
    setSelectedSemestri(e.target.value);
    setFormData({
      ...formData,
      semester : semestrat.find(s => s.id == e.target.value)
    })
  }

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
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-500">
          <h3 className="text-lg font-semibold">
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
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Emri dhe Mbiemri i Profesorit
                </label>
                <select
                  // id="pr"
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
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
                  className="block text-left mb-2 text-sm font-medium"
              >
                Lënda
              </label>
              <select
                id="lenda"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={selectedLenda}
                onChange={handleChangedLendet}
              >
                <option value="">{formData != null ? formData.lenda.emri : ""}</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Semestri
                </label>
                <select
                  // id="pr"
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={selectedSemestri}
                  onChange={handleChangedSemestrat}
                >
                  <option value="">{formData != null ? formData.semester.name:""}</option>
                  {semestrat.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
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
