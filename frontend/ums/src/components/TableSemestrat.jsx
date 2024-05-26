import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

export default function BasicTable({ semestrat }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <TableContainer component={Paper} elevation={0} sx={{ background: colors.primary[400] }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold' }}>Afati</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold' }}>Lokacioni</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold' }}>Semestri</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold' }}>Nderrimi i Orarit</TableCell>
            <TableCell sx={{ fontSize: '16px', padding: 2, fontWeight: 'bold' }}>Data e Regjistrimit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {semestrat.map((semestri) => (
            <TableRow
              key={semestri.id} // Assuming each semester has a unique id
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ padding: 3 }}>
                {semestri.afati}
              </TableCell>
              <TableCell>{semestri.lokacioni}</TableCell>
              <TableCell>{semestri.semester ? semestri.semester.name : ""}</TableCell>
              <TableCell>{semestri.nderrimiOrarit}</TableCell>
              <TableCell>{semestri.registrationDate}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
