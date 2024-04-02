import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotaTable = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user")
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (        
        <tbody>
            {items.map(item => (
                <tr key = "{item.id}" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                      {item.id}
                  </td>
                  <td className="px-6 py-4">
                      {item.firstName}
                  </td>
                  <td className="px-6 py-4">
                      {item.lastName}
                  </td>
                  <td className="px-6 py-4">
                      {item.email}
                  </td>
                  <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Refuzo</a>
                  </td>
                </tr>
            
            ))}
        </tbody>
    );
};

export default NotaTable;
