import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { getAllFakulteti } from '../../APIRequests';
export const departamentiAddButton = ({setConfirmExit, renderBot, formDataJson, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlCreate, errorCreate] = API.create();
  const [urlGetFakultetet, fakultetetError] = getAllFakulteti();
  const [formData, setFormData] = useState(formDataJson);

  const [emri, setEmri] = useState('');
  const [email, setEmail] = useState('');
  const [lokacioni, setLokacioni] = useState('');
  const [fakulteti, setFakulteti] = useState(null);
  const [fakultetet, setFakultetet] = useState([]);

  useEffect(()=>{
    getFakultetet();
  },[])

  const getFakultetet = async () => {
    try{
      const response = await axios.get(urlGetFakultetet,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      setFakultetet(response.data);
    }catch(error){
      API.errorAlert(fakultetetError);
      console.log(error)
    }
  }

  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      emri : e.target.value
    });
  }

  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      lokacioni : e.target.value
    });
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFormData({
      ...formData,
      email : e.target.value
    });
  }

  const handleFakulteti = (e) => {
    setFakulteti(e.target.value);
    setFormData({
      ...formData,
      fakulteti : fakultetet.find(f => f.id == e.target.value)
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
            Krijo Departamentin
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
                  value={emri}
                  onInput={handleEmri}
                  placeholder='Emri Departamentit'  
                  required
                />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Email
              </label>
              <input 
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                placeholder='Emaili'
                value={email}
                onInput={handleEmail}
                required
               />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Lokacioni
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={lokacioni}
                  onInput={handleLokacioni}
                  placeholder='Lokacioni'  
                  required
                  />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Fakulteti
                </label>
                <select
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={fakulteti}
                  onChange={handleFakulteti}
                  required
                >
                  {fakulteti == null && <option value="">Selektoni fakultetin</option>}
                  {fakultetet.map(fakulteti => (
                    <option key={fakulteti.id} value={fakulteti.id}>{fakulteti.emri}</option>
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
            Krijo Departamentin
          </button>
        </form>
      </div>
    </>
  )
}
export const departamentiEditButton = ({setConfirmExit, item, onLigjerataEdit, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  const [urlGetFakultetet, fakultetetError] = getAllFakulteti();
  const [formData, setFormData] = useState(item);

  const [emri, setEmri] = useState('');
  const [email, setEmail] = useState('');
  const [lokacioni, setLokacioni] = useState('');
  const [fakulteti, setFakulteti] = useState(null);
  const [fakultetet, setFakultetet] = useState([]);

  useEffect(()=>{
    getFakultetet();
  },[])

  const getFakultetet = async () => {
    try{
      const response = await axios.get(urlGetFakultetet,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      setFakultetet(response.data);
    }catch(error){
      API.errorAlert(fakultetetError);
      console.log(error)
    }
  }

  
  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      emri : e.target.value
    });
  }

  const handleLokacioni = (e) => {
    setLokacioni(e.target.value);
    setFormData({
      ...formData,
      lokacioni : e.target.value
    });
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFormData({
      ...formData,
      email : e.target.value
    });
  }

  const handleFakulteti = (e) => {
    setFakulteti(e.target.value);
    setFormData({
      ...formData,
      fakulteti : fakultetet.find(f => f.id == e.target.value)
    });
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
      <div className="relativew-full rounded-lg shadow" style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">
            Edito Departamentin
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
                  value={emri =="" && formData != null ? formData.emri:emri}
                  onInput={handleEmri}
                  placeholder='Emri Departamentit'  
                />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Email
              </label>
              <input 
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                placeholder='Emaili'
                value={email =="" && formData != null ? formData.email:email}
                onInput={handleEmail}
               />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Lokacioni
                </label>
                <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={lokacioni =="" && formData != null ? formData.lokacioni:lokacioni}
                  onInput={handleLokacioni}
                  placeholder='Lokacioni'  
                  />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                    htmlFor="category"
                    className="block text-left mb-2 text-sm font-medium"
                >
                  Fakulteti
                </label>
                <select
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={fakulteti}
                  onChange={handleFakulteti}
                >
                  <option value="">{fakulteti ==null && formData != null ? formData.fakulteti.emri:fakulteti}</option>
                  {fakultetet.map(fakulteti => (
                    <option key={fakulteti.id} value={fakulteti.id}>{fakulteti.emri}</option>
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
            Edit Departamenti
          </button>
        </form>
      </div>
    </>
  )
}
