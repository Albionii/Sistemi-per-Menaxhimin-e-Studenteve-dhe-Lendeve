import React, { useEffect, useState } from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import SimpleSlider from "../components/Carousel";
import ResponsiveButtons from "../components/Buttons";
import useTranskriptaData from "../getMesatarjaSemesterEcts";

const Home = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { mesatarja, ects, semester } = useTranskriptaData(token);

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
          <SimpleSlider token={token}/>
        </Box>
        {/* ROW 2 */}
        <Box
          onClick
          gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Table token={token}/>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 3", sm: "span 12" }}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Box>
            <Box textAlign={"center"}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Nota mesatare:</Typography>
              </Box>
              <Typography variant="h5" style={{ padding: "16px" }}>
                {mesatarja < 6
                  ? "Ju nuk keni dhene ndonje provim akoma"
                  : mesatarja}
              </Typography>{" "}
            </Box>
            <Box textAlign={"center"}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">ECTS:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>
                {(ects == 0 ? "Ju nuk keni dhene ndonje provim akoma" : ects)}
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Semestri:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>
                {semester}
              </Typography>
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
          <ResponsiveButtons />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 7", sm: "span 12" }}
          gridRow={"span 2"}
          borderRadius={"7px"}
          padding={{ xs: "15px 40px", sm: "15px 40px 15px 40px" }}
          backgroundColor={colors.primary[400]}
          sx={{ '--fc-button-bg-color': colors.primary[500], '--fc-button-hover-bg-color': colors.primary[700], '--fc-button-hover-border-color': colors.primary[700],'--fc-button-border-color': colors.primary[600], '--fc-button-text-color': colors.gray[100], '--fc-today-bg-color': colors.primary[400] }}

        >
          <Calendar token={token} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
