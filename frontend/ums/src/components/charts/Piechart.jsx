import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Pie = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [countNotat, setCountNotat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/student/notatCount", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setCountNotat(response.data);
      } catch (error) {
        console.error("There was an error fetching the notat!", error);
      }
    };
  
    fetchData();
  }, [token]);

  const options = {
    colors: ['#EC6601', '#D40E14', '#004F95', '#008B59', '#B70E77'],
    legend: {
      position: 'bottom',
      labels: {
        colors: colors.gray[100]
      },
    },
    labels: ['Nota 6', 'Nota 7', 'Nota 8', 'Nota 9', 'Nota 10']
  };

  const series = countNotat;
  const allZero = series.every(value => value === 0);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {!allZero ? (
        <div className="pie">
          <Chart options={options} series={series} type="pie" width="380" />
        </div>

      ) : (
        <Typography mt={'35%'} fontWeight={'bold'} variant='h5'>Ju nuk keni dhene ndonje provim</Typography>
      )}
    </Box>
  );
};

export default Pie;
