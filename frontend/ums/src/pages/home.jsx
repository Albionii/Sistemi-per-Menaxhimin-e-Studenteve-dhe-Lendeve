import React from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import SimpleSlider from "../components/Carousel"
import ResponsiveButtons from "../components/Buttons"

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns={{xs:'1fr', sm:"repeat(12, 1fr)"}}
        gridAutoRows="156px"
        gap="20px"
      >
        {/* ROW 1*/}
        <Box
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
        </Box>
        {/* ROW 2 */}
        <Box
          onClick
          gridColumn={{xs: 'span 12', md:'span 5',sm:"span 12"}}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Table />
        </Box>
        <Box
          gridColumn={{xs: 'span 12', md:'span 3',sm:"span 12"}}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Nota mesatare:</Typography>
              </Box>
              <Typography variant="h5" padding={'16px'}>9.2</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">ECTS:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>96</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Semestri:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>2</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={{xs:'span 12', md:'span 4',sm:"span 12"}}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Typography variant="h4" pt={"10px"} pl={"10px"}>
            Notat tuaja:
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            minWidth={"350px"}
          >
            <PieChart />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={{xs: 'span 12', md:'span 5', sm:"span 12"}}
          gridRow={{xs: 'span 4', md: 'span 2', sm: 'span 2'}}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          backgroundColor={colors.primary[400]}
        >
          <ResponsiveButtons/>
        </Box>
        <Box
          gridColumn={{xs:'span 12', md:'span 7', sm:"span 12"}}
          gridRow={"span 2"}
          borderRadius={"7px"}
          padding={{xs: '15px 40px', sm:"15px 40px 15px 40px"}}
          backgroundColor={colors.primary[400]}
        >
          <Calendar/>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;