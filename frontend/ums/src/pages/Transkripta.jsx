import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';
// import TableTranskripta from '../components/TableTranskripta2';
import Pie from '../components/charts/Piechart';
import Table from '../components/Table';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
// import Profesori from '../components/TableTranskripta';




const Transkripta = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
    <Box margin={'20px'}>
        <Box
        display={'grid'}
        gridTemplateColumns={{xs:'repeat(12, 1fr)', sm:'repeat(12, 1fr)', md:'repeat(13, 1fr)'}}
        gridAutoRows={'156px'}
        gap={"20px"}>
            {/* ROW 1 */}
            <Box
            gridColumn={{md:'span 3', sm:'span 6', xs:'span 12'}}
            borderRadius={'7px'}
            padding={'25px'}
            backgroundColor={'#D40E14'}
            color={'white'}>
                <Typography variant='h3'>Mesatarja</Typography>
                <Box mt={'15px'}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box borderRadius={'50%'} backgroundColor={'#d94348'} padding={'15px'}><FunctionsOutlinedIcon style={{ fontSize: 48 }}/></Box>
                        
                        <Typography variant='h1' fontWeight={'bold'}>9.6</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
            gridColumn={{md:'span 3', sm:'span 6', xs:'span 12'}}
            borderRadius={'7px'}
            padding={'25px'}
            backgroundColor={'#EC6601'}
            color={'white'}>
                <Typography variant='h3'>ECTS</Typography>
                <Box mt={'15px'}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box borderRadius={'50%'} backgroundColor={'#ed8c42'} padding={'15px'}><StickyNote2OutlinedIcon style={{ fontSize: 48 }}/></Box>
                        
                        <Typography variant='h1' fontWeight={'bold'}>85</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
            gridColumn={{md:'span 3', sm:'span 12', xs:'span 12'}}
            borderRadius={'7px'}
            padding={'25px'}
            backgroundColor={"#004F95"}
            color={'white'}>
                <Typography variant='h3'>Semestri</Typography>
                <Box mt={'15px'}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box borderRadius={'50%'} backgroundColor={'#3a6f9e'} padding={'15px'}><SchoolOutlinedIcon style={{ fontSize: 48 }}/></Box>
                        
                        <Typography variant='h1' fontWeight={'bold'}>2</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
            gridColumn={{md:'span 4', sm:'span 12', xs:'span 12'}}
            gridRow={'span 2'}
            borderRadius={'7px'}
            backgroundColor={colors.primary[400]}
            padding={'15px'}>
                <Typography variant='h4'>Notat tuaja:</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Pie/>
                </Box>
            </Box>
            {/* ROW 2 */}
            <Box
            gridColumn={{md: 'span 9', sm: 'span 12', xs: 'span 12'}}
            gridRow={'span 4'}
            borderRadius={'7px'}
            backgroundColor={colors.blueAccent[400]}>
                <Profesori/>
            </Box>
            <Box
            gridColumn={{md:'span 4', sm:'span 12', xs:'span 12'}}
            gridRow={'span 3'}
            borderRadius={'7px'}
            backgroundColor={colors.primary[400]}
            padding={'25px'}>
                
            </Box>
        </Box>
        {/* <Box
          gridColumn="span 12"
          backgroundColor={colors.blueAccent[400]}
          gridRow={{xs: 'span 2', md: 'span 1', sm:'span 2'}}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          textAlign={"center"}
          padding={{xs:'25px', sm:"45px"}}
        >

          <SimpleSlider/>
        </Box> */}
    </Box>
  )
}

export default Transkripta