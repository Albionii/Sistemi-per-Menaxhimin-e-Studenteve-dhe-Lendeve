import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

export default function BasicTable({ orari }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <TableContainer component={Paper} elevation={0} sx={{background: colors.primary[400]}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center'}}>Dita</TableCell>
            <TableCell sx={{fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center'}}>Orari</TableCell>
            <TableCell sx={{fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center'}}>Salla</TableCell>
            <TableCell sx={{fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center'}}>Lenda</TableCell>
            <TableCell sx={{fontSize: '16px', padding: 2, fontWeight: 'bold', textAlign: 'center'}}>Stafi</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {orari.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{textAlign: 'center', fontSize: '14px'}}>{item.dita}</TableCell>
              <TableCell sx={{textAlign: 'center', fontSize: '14px'}}>{item.ora}</TableCell>
              <TableCell sx={{textAlign: 'center', fontSize: '14px'}}>{item.salla}</TableCell>
              <TableCell sx={{textAlign: 'center', fontSize: '14px'}}>{item.ligjerata.lenda.emri}</TableCell>
              <TableCell sx={{textAlign: 'center', fontSize: '14px'}}>{item.ligjerata.professor.user.firstName+" "+item.ligjerata.professor.user.lastName}</TableCell> {/* Adjust based on your entity structure */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}