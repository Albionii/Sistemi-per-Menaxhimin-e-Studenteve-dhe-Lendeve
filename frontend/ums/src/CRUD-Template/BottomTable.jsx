import { useState } from 'react';
import { useEffect } from 'react';
import EditButton from "./EditButton";
import axios from 'axios';
import DeleteButton from './DeleteButton';

export default function BottomTable({theKey}){
 const [professorLendet, setProfessorLendet] = useState([]);

   useEffect(() => {  
    getProfesorLendat();
  }, [theKey]);

  const onLigjerataEdit = () => {
    getProfesorLendat();
  }


  const getProfesorLendat = async () => {
    try{
      const fetchAllProfesorLenda = await axios.get('http://localhost:8080/professorLenda');
      setProfessorLendet(fetchAllProfesorLenda.data);
      console.log("data : " + fetchAllProfesorLenda.data)

    }catch(error){
      console.log(error);
    }
  }
  


  const deleteProfessorLigjerata = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/professorLenda/delete/${id}`);
      getProfesorLendat();
      
    }catch(error){
      console.log(error);
    }
  }

  
  return (
    <>   
      <div className="overflow-x-autowid">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>    
              <th scope="col" className="p-4">
                Profesori ID
              </th>
              <th scope="col" className="p-4">
                Emri
              </th>
              <th scope="col" className="p-4">
                Mbiemri
              </th>
              <th scope="col" className="p-4">
                Gjinia
              </th>
              <th scope="col" className="p-4">
                Lenda
              </th>
              <th scope="col" className="p-4">
                ECTS
              </th>
              <th scope="col" className="p-4">
                Last Update
              </th>
            </tr>
          </thead>
          <tbody>
            {professorLendet.map(p => (
                <tr key = {p.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.firstName}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.lastName}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.professor.user.gjinia}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.lenda.emri}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {p.lenda.ects}
                      </div>
                    </td>
                  
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center space-x-4">

                    <EditButton ligjerataID = {p.id} onLigjerataEdit={onLigjerataEdit}/>

                    <button
                      type="button"
                      data-drawer-target="drawer-read-product-advanced"
                      data-drawer-show="drawer-read-product-advanced"
                      aria-controls="drawer-read-product-advanced"
                      className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 mr-2 -ml-0.5"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        />
                      </svg>
                      Preview
                    </button>
                    <DeleteButton id={p.id} onDelete={deleteProfessorLigjerata}/>
                  </div>
                </td>
              </tr>  
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}