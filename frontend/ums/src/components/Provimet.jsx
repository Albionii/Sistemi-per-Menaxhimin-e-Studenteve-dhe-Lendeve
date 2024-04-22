import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Dropdown, Button } from 'flowbite-react';

const Provimet = () => {

    const [provimet, setProvimet] = useState([]);

    useEffect(() => {
        fetchProvimet();
    }, []);

    const fetchProvimet = () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM4MDU1MzQsImV4cCI6MTcxMzgxNDE3NCwiZW1haWwiOiJzdHVkZW50MUBleGFtcGxlLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.q5MBF0mEg-5JPF6WK9NKefUQA-v6t3M3KPApPmlxf_A';
        // axios.get('http://localhost:8080/student/provimet/', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        //   })
        //   .then(response => {
    
        //     setProvimet(response.data); 
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
    
    }

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

                <Dropdown label="Dropdown">
                    {provimi.provimet.map((item, idx) => (
                        <Dropdown.Item onClick={() => alert('Dashboard!')}>{item.ligjerata.professor.user.firstName}</Dropdown.Item>
                    ))}

                </Dropdown>

                </Table.Cell>           
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>
                    Hello
                </Table.Cell>
                <Table.Cell>
                    <Button>Paraqit Provimin</Button>
                </Table.Cell>
            
              </Table.Row>
            ))}
        
        </Table.Body>
      </Table>
    </div>

    
  )
}

export default Provimet