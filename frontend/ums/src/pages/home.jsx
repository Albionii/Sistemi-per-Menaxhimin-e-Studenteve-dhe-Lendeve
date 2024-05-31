import React, { useEffect, useState } from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import SimpleSlider from "../components/Carousel";
import ResponsiveButtons from "../components/Buttons";
import useTranskriptaData from "../getMesatarjaSemesterEcts";
import ProfesoriButtons from "../components/ProfessorButtons";

const Home = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { mesatarja, ects, semester } = useTranskriptaData(token);
  const [data, setData] = useState(false);

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
        gridAutoRows="156px"
        gap="20px"
      >
        {/* ROW 1*/}
        <Box
          gridColumn="span 12"
          backgroundColor={colors.blueAccent[400]}
          gridRow={{ xs: "span 2", md: "span 1", sm: "span 2" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          textAlign={"center"}
          padding={{ xs: "25px", sm: "45px" }}
        >
          <SimpleSlider token={token} />
        </Box>
        {/* ROW 2 */}
        <Box
          onClick
          gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Table token={token} />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 3", sm: "span 12" }}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Box>
            <Box textAlign={"center"} bgcolor={colors.primary[400]} p={2} pt={2} borderRadius={'7px'}>
              <Box display={'flex'} justifyContent={'space-between'} pt={2} pb={2} pl={2} pr={2} alignItems={'center'} bgcolor={colors.primary[500]} borderRadius={3} mb={2}>
                <Box >
                  <Typography variant="h5" pl={1} fontWeight={'bold'}>Nota Mesatare: </Typography>
                </Box>
                <Box pt={2} bgcolor={colors.blueAccent[700]} borderRadius={3} pb={2} textAlign={'center'} width={'25%'}>
                  <Typography variant="h4" fontWeight={'bold'} color={'white'}>{mesatarja}</Typography>
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'space-between'} pt={2} pb={2} pl={2} pr={2} alignItems={'center'} bgcolor={colors.primary[500]} borderRadius={3}  mb={2}>
                <Box >
                  <Typography variant="h5" pl={1} fontWeight={'bold'}>ECTS: </Typography>
                </Box>
                <Box pt={2} bgcolor={colors.blueAccent[700]} borderRadius={3} pb={2}  textAlign={'center'} width={'25%'}>
                  <Typography variant="h4" fontWeight={'bold'} color={'white'}>{ects}</Typography>
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'space-between'} pt={2} pb={2} pl={2} pr={2} alignItems={'center'} bgcolor={colors.primary[500]} borderRadius={3}>
                <Box >
                  <Typography variant="h5" pl={1} fontWeight={'bold'}>Semestri: </Typography>
                </Box>
                <Box pt={2} bgcolor={colors.blueAccent[700]} borderRadius={3} pb={2} textAlign={'center'} width={'25%'}>
                  <Typography variant="h4" fontWeight={'bold'} color={'white'}>{semester}</Typography>
                </Box>
              </Box>
              {/* <Box padding={"12px"}>
                <Typography variant="h5">NOTA MESATARE:</Typography>
              </Box>
              <Typography variant="h4" style={{ padding: "16px" }} bgcolor={colors.primary[600]} ml={1} mr={1} borderRadius={3} fontWeight={'bold'}> 
                {mesatarja < 6
                  ? "Ju nuk keni dhene ndonje provim akoma"
                  : mesatarja}
              </Typography>{" "}
            </Box>
            <Box textAlign={"center"} bgcolor={colors.primary[400]}>
              <Box padding={"12px"}>
                <Typography variant="h5">ECTS:</Typography>
              </Box>
              <Typography variant="h4" padding={"16px"} bgcolor={colors.primary[600]} ml={1} mr={1} borderRadius={3} fontWeight={'bold'}>
                {ects == 0 ? "Ju nuk keni dhene ndonje provim akoma" : ects}
              </Typography>
            </Box>
            <Box textAlign={"center"} bgcolor={colors.primary[400]}>
              <Box  padding={"12px"}>
                <Typography variant="h5" borderRadius={3}>SEMESTRI:</Typography>
              </Box>
              <Typography variant="h4" padding={"16px"} bgcolor={colors.primary[600]} ml={1} mr={1} borderRadius={3} fontWeight={'bold'}>
                {semester ? semester : "Ju nuk keni regjistruar semestrin"}
              </Typography> */}
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 4", sm: "span 12" }}
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
              <PieChart token={token} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
          gridRow={{ xs: "span 4", md: "span 2", sm: "span 2" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          backgroundColor={colors.primary[400]}
        >
          <ProfesoriButtons></ProfesoriButtons>
          {/* <ResponsiveButtons /> */}
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 7", sm: "span 12" }}
          gridRow={"span 2"}
          borderRadius={"7px"}
          padding={{ xs: "15px 40px", sm: "15px 40px 15px 40px" }}
          backgroundColor={colors.primary[400]}
          sx={{
            "--fc-button-bg-color": colors.primary[500],
            "--fc-button-hover-bg-color": colors.primary[700],
            "--fc-button-hover-border-color": colors.primary[700],
            "--fc-button-border-color": colors.primary[600],
            "--fc-button-text-color": colors.gray[100],
            "--fc-today-bg-color": colors.primary[400],
          }}
        >
          <Calendar token={token} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
