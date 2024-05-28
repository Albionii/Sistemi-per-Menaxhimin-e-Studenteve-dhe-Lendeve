import React, { Component, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import axios from "axios"

const Pie = ({token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [countNotat, setCountNotat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/student/notatCount", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setCountNotat(response.data);
      } catch (error) {
        console.error("There was an error fetching the notat!", error);
      }
    };
  
    fetchData();
  }, []);

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

  return (
    <div className="pie">
      <Chart options={options} series={series} type="pie" width="380" />
    </div>
  );
};

export default Pie;
