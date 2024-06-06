import React from "react";
import {
  useTheme,
  Box,
  Typography
} from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import SimpleSlider from "../components/Carousel";
import ResponsiveButtons from "../components/Buttons";
import ProfesoriButtons from "../components/ProfessorButtons";
import TableProfessor from "../components/TableProfessor";
import ProfessorLajmi from "../components/ProfessorLajmi";
import MesataretTable from "../components/MesataretTable";
import SemestriAktual from "../components/SemestriAktual";
import ProfessorCalendar from "../components/ProfessorCalendar";

const Home = ({ token, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const USER_ROLE =  user;

  console.log(USER_ROLE)

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
          {USER_ROLE === "ROLE_STUDENT" ? (
          <SimpleSlider token={token}/>) : (<ProfessorLajmi token={token}/>)}
        </Box>

        {/* ROW 2 */}
        {USER_ROLE === "ROLE_STUDENT" ? (
          <>
            <Box
              gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
              gridRow={"span 2"}
              backgroundColor={colors.primary[400]}
              borderRadius={"7px"}
              sx={{
                "@media (max-width: 1350px)": {
                  gridColumn: "span 6",
                },
                "@media (max-width: 1000px)": {
                  gridColumn: "span 12",
                },
                "@media (max-width: 800px)": {
                  gridColumn: "span 12",
                },
              }}
            >
              <Table token={token} />
            </Box>
            <Box
              gridColumn={{ xs: "span 12", md: "span 3", sm: "span 12" }}
              gridRow={"span 2"}
              backgroundColor={colors.primary[400]}
              borderRadius={"7px"}
              sx={{
                "@media (max-width: 1350px)": {
                  gridColumn: "span 6",
                },
                "@media (max-width: 1000px)": {
                  gridColumn: "span 12",
                },
              }}
            >
              <MesataretTable token={token}/>
            </Box>
            <Box
              gridColumn={{ xs: "span 12", md: "span 4", sm: "span 12" }}
              gridRow={"span 2"}
              backgroundColor={colors.primary[400]}
              borderRadius={"7px"}
              sx={{
                "@media (max-width: 1350px)": {
                  gridColumn: "span 6",
                },
                "@media (max-width: 1000px)": {
                  gridColumn: "span 12",
                },
              }}
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
          </>
        ) : (
          <>
            <Box
              gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
              gridRow={"span 2"}
              backgroundColor={colors.primary[400]}
              borderRadius={"7px"}
              sx={{
                "@media (max-width: 1350px)": {
                  gridColumn: "span 12",
                },
              }}
            >
              <TableProfessor token={token} />
            </Box>
            <Box
              gridColumn={{ xs: "span 12", md: "span 7", sm: "span 12" }}
              gridRow={{ md: "span 2", xs: "span 3" }}
              backgroundColor={colors.primary[400]}
              borderRadius={"7px"}
              padding={1}
              sx={{
                "@media (max-width: 1350px)": {
                  gridColumn: "span 12",
                },
              }}
            >
              <SemestriAktual token={token}/>
            </Box>
          </>
        )}

        {/* ROW 3 */}
        {USER_ROLE === "ROLE_STUDENT" ? (
          <Box
            gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
            gridRow={{ xs: "span 4", md: "span 2", sm: "span 2" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"7px"}
            backgroundColor={colors.primary[400]}
            sx={{
              "@media (max-width: 1350px)": {
                gridColumn: "span 6",
              },
              "@media (max-width: 1000px)": {
                gridColumn: "span 12",
              },
            }}
          >
            <ResponsiveButtons />
          </Box>
        ) : (
          <Box
            gridColumn={{ xs: "span 12", md: "span 5", sm: "span 12" }}
            gridRow={{ xs: "span 4", md: "span 2", sm: "span 2" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"7px"}
            backgroundColor={colors.primary[400]}
            sx={{
              "@media (max-width: 1350px)": {
                gridColumn: "span 12",
              },
              "@media (max-width: 1000px)": {
                gridColumn: "span 12",
              },
            }}
          >
            <ProfesoriButtons token={token} />
          </Box>
        )}

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
            "@media (max-width: 1350px)": {
              gridColumn: "span 12",
            },
          }}
        >
          {USER_ROLE === 'ROLE_STUDENT' ? (<Calendar token={token} />) : (<ProfessorCalendar token={token}/>)}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
