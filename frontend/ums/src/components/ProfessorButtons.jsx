import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FunctionsIcon from '@mui/icons-material/Functions';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AppsIcon from '@mui/icons-material/Apps';
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfesoriButtons = ({ token }) => {
  const [professorStatistics, setProfessorStatistics] = useState({
    saLende: "",
    Mesatarja: "",
    SaNotaTeVendosura: "",
    Enrollments: ""
  });
  const getStatistics = () => {
    axios
      .get(`http://localhost:8080/api/professor/get/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfessorStatistics(response.data);
        // console.log(response.data);
        console.log("PROFESSOR STATS " + JSON.stringify(response));
      })
      .catch((error) => {
        console.error("Error getting Statistics: " + error);
      });
  };

  useEffect(() => {
    getStatistics();
  }, []);
  const renderButtons = ({ text, color, darker, stat, Icon }) => (
    <Grid item xs={12} sm={6} md={6}>

      <Box
        component="div"
        bgcolor={color}
        minHeight="60px"
        borderRadius={3}
        lineHeight="1.2"
        color="#FFF"
        cursor="pointer"
        fontSize="13px"
        padding={1}
      >
        <Box pb={3} fontSize={'14px'} fontWeight={'bold'} >{stat}</Box>
        <Box textAlign={'right'} p={2} bgcolor={darker} mb={2} borderRadius={3} color={'white'} fontSize={'30px'} fontWeight={'bold'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Icon fontSize={'15px'} />
          {text}
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Grid container spacing={2} justifyContent="center" p={2}>
      {renderButtons({ text: professorStatistics.saLende, color: "#D40E14", darker: "#B40C11", stat: 'Total Ligjerata', Icon: AppsIcon })}
      {renderButtons({ text: parseFloat(professorStatistics.Mesatarja).toFixed(2), color: "#EC6601", darker: "#CA5701", stat: 'Nota Mesatare', Icon: FunctionsIcon })}
      {renderButtons({ text: professorStatistics.SaNotaTeVendosura, color: "#004F95", darker: "#003D73", stat: 'Student te vleresuar', Icon: DoneAllIcon })}
      {renderButtons({ text: professorStatistics.Enrollments, color: "#B70E77", darker: "#970C62", stat: 'Lenda me me se shumti enrollments', Icon: AutoAwesomeMotionIcon })}
    </Grid>
  );
};

export default ProfesoriButtons;
