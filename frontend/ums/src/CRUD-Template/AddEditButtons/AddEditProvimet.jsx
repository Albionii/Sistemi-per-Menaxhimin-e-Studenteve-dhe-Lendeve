import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllLendet, getAllLigjeratat} from '../../APIRequests';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

export const provimiAddButton = ({setConfirmExit, renderBot, formDataJson, API}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlCreate, errorCreate] = API.create();
  const [urlLendet, errorLendet] = getAllLendet();
  const [urlLigjeratat, errorLigjeratat] = getAllLigjeratat();

  const [dataMbajtjes, setDataMbajtjes] = useState("");
  const [lokacioni, setLokacioni] = useState("");
  const [profesori, setProfesori] = useState('');

  const [ligjeratat, setLigjeratat] = useState([]);
  const [lendet, setLendet] = useState([]);
  const [selectedLenda, setSelectedLenda] = useState('');

  const [formData, setFormData] = useState(formDataJson);
  
  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleChangedLendet = (e) => {
    setSelectedLenda(e.target.value);
  }

  const handleChangedProfesori = (e) => {
    setProfesori(e.target.value);
    setFormData({
      ...formData,
      ligjerata : ligjeratat.find(l => l.id == e.target.value)
    })
  }

  const handleDataMbajtjes = (e) => {
    setDataMbajtjes(e.target.value+"");
    setFormData({
      ...formData,
      data : (e.target.value+"")
    })
  }

  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      location : e.target.value
    })
  }

  const getLigjeratat = async () => {
    try {
      const fetchLigjeratat = await axios.get(urlLigjeratat);
      setLigjeratat(fetchLigjeratat.data);
    } catch (error) {
      API.errorAlert(errorLigjeratat);
      console.log(error);
    }
  };

  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get(urlLendet);
      setLendet(fetchLendet.data);
    } catch (error) {
      API.errorAlert(errorLendet);
      console.log(error);
    }
  };


  useEffect(()=>{
    getLendet();
    getLigjeratat();
  },[])
  
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
      <div className="relative w-full rounded-lg shadow" style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-500">
          <h3 className="text-lg font-semibold"  >
            Krijo Provimin
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
            <div className="col-span-1 sm:col-span-1">
                <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Lenda
                </label>
                <select
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={selectedLenda}
                  onInput={handleChangedLendet}
                  required
                >
                  {selectedLenda === '' && <option value="">Selekto Ligjeraten</option>}
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
                  Emri Profesorit
                </label>
                <select
                  className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 border-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={profesori}
                  onChange={handleChangedProfesori}
                  required
                >
                  {profesori === '' && <option value="">Selekto Profesorin</option>}
                  {selectedLenda !== '' ? ligjeratat.map(ligjerata => {
                    if (ligjerata.lenda.id == selectedLenda) {
                      return (
                        <option key={ligjerata.id} value={ligjerata.id}>
                          {ligjerata.professor.user.firstName + " " + ligjerata.professor.user.lastName}
                        </option>
                      );
                    }
                    return null; // Explicitly return null if the condition is not met
                  }) : ''}

                </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
                <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Data
                </label>
                <input 
                  type="date" 
                  className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 border-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={dataMbajtjes}
                  onInput={handleDataMbajtjes}
                  required
                  />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
                >
                  Lokacioni
                </label>
                <input 
                  type="text" 
                  className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 border-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={lokacioni}
                  onInput={handleLokacioni}
                  placeholder='Lokacioni i Provimit'  
                  required
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
            Add Provimi
          </button>
        </form>
      </div>
    </>
  )
}
export const provimiEditButton = ({setConfirmExit, item, onLigjerataEdit, API}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [urlUpdate, errorUpdate] = API.update();
  
  const [urlLigjeratat, errorLigjeratat] = getAllLigjeratat();
  const [urlLendet, errorLendet] = getAllLendet();

  const [dataMbajtjes, setDataMbajtjes] = useState("");
  const [lokacioni, setLokacioni] = useState("");
  const [profesori, setProfesori] = useState("");
  const [selectedLenda, setSelectedLenda] = useState("");

  const [ligjeratat, setLigjeratat] = useState([]);
  const [lendet, setLendet] = useState([]);

  const [formData, setFormData] = useState(item);
  
  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleChangedLendet = (e) => {
    setSelectedLenda(e.target.value);
  }

  const handleChangedProfesori = (e) => {
    setProfesori(e.target.value);
    setFormData({
      ...formData,
      ligjerata : ligjeratat.find(l => l.id == e.target.value)
    })
  }

  const handleDataMbajtjes = (e) => {
    setDataMbajtjes(e.target.value+"");
    setFormData({
      ...formData,
      data : (e.target.value+"")
    })
  }

  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      location : e.target.value
    })
  }

  const getLigjeratat = async () => {
    try {
      const fetchLigjeratat = await axios.get(urlLigjeratat);
      setLigjeratat(fetchLigjeratat.data);
    } catch (error) {
      API.errorAlert(errorLigjeratat);
      console.log(error);
    }
  };

  const getLendet = async () => {
    try {
      const fetchLendet = await axios.get(urlLendet);
      setLendet(fetchLendet.data);
    } catch (error) {
      API.errorAlert(errorLendet);
      console.log(error);
    }
  };
 

  useEffect(() => {
    getLigjeratat();
    getLendet();
  }, []);
  
  
  
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
    <div className="relative w-full rounded-lg shadow" style={{background: colors.primary[500]}}>
      <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold">
          Edito Provimin
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
                Lenda
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500"style={{background: colors.primary[400]}} 
                value={selectedLenda}
                onInput={handleChangedLendet}
              >
              
                <option value="">{selectedLenda == ""? item.ligjerata.lenda.emri:selectedLenda}</option>
                {lendet.map(lenda => (
                  <option key={lenda.id} value={lenda.id}>{lenda.emri}</option>
                ))}
              </select>
          </div>
          
          <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium "
              >
                Emri Profesorit
              </label>
              <select
                className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={profesori}
                onChange={handleChangedProfesori}
              >
                <option value="">{profesori == "" && formData != null ? formData.ligjerata.professor.user.firstName +" " + formData.ligjerata.professor.user.lastName : profesori}</option>
                {selectedLenda !== '' ? ligjeratat.map(ligjerata => {
                  if (ligjerata.lenda.id == selectedLenda) {
                    return (
                      <option key={ligjerata.id} value={ligjerata.id}>
                        {ligjerata.professor.user.firstName + " " + ligjerata.professor.user.lastName}
                      </option>
                    );
                  }
                  return null;
                }) : ''}

              </select>
          </div>
          <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Data
              </label>
              <input 
                type="date" 
                className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                value={dataMbajtjes}
                onInput={handleDataMbajtjes}
                />
          </div>
          
          <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium "
              >
                Lokacioni
              </label>
              <input 
                type="text" 
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}} 
                value={lokacioni == "" && formData != null? formData.location : lokacioni}
                onInput={handleLokacioni}
                placeholder='Lokacioni i Provimit'  
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
          Edit Provimi
        </button>
      </form>
    </div>
  </>  
  )
}
