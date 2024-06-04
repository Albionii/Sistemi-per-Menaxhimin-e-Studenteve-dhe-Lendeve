import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Dropdown } from 'flowbite-react';

import { Dialog, DialogContent, useTheme } from '@mui/material';
import { getToken } from '../GetToken';
import { tokens } from '../theme';

const ProvimetNota = () => {

    const token = getToken();
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [formData, setFormaData] = useState(
      {
        nota: 0
      }
    )

    const notat = [5, 6, 7, 8, 9, 10];
    
    const [ligjeratat, setLigjeratat] = useState([]);
    const [ligjerata, setLigjerata] = useState(null);
    const [provimi, setProvimi] = useState(null);
    const [nota, setNota] = useState(0);

    const [studentProvimet, setStudentProvimet] = useState([]);
    const [open, setOpen] = useState(false);
  
    const handleSelectedLigjerata = (p) => {
      fetchStudentProvimet(p.id);
      setLigjerata(p.id)
    }

    const handleClose = () => {
      setOpen(false);
    }

    const handleStudentProvimi = (p) => {
      setOpen(true);
      setProvimi(p);
      setNota(p.nota);
    }

    const handleNota = (n) => {
      const value = n.target.value;
      const regex = /^(5|6|7|8|9|10)?$/; 
      if (value == '' || regex.test(value)) {
        setNota(value);
        setFormaData({...formData, nota: value})
      }
    }


    useEffect(() => {
      fetchLigjeratat();
    }, []);


    const fetchLigjeratat = async() => {
      axios.get('http://localhost:8080/professor/ligjeratatOfProfessor',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setLigjeratat(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    
    const fetchStudentProvimet = async(id) => {
      axios.get('http://localhost:8080/professor/paraqitjet/'+id)
        .then(response => {
          setStudentProvimet(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

 
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put("http://localhost:8080/professor/provimi/" + provimi.id + "/" + nota, formData);
        fetchStudentProvimet(ligjerata)
        handleClose();
      } catch (error) {
        console.error(error);
      }
    };  
   
    

  return (
    <div className="overflow-x-auto m-5">
      <Dropdown label="Zgjedhni Provimin" dismissOnClick={true}>
        {ligjeratat.map(p => (
          <Dropdown.Item key={p.id} onClick = {() => {handleSelectedLigjerata(p)}}>{p.lenda.emri}</Dropdown.Item> 
        ))
        }
      </Dropdown>
      <br />
      <Table hoverable>
        <Table.Head className='border'>
          <Table.HeadCell>Lenda</Table.HeadCell>
          <Table.HeadCell>Emri Studentit</Table.HeadCell>
          <Table.HeadCell>Data Paraqitjes</Table.HeadCell>
          <Table.HeadCell>Data Vendosjes</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          <Table.HeadCell>Butoni</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y border dark:border-gray-400">
            {studentProvimet.map((item) =>(
                <Table.Row key={item.id} style={{background: colors.primary[500]}}>
                <Table.Cell className="whitespace-nowrap font-medium">
                {item.provimi.ligjerata.lenda.emri}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium">
                {item.student.user.firstName + " " + item.student.user.lastName}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium">
                    {item.dataParaqitjes}
                </Table.Cell>           
                <Table.Cell className="whitespace-nowrap font-medium">                   
                    {item.dataVendosjes}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium">                   
                    {item.nota}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium">
                    <Button onClick={() => handleStudentProvimi(item)}>Vendos Noten</Button>
                </Table.Cell>
            
              </Table.Row>
            ))}
        
        </Table.Body>
      </Table>

      
      <Fragment>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent sx={{ padding: '0px' }}>
              <div className="relative w-full rounded-lg shadow" style={{background: colors.primary[500]}}>
                <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-500">
                  <h3 className="text-lg font-semibold"  >
                    Krijo Provimin
                  </h3>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={handleClose}
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
                          Emri dhe Mbiemri
                        </label>
                        <input 
                          type="text" 
                          className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 border-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                          value={provimi!=null ? provimi.student.user.firstName + " " + provimi.student.user.lastName:""}
                          readOnly
                          />
                    </div>
                    
                    <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block text-left mb-2 text-sm font-medium"
                        >
                          Nota
                        </label>
                        
                        <select
                          // id="pr"
                          className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" style={{background: colors.primary[400]}}
                          value={nota}
                          onChange={handleNota}
                          required
                        >
                          <option value="" hidden>{nota == 0 && provimi !=null ? provimi.nota:nota}</option>
                          <option value={notat[0]}>{notat[0]}</option>
                          <option value={notat[1]}>{notat[1]}</option>
                          <option value={notat[2]}>{notat[2]}</option>
                          <option value={notat[3]}>{notat[3]}</option>
                          <option value={notat[4]}>{notat[4]}</option>
                          <option value={notat[5]}>{notat[5]}</option>
                          
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
                    Shto Noten
                  </button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </Fragment>
    </div>
  )
}

export default ProvimetNota