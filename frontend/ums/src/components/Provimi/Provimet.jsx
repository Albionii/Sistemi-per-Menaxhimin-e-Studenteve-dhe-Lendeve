import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Dropdown, Button } from 'flowbite-react';

const Provimet = () => {

    const [provimet, setProvimet] = useState([]);
    const [selectedProvimiId, setSelectedProvimiId] = useState(null);

    // useEffect(() => {
    //     fetchProvimet();
    // }, []);

    // const fetchProvimet = () => {
    //     const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM4MTUzNjQsImV4cCI6MTcxMzgyNDAwNCwiZW1haWwiOiJzdHVkZW50MUBleGFtcGxlLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.xvlsttBQfj4L94c0h17lUHBpDH44WHAcC_uiHJFp7JM';

    //     axios.get('http://localhost:8080/student/provimet/', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //       })
    //       .then(response => {
    
    //         setProvimet(response.data); 
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //       });
    
    // }

    // const handleDropdownItemClick = (provimiId) => {
    //     setSelectedProvimiId(provimiId);
    // }

    // const paraqitProvimin = (id) => {

    //     if (selectedProvimiId !== null) {
    //         const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM4MTUzNjQsImV4cCI6MTcxMzgyNDAwNCwiZW1haWwiOiJzdHVkZW50MUBleGFtcGxlLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.xvlsttBQfj4L94c0h17lUHBpDH44WHAcC_uiHJFp7JM';

    //         axios.post(`http://localhost:8080/student/paraqit/${selectedProvimiId}`, null, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         .then(response => {
    //             window.location.reload();
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    //     } else {
    //         console.error('No provimi selected');
    //     }
    // }

  return (
<div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Lenda</Table.HeadCell>
          <Table.HeadCell>Profesori</Table.HeadCell>
          <Table.HeadCell>Data</Table.HeadCell>
          <Table.HeadCell>ECTS</Table.HeadCell>
          <Table.HeadCell>
            Operation
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {provimet.map((provimi, index) =>(
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {provimi.emriLendes}
                </Table.Cell>

                <Table.Cell>

                <Dropdown label="Zgjidh Profesorin">
                    {provimi.provimet.map((item, idx) => (
                        <Dropdown.Item key={idx} onClick={() => handleDropdownItemClick(item.id)}>{item.ligjerata.professor.user.firstName} {item.ligjerata.professor.user.lastName}</Dropdown.Item>
                    ))}

                </Dropdown>

                </Table.Cell>           
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>
                    Hello
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={paraqitProvimin}>Paraqit Provimin</Button>
                </Table.Cell>
            
              </Table.Row>
            ))}
        
        </Table.Body>
      </Table>
    </div>

    
  )
}

export default Provimet