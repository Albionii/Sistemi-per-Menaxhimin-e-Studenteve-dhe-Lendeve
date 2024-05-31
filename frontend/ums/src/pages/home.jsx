import React, { useEffect, useState } from "react";
import {
  useTheme,
  Box,
  Typography,
  Button,
  IconButton,
  Icon,
  Grid,
} from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import SimpleSlider from "../components/Carousel";
import ResponsiveButtons from "../components/Buttons";
import useTranskriptaData from "../getMesatarjaSemesterEcts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfesoriButtons from "../components/ProfessorButtons";

const Home = ({ token }) => {
  let role;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { mesatarja, ects, semester } = useTranskriptaData(token);

  const navigate = useNavigate();

  const value = `; ${document.cookie}`;
  const parts = value.split(`; Role=`);
  if (parts.length === 2) {
    role = parts.pop().split(";").shift();
  }
  const USER_ROLE = role;

  const handleClick = (id, name, professor) => {
    navigate("/postimi", { state: { id, name, professor} });
  };

  const [ligjeratat, setLigjeratat] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semesterId, setSemesterId] = useState(1);
  const [currentSemester, setCurrentSemester] = useState([]);

  const handleIncrease = () => {
    if (semesterId < semesters.length) {
      setSemesterId(semesterId + 1);
      setCurrentSemester(semesters[semesterId]);
    }
  };

  const handleDecrease = () => {
    if (semesterId > 1) {
      setSemesterId(semesterId - 1);
      setCurrentSemester(semesters[semesterId - 2]);
    }
  };

  useEffect(() => {
    getSemesters();
    getLigjeratatSemester(currentSemester.id);
  }, [semesterId]);

  const getSemesters = () => {
    axios
      .get(`http://localhost:8080/professorLenda/professor/semestret/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSemesters(response.data);
        if (currentSemester.length === 0) {
          setCurrentSemester(response.data[0]);
          getLigjeratatSemester(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };

  const getLigjeratatSemester = (semesterId) => {
    axios
      .get(`http://localhost:8080/professorLenda/ligjeratat/${semesterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLigjeratat(response.data);
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };
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
          gridRow={{ xs: "span ", md: "span 1", sm: "span 2" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          textAlign={"center"}
          padding={{ xs: "25px", sm: "45px" }}
        >
          <SimpleSlider token={token}  />
        </Box>

        {/* ROW 2 */}
        {USER_ROLE === "ROLE_STUDENT" ? (
          <>
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
                    {ects == 0 ? "Ju nuk keni dhene ndonje provim akoma" : ects}
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
          </>
        ) : (
          <>
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
            gridColumn={{ xs: "span 12", md: "span 7", sm: "span 12" }}
            gridRow={{ md: "span 2", xs: "span 3" }}
            backgroundColor={colors.primary[400]}
            borderRadius={"7px"}
            padding="10px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">Ligjeratat: </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{currentSemester.name}</Typography>
                <Box>
                  <IconButton onClick={handleDecrease} size="small">
                    <ArrowBackIosIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={handleIncrease} size="small">
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                {ligjeratat.map((ligjerata, index) => (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                    <Box
                      onClick={() => {
                        handleClick(ligjerata.id, ligjerata.lenda.emri, ligjerata.professor.user.firstName + " " + ligjerata.professor.user.lastName);
                      }}
                      underline="none"
                      sx={{ ":hover": { cursor: "pointer" } }}
                    >
                      <Box
                        bgcolor="#D40E14"
                        p={2}
                        textAlign="center"
                        borderRadius={5}
                        border={"#D40E14" + " 1.5px solid"}
                        sx={{
                          transition: "background-color 0.3s",
                          "&:hover": {
                            backgroundColor: "#D40E14",
                          },
                          ":hover": {
                            cursor: "pointer",
                            bgcolor: [colors.redAccent[600]],
                          },
                        }}
                        boxShadow="0px 2px 3px rgba(0, 0, 0, 0.2)"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          color="#fff"
                        >
                          <Typography ml={1}>{ligjerata.lenda.emri}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          </>
        )}

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
