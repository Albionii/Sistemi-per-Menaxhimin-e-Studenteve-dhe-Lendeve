import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotaTable = () => {
    const [items, setItems] = useState([]);

    
      useEffect(() => {
        fetchItems();
      }, []);

    const fetchItems = () => {
      axios.get("http://localhost:8080/notat")
          .then(response => {
              setItems(response.data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  };

    function updateGrade(grade) {
      axios.patch(`http://localhost:8080/notat/refuzo/${grade}`)
          .then(() => {
            fetchItems();
          })
          .catch(error => {
              console.error('Error updating grade:', error);
          });
  };

    return (        
        <tbody>
            {items.map(item => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                      {item.provim.profesoriLenda.lenda.id}
                  </td>
                  <td className="px-6 py-4">
                      {item.provim.profesoriLenda.lenda.emri}
                  </td>
                  <td className="px-6 py-4">
                      {item.provim.profesoriLenda.professor.user.firstName}
                  </td>
                  <td className="px-6 py-4">
                      {item.provim.nota}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => updateGrade(item.provim.p_ID)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Refuzo
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => updateGrade(item.provim.p_ID)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Refuzo
                    </button>
                  </td>
                </tr>
            
            ))}
        </tbody>
    );
};

export default NotaTable;
