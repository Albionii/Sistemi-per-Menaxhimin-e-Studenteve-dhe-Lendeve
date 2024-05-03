import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';

const Pie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = {
    colors: ['#B70E77', '#004F95', '#008B59', '#D40E14', '#EC6601'],
    legend: {
      position: 'bottom',
      labels: {
        colors: colors.gray[100]
      },
    },
    labels: ['Nota 10', 'Nota 9', 'Nota 8', 'Nota 7', 'Nota 6']
  };

  const series = [7, 7, 4, 2, 3];

  return (
    <div className="pie">
      <Chart options={options} series={series} type="pie" width="380" />
    </div>
  );
};

export default Pie;
