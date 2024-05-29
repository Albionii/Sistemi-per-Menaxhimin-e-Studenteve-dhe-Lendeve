import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

export default function BasicTable({ semestrat }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ background: colors.primary[400] }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center' }}>Afati</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center' }}>Lokacioni</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center' }}>Semestri</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center' }}>Nderrimi i Orarit</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center' }}>Data e Regjistrimit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {semestrat.map((semestri) => (
            <TableRow
              key={semestri.id} // Assuming each semester has a unique id
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ padding: 3, textAlign: 'center' }}>
                {semestri.afati}
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>{semestri.lokacioni}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{semestri.semester ? semestri.semester.name : ""}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{semestri.nderrimiOrarit}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{formatDate(semestri.registrationDate)}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
