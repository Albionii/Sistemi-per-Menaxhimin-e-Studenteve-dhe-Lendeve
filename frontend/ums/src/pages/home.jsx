import React, { Suspense, lazy } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";

// Lazy load components
const Table = lazy(() => import("../components/Table"));
const PieChart = lazy(() => import("../components/charts/Piechart"));
const Calendar = lazy(() => import("../components/Calendar"));
const SimpleSlider = lazy(() => import("../components/Carousel"));
const ResponsiveButtons = lazy(() => import("../components/Buttons"));
const ProfesoriButtons = lazy(() => import("../components/ProfessorButtons"));
const TableProfessor = lazy(() => import("../components/TableProfessor"));
const ProfessorLajmi = lazy(() => import("../components/ProfessorLajmi"));
const MesataretTable = lazy(() => import("../components/MesataretTable"));
const SemestriAktual = lazy(() => import("../components/SemestriAktual"));
const ProfessorCalendar = lazy(() => import("../components/ProfessorCalendar"));

const Home = ({ token, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const USER_ROLE =  user;

  return (
    
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default Home;
