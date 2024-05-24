import React from 'react'

function AddStudent() {
  return (
    <>
      <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Krijo Studentin
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
                value={id}
                onInput={handleId}
              />
            </div>
            <div className="col-span-1 sm:col-span-1">
            </div>
            <div className="col-span-2 sm:col-span-1">
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
                value={formData.professor.user.firstName} 
                // onInput={handleChange}
                readOnly
              />
            </div>
            
            <div className="col-span-1 sm:col-span-1">
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
                value={formData.professor.user.lastName} 
                // onChange={handleChange}
                readOnly
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
            Add Ligjerata
          </button>
        </form>
      </div>
    </>
  )
}

export default AddStudent