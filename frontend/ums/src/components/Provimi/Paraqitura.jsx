import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Dropdown, Button } from 'flowbite-react';

const Paraqitura = () => {
    
    const [provimet, setProvimet] = useState([]);
    const [selectedProvimiId, setSelectedProvimiId] = useState(null);

    const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTU4ODEzMTcsImV4cCI6MTcxNTg4OTk1NywiZW1haWwiOiJzdHVkZW50QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.atscXOQTqNJBRjBG-sLWrdp5BLuiKYGG7Hui_FyHMhA";


    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

    useEffect(() => {
        fetchProvimet();
    }, []);

    const handleSelectedChange = (parqaitjaId) => {
        setSelectedProvimiId(parqaitjaId);
    }

    const fetchProvimet = () => {

        axios.get('http://localhost:8080/student', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
    
            setProvimet(response.data); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
    
    }

    const anuloParaqitjen = (id) => {
        axios.delete(`http://localhost:8080/student/anulo/${id}`, config)
            .then(response => {
               fetchProvimet();
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Lenda</Table.HeadCell>
          <Table.HeadCell>Profesori</Table.HeadCell>
          <Table.HeadCell>Data Paraqitjes</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          <Table.HeadCell>
            Operation
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {provimet.map((item, index) =>(
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.emriLendes}
                </Table.Cell>

                <Table.Cell>
                    {item.provimi.ligjerata.professor.user.firstName} {item.provimi.ligjerata.professor.user.lastName}
                </Table.Cell>           
                <Table.Cell>                   
                    {item.dataVendosjes=== null ? "null" : item.dataVendosjes}
                </Table.Cell>
                <Table.Cell>
                    {item.nota === 0 ? " " : item.nota}
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => anuloParaqitjen(item.id)}>Anulo Paraqitjen</Button>
                </Table.Cell>
            
              </Table.Row>
            ))}
        
        </Table.Body>
      </Table>
    </div>
  )
}

export default Paraqitura