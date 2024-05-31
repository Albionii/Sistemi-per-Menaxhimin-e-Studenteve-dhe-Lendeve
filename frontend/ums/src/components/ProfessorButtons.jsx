import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FunctionsIcon from '@mui/icons-material/Functions';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AppsIcon from '@mui/icons-material/Apps';

const ProfesoriButtons = () => {
  const renderButtons = (text, color, darker, stat, Icon) => (
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
                <Icon fontSize={'15px'}/>
                {text}
                </Box>
        </Box>
    </Grid>
  );

  return (
    <Grid container spacing={2} justifyContent="center" p={2}>
      {renderButtons("32", "#D40E14",  "#B40C11", 'Total Ligjerata', AppsIcon)}
      {renderButtons("7.8", "#EC6601",   "#CA5701", 'Nota Mesatare', FunctionsIcon)}
      {renderButtons("69", "#004F95",   "#003D73", 'Student te vleresuar', DoneAllIcon)}
      {renderButtons("AOK", "#B70E77",  "#970C62", 'Lenda me me se shumti enrollments', AutoAwesomeMotionIcon)}
    </Grid>
  );
};

export default ProfesoriButtons;
