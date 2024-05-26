import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'flowbite-react';

import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { getToken } from '../../GetToken';

const ProvimetNota = () => {

    const token = getToken();
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [provimet, setProvimet] = useState([]);
    const [provimetParaqitura, setProvimetParaqitura] = useState([]);
    const [selectedProvimi, setSelectedProvimi] = useState(null);


    useEffect(() => {
      fetchProvimet();
    }, []);

    const handleProvimi = (item) => {
      setSelectedProvimi(item)
      paraqit(item);
    }

    const fetchProvimetParaqitura = async() => {
      axios.get('http://localhost:8080/student/provimetParaqitura',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          return(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    const fetchProvimet = async() => {
      axios.get('http://localhost:8080/student/paraqitjaProvimit')
        .then(response => {
          let fetchParaqitjet = fetchProvimetParaqitura();
          console.log(JSON.stringify(fetchParaqitjet))
          setProvimet(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const paraqit = async (item) => {
      try{
       
        const formData = {
          dataParaqitjes: "",
          dataVendosjes: "",
          nota: "",
          provimi: item
        }
        await axios.post("http://localhost:8080/student/paraqit/"+item.id, formData,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
        })
      }catch(error){
        console.log(error);
      }

    }

    

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Kredite</Table.HeadCell>
          <Table.HeadCell>Lenda</Table.HeadCell>
          <Table.HeadCell>Profesori</Table.HeadCell>
          <Table.HeadCell>Obligative</Table.HeadCell>
          <Table.HeadCell>Butoni</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y border dark:border-gray-400">
            {provimet.map((item) =>(
                <Table.Row key={item.id} style={{background: colors.primary[500]}}>
                <Table.Cell className="whitespace-nowrap font-medium">
                {item.ligjerata.lenda.ects}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium">
                {item.ligjerata.lenda.emri}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium">
                    {item.ligjerata.professor.user.firstName} {item.ligjerata.professor.user.lastName}
                </Table.Cell>           
                <Table.Cell className="whitespace-nowrap font-medium">                   
                    {item.ligjerata.lenda.obligative+""}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium">
                    <Button onClick={() => handleProvimi(item)}>Paraqit</Button>
                </Table.Cell>
            
              </Table.Row>
            ))}
        
        </Table.Body>
      </Table>
    </div>
  )
}

export default ProvimetNota