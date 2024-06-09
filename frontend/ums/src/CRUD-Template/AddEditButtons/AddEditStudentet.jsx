import { useState } from 'react';
import axios from 'axios';

import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

export const studentetEditButton = ({setConfirmExit, item, onLigjerataEdit, API, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  
  const [formData, setFormData] = useState(item);

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [email, setEmail] = useState("");
  const [dataLindjes, setData] = useState("");
  const [shteti, setShteti] = useState("");
  const [qyteti, setQyteti] = useState(""); 
  const [rruga, setRruga] = useState("");
  const [zip, setZip] = useState("");
  const [gjinia, setGjinia] = useState(null);


  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        firstName : e.target.value
      }}
    )
  }

  const handleMbiemri = (e) => {
    setMbiemri(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        lastName : e.target.value
      }}
    )
  }

  const handleDate = (e) => {
    setData(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        dateLindja : e.target.value
      }}
    )
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        email : e.target.value
      }}
    )
  }

  const handleShteti = (e) => {
    setShteti(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        shteti : e.target.value
      }}
    )
  }
  
  const handleQyteti = (e) => {
    setQyteti(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        qyteti : e.target.value
      }}
    )
  }
  const handleRruga = (e) => {
    setRruga(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        rruga : e.target.value
      }}
    )
  }


  const handleZip = (e) => {
    setZip(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        zipcode : e.target.value
      }}
    )
  }
  const handleGjinia = (e) => {
    setGjinia(e.target.value);
    setFormData({
      ...formData,
      user:{
        ...formData.user,
        gjinia : e.target.value == true ? "male" : "female"
      }}
    )
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
      <div className="relative w-full rounded-lg shadow"  style={{background: colors.primary[500]}}>
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-400">
          <h3 className="text-lg font-semibold">
            Edito Studentin
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
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={emri == "" && formData != null ? formData.user.firstName:emri}
                  onInput={handleEmri}
                  placeholder='Emri Profesorit'  
                  />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Mbiemri
              </label>
              <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={mbiemri == "" && formData != null ? formData.user.lastName:mbiemri}
                  onInput={handleMbiemri}
                  placeholder='Mbiemri Profesorit'  
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
                  value={email == "" && formData != null ? formData.user.email:email}
                  onInput={handleEmail}
                  placeholder='Emaili Profesorit'  
              />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Datelindja
              </label>
              <input 
                  type="date" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={dataLindjes == "" && formData != null ? formData.user.dateLindja:dataLindjes}
                  onInput={handleDate}
                  placeholder='Datelindja'  
              />
            </div>
            

            <div className="col-span-2 sm:col-span-2">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gjinia
              </label>
              <div>
                <div className="flex items-center ps-4 border border-gray-200 rounded px-6" style={{background: colors.primary[400]}}>
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
                    defaultChecked={gjinia == null  && formData != null? formData.user.gjinia : gjinia}
                    value={true}
                    onInput={handleGjinia}

                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium "
                  >
                    Mashkull
                  </label>
                </div>
                <div className="flex items-center ps-4 border border-gray-400 rounded px-6 " style={{background: colors.primary[400]}}>
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4  border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                    // defaultChecked={gjinia == null  && formData != null? !formData.user.gjinia : !gjinia}
                    value={false}
                    onInput={handleGjinia}
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium"
                  >
                    Femer
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Shteti
              </label>
              <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={shteti == "" && formData != null ? formData.user.shteti:shteti}
                  onInput={handleShteti}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Qyteti
              </label>
              <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={qyteti == "" && formData != null ? formData.user.qyteti:qyteti}
                  onInput={handleQyteti}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
              >
                Rruga
              </label>
              <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={rruga == "" && formData != null ? formData.user.rruga:rruga}
                  onInput={handleRruga}
                  placeholder='Rruga'  
              />
            </div>

            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium "
              >
                ZIP
              </label>
              <input 
                  type="text" 
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                  value={zip == "" && formData != null ? formData.user.zipcode:zip}
                  onInput={handleZip}
                  placeholder='ZIP'  
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
            Edito Studentin
          </button>
        </form>
      </div>
    </>
  )
}
