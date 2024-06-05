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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfesoriButtons from "../components/ProfessorButtons";

const Home = ({ token, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { mesatarja, ects, semester } = useTranskriptaData(token);

  const navigate = useNavigate();

  const USER_ROLE = user;

  const handleClick = (id, name, professor, professorId) => {
    navigate("/postimi", { state: { id, name, professor, professorId } });
  };

  const [ligjeratat, setLigjeratat] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semesterId, setSemesterId] = useState(1);
  const [currentSemester, setCurrentSemester] = useState({});
  const [studentCounts, setStudentCounts] = useState({});

  const handleIncrease = () => {
    if (semesterId < semesters.length) {
      setSemesterId(semesterId + 1);
    }
  };

  const handleDecrease = () => {
    if (semesterId > 1) {
      setSemesterId(semesterId - 1);
    }
  };

  useEffect(() => {
    getSemesters();
  }, []);

  useEffect(() => {
    // getStatistics();
    if (semesters.length > 0) {
      const newSemester = semesters[semesterId - 1];
      setCurrentSemester(newSemester);
      getLigjeratatSemester(newSemester.id);
    }
  }, [semesterId, semesters]);
  const getSemesters = () => {
    axios
      .get(`http://localhost:8080/professorLenda/professor/semestret/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSemesters(response.data);
        if (response.data.length > 0) {
          const firstSemester = response.data[0];
          setCurrentSemester(firstSemester);
          getLigjeratatSemester(firstSemester.id);
        }
      })
      .catch((error) => {
        console.error("Error getting semesters: " + error);
      });
  };

  const getStudentsCount = (ligjerataId) => {
    axios
      .get(`http://localhost:8080/api/student/count/${ligjerataId}`)
      .then((response) => {
        setStudentCounts((prevCounts) => ({
          ...prevCounts,
          [ligjerataId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error getting student count: " + error);
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
        response.data.forEach((ligjerata) => {
          getStudentsCount(ligjerata.id);
        });
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };

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
        {USER_ROLE === "ROLE_STUDENT" ? (
          <>
            <Box
              onClick
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
              <Box>
                <Box
                  textAlign={"center"}
                  bgcolor={colors.primary[400]}
                  p={2}
                  pt={2}
                  borderRadius={"7px"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        Nota Mesatare:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {mesatarja == null ? 0 : mesatarja}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        ECTS:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {ects}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        Semestri:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {semester}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
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
              onClick
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
              <Table token={token} />
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                bgcolor={colors.primary[600]}
                borderRadius={3}
              >
                <Typography variant="h4">Ligjeratat: </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    pl={2}
                    pr={2}
                    bgcolor={colors.blueAccent[700]}
                    borderRadius={3}
                    fontWeight={"bold"}
                    color={"white"}
                    mb={""}
                  >
                    {currentSemester.name}
                  </Typography>
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
              <Box mt={2}>
                <Grid container spacing={2}>
                  {ligjeratat.map((ligjerata, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                      <Box
                        onClick={() => {
                          handleClick(
                            ligjerata.id,
                            ligjerata.lenda.emri,
                            ligjerata.professor.user.firstName +
                              " " +
                              ligjerata.professor.user.lastName,
                            ligjerata.professor.user.id
                          );
                        }}
                        underline="none"
                        sx={{ ":hover": { cursor: "pointer" } }}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          bgcolor={colors.blueAccent[800]}
                          textAlign="center"
                          borderRadius={3}
                          sx={{
                            transition: "background-color 0.3s",
                            "&:hover": {
                              backgroundColor: colors.blueAccent[900],
                            },
                            ":hover": {
                              cursor: "pointer",
                              bgcolor: [colors.blueAccent[900]],
                            },
                          }}
                          alignItems={"center"}
                          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.2)"
                        >
                          <Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              color="#fff"
                            >
                              <Typography ml={1}>
                                {ligjerata.lenda.emri}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            p={1}
                            bgcolor={colors.blueAccent[900]}
                            borderRadius={3}
                            m={"3px"}
                            color={"white"}
                          >
                            <Typography>Students:</Typography>
                            <Typography fontWeight={"bold"}>
                              {studentCounts[ligjerata.id]}
                            </Typography>{" "}
                            {/* Corrected */}
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
          <Calendar token={token} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
