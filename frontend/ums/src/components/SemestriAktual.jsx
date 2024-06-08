import React from "react";
import { Box, useTheme, Typography, IconButton, Grid } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

const SemestriAktual = ({token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();


  const [ligjeratat, setLigjeratat] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semesterId, setSemesterId] = useState(1);
  const [currentSemester, setCurrentSemester] = useState({});
  const [studentCounts, setStudentCounts] = useState({});

  const handleClick = (id, name, professor, professorId) => {
    navigate("/postimi", { state: { id, name, professor, professorId } });
  };

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
    if (semesters.length > 0) {
      const newSemester = semesters[semesterId - 1];
      setCurrentSemester(newSemester);
      getLigjeratatSemester(newSemester.id);
    }
  }, [semesterId, semesters]);
  const getSemesters = () => {
    axios
      .get(`http://localhost:8080/api/professor/semestret/`, {
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
      .get(`http://localhost:8080/api/professor/count/${ligjerataId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
    <>
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
                      <Typography ml={1}>{ligjerata.lenda.emri}</Typography>
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
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SemestriAktual;
