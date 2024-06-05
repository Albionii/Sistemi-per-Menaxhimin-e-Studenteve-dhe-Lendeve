import { Box, Typography, Grid, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableSemestrat from "../components/TableSemestrat";
import axios from "axios";

import CreatedNotifications from "../components/Notifications/CreatedNoftifications";


const RegjistroSemestrin = ({ token }) => {
  const [lokacioni, setLokacioni] = useState("");
  const [semester, setSemester] = useState({});
  const [nderrimiOrarit, setOrari] = useState("");
  const [semestriList, setSemestriList] = useState([]);
  const [semestrat, setSemestrat] = useState([]);
  const [userData, setUserData] = useState(null);
  const [afati, setAfati] = useState("");
  const [notification, setNotification] = useState(""); 
  const [exists, setExisting] = useState([]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/semesters")
      .then((response) => {
        setSemestriList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the semesters!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/afati/date")
      .then((response) => {
        console.log(response.data);
        setAfati(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Afatet!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/student/semester/exists", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data) {
          setExisting(response.data);
        }
      })
      .catch((error) => {
        console.error("Doesn't exist", error);
      });
  }, [token]);

  const handleLokacioniChange = (event) => {
    setLokacioni(event.target.value);
  };

  const handleSemestriChange = (event) => {
    setSemester(event.target.value);
  };

  const handleOrariChange = (event) => {
    setOrari(event.target.value);
  };

  const handleSubmit = () => {
    const newSemester = {
      afati: afati[0],
      lokacioni,
      nderrimiOrarit,
      semester,
    };
    console.log(newSemester);
    console.log(semester);
    axios
      .post("http://localhost:8080/api/student/semester/register", newSemester, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSemestrat([...semestrat, response.data]);
        setNotification("Registered Successfully"); 
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error registering the semester!", error);
      });
  };

  const handleUnregister = () => {
    axios
      .delete(`http://localhost:8080/api/student/semester`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNotification("Unregistered Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error unregistering the group!", error);
      });
  };

  return (
    <Box m={{ xs: 2, sm: 3, md: 4 }}>
      <Grid container>
        <Grid item xs={12} md={4} >
          <Box
            bgcolor={colors.primary[600]}
            p={{ xs: 2, sm: 3, md: 4 }}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"row"}
          > 
            <Box>
              <Typography
                mb={{ xs: 12, sm: 6, md: 5 }}
                mt={{ xs: 12, md: 0, sm: 6 }}
                variant="h4"
                textAlign={"center"}
              >
                Afati per regjistrimin e grupit eshte i hapur me datat:{" "}
              </Typography>
              {afati.length > 0 ? (
                <Box
                  p={2}
                  mb={5}
                  bgcolor={colors.greenAccent[500]}
                  borderRadius={3}
                  textAlign={"center"}
                  fontSize={"17px"}
                  color={"white"}
                >
                  {afati[0].dataFillimit} - {afati[0].dataMbarimit}
                </Box>
              ): (<Box
                p={2}
                mb={5}
                bgcolor={colors.redAccent[500]}
                borderRadius={3}
                textAlign={"center"}
                fontSize={"17px"}
                color={"white"}
              >
                Nuk ka afat te hapur 
              </Box>)}
              {exists.length > 0 && (<Box
                    mt={2}
                    py={4}
                    px={2}
                    bgcolor={colors.greenAccent[600]}
                    textAlign={"center"}
                    fontSize={"16px"}
                    borderRadius={3}
                    color={"white"}
                  >
                    Semestri është regjistruar me sukses!
                  </Box>)}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            bgcolor={colors.primary[400]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box width={{ md: "50%", sm: "65%", sx: "75%" }}>
              <Box
                p={2}
                textAlign={"center"}
                borderBottom={`1px solid ${colors.primary[600]}`}
                fontSize={"28px"}
              >
                Regjistrimi i Semestrit
              </Box>
              <Box mt={2} px={2}>
                <Typography variant="h5" mb={2}>
                  Lokacioni:
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="lokacioni-select-label">Lokacioni</InputLabel>
                  <Select
                    labelId="lokacioni-select-label"
                    id="lokacioni-select"
                    value={lokacioni}
                    label="Lokacioni"
                    onChange={handleLokacioniChange}
                  >
                    <MenuItem
                      value="Prishtine"
                      sx={{ background: colors.primary[500] }}
                    >
                      Prishtine
                    </MenuItem>
                    <MenuItem
                      value="Therande"
                      sx={{ background: colors.primary[500] }}
                    >
                      Therande
                    </MenuItem>
                    <MenuItem
                      value="Prizren"
                      sx={{ background: colors.primary[500] }}
                    >
                      Prizren
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2} px={2}>
                <Typography variant="h5" mb={2}>
                  Semestri Studimeve:
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="semestri-select-label">Semestri</InputLabel>
                  <Select
                    labelId="semestri-select-label"
                    id="semestri-select"
                    value={semester}
                    label="semestri"
                    onChange={handleSemestriChange}
                  >
                    {semestriList.map((semester) => (
                      <MenuItem
                        key={semester.id}
                        value={semester}
                        sx={{ background: colors.primary[500] }}
                      >
                        {semester.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2} px={2}>
                <Typography variant="h5" mb={2}>
                  Orari i mësimit:{" "}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="orari-select-label">Orari</InputLabel>
                  <Select
                    labelId="orari-select-label"
                    id="orari-select"
                    value={nderrimiOrarit}
                    label="Orari"
                    onChange={handleOrariChange}
                  >
                    <MenuItem
                      value="Paradite"
                      sx={{ background: colors.primary[500] }}
                    >
                      Paradite
                    </MenuItem>
                    <MenuItem
                      value="Pasdite"
                      sx={{ background: colors.primary[500] }}
                    >
                      Pasdite
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box width={"100%"} mt={5} mb={4}>
                <Box
                  bgcolor={colors.blueAccent[500]}
                  p={2}
                  textAlign={"center"}
                  mt={5}
                  fontSize={"16px"}
                  borderRadius={3}
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.blueAccent[600],
                    },
                  }}
                  onClick={handleSubmit}
                  color={"white"}
                >
                  Ruaj Ndryshimet
                </Box>
              </Box>
              {exists.length > 0 && (
                <>
                  <Box width={"100%"} mt={5} mb={4}>
                <Box
                  bgcolor={colors.redAccent[500]}
                  p={2}
                  textAlign={"center"}
                  mt={5}
                  fontSize={"16px"}
                  borderRadius={3}
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.redAccent[600],
                    },
                    cursor: "pointer",
                  }}
                  onClick={handleUnregister}
                  color={"white"}
                >
                  C'regjistro semestrin
                </Box>
              </Box>
                </>
              )}
              {notification && ( 
                <CreatedNotifications message={notification} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={8}>
        <Grid item xs={12} md={12}>
          <Box
            p={2}
            textAlign={"center"}
            fontSize={"20px"}
            bgcolor={colors.primary[400]}
            borderRadius={3}
          >
            <Box p={2} borderBottom={"1px solid " + colors.gray[600]}>
              Lista e regjistrimeve të semestrave
            </Box>
            <TableSemestrat token={token} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegjistroSemestrin;
