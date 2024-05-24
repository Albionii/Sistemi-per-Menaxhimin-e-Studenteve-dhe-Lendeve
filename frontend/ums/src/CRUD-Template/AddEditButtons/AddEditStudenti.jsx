import { useState } from 'react';
import axios from 'axios';

export const professorEditButton = ({setConfirmExit, item, onLigjerataEdit, API}) => {
  const [urlUpdate, errorUpdate] = API.update();
  
  const [formData, setFormData] = useState(item);

  const [emri, setEmri] = useState(item.user.firstName);
  const [mbiemri, setMbiemri] = useState(item.user.lastName);
  const [email, setEmail] = useState(item.user.email);
  const [data, setData] = useState(item.user.dateLindja);
  const [shteti, setShteti] = useState(item.user.shteti);
  const [qyteti, setQyteti] = useState(item.user.qyteti); 
  const [rruga, setRruga] = useState(item.user.rruga);
  const [zip, setZip] = useState(item.user.zip);
  const [roli, setRoli] = useState(item.user.role);
  const [obligative, setObligative] = useState(false);


  const handleClick = () => {
    setConfirmExit();
  }

  const handleEmri = (e) => {
    setEmri(e.target.value);
    setFormData({
      ...formData,
      user:{
        firstName : e.target.value
      }}
    )
  }

  const handleMbiemri = (e) => {
    setMbiemri(e.target.value);
    setFormData({
      ...formData,
      user:{
        lastName : e.target.value
      }}
    )
  }

  const handleDate = (e) => {
    setData(e.target.value);
    setFormData({
      ...formData,
      user:{
        dateLindja : e.target.value
      }}
    )
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFormData({
      ...formData,
      user:{
        email : e.target.value
      }}
    )
  }

  const handleRoli = (e) => {
    setRoli(e.target.value);
    setFormData({
      ...formData,
      user:{
        role : e.target.value
      }}
    )
  }

  const handleShteti = (e) => {
    setShteti(e.target.value);
    setFormData({
      ...formData,
      user:{
        shteti : e.target.value
      }}
    )
  }
  
  const handleQyteti = (e) => {
    setQyteti(e.target.value);
    setFormData({
      ...formData,
      user:{
        qyteti : e.target.value
      }}
    )
  }
  const handleRruga = (e) => {
    setRruga(e.target.value);
    setFormData({
      ...formData,
      user:{
        rruga : e.target.value
      }}
    )
  }


  const handleZip = (e) => {
    setZip(e.target.value);
    setFormData({
      ...formData,
      user:{
        zip : e.target.value
      }}
    )
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
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Emri
                </label>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={emri}
                  onInput={handleEmri}
                  placeholder='Emri Profesorit'  
                  />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mbiemri
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={mbiemri}
                  onInput={handleMbiemri}
                  placeholder='Mbiemri Profesorit'  
                  />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={email}
                  onInput={handleEmail}
                  placeholder='Emaili Profesorit'  
              />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Datelindja
              </label>
              <input 
                  type="date" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data}
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
                <div className="flex items-center ps-4 border border-gray-200 rounded px-6">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked={obligative == null  && formData != null? formData.obligative : obligative}
                    value={true}
                    // onInput={handleObligative}

                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Mashkull
                  </label>
                </div>
                <div className="flex items-center ps-4 border border-gray-200 rounded px-6">
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked={obligative == null  && formData != null ? !formData.obligative : !obligative}
                    value={false}
                    // onInput={handleObligative}
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Femer
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-3">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shteti
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={shteti}
                  onInput={handleShteti}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            <div className="col-span-3 sm:col-span-3">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Qyteti
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={qyteti}
                  onInput={handleQyteti}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            <div className="col-span-3 sm:col-span-3">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rruga
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={rruga}
                  onInput={handleRruga}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ZIP
              </label>
              <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={zip}
                  onInput={handleZip}
                  placeholder='Emaili Profesorit'  
              />
            </div>

            
            <div className="col-span-1 sm:col-span-1">
              <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Roli
              </label>
              <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={roli}
                  onChange={handleRoli}
              >
                {roli == 0 && <option value="">Selekto Rolin</option>}
                <option value={1}>Student</option>
                <option value={2}>Profesor</option>
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
            Edito Studentin
          </button>
        </form>
      </div>
    </>
  )
}
