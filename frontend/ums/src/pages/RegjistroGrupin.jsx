import { Box, Typography, Grid, useTheme, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TabelaOrarit from "../components/TabelaOrarit";
import axios from "axios";
import CreatedNotifications from "../components/Notifications/CreatedNoftifications";

const RegjistroGrupin = ({ token }) => {
  const [grupi, setGrupi] = useState(null);
  const [grupet, setGrupet] = useState([]);
  const [orari, setOrari] = useState([]);
  const [studentGrupi, setStudentGrupi] = useState(null);
  const [afati, setAfati] = useState([]);
  const [notification, setNotification] = useState("");
  const [exists, setExisting] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios
      .get("http://localhost:8080/grupi", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log("Response data:", response.data);
        setGrupet(response.data);
      })
      .catch((error) => console.error("Error fetching groups", error));
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
      .get("http://localhost:8080/api/student/studentGrupi/exists", {
        headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/student/studentGrupi/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setStudentGrupi(response.data);
          setGrupi(response.data.grupiId);
        }
      })
      .catch((error) => {
        console.error("Error fetching student's group", error);
      });
  }, [token]);

  const handleChange = (event) => {
    const selectedGroupId = event.target.value;
    setGrupi(selectedGroupId);

    axios
      .get(`http://localhost:8080/orariLigjerata/${selectedGroupId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log("Response data:", response.data, selectedGroupId);
        setOrari(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orari:", error);
      });
  };

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/student/studentGrupi/${grupi}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setStudentGrupi(response.data);
        setNotification("Registered Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error registering the group!", error);
      });
  };

  const handleUnregister = () => {
    axios
      .delete(`http://localhost:8080/api/student/studentGrupi`, {
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
        <Grid item xs={12} md={4}>
          <Box
            bgcolor={colors.primary[600]}
            p={{ xs: 2, sm: 3, md: 4 }}
            height={"100%"}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
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
              ) : (
                <Box
                  p={2}
                  mb={5}
                  bgcolor={colors.redAccent[500]}
                  borderRadius={3}
                  textAlign={"center"}
                  fontSize={"17px"}
                  color={"white"}
                >
                  Nuk ka afat te hapur
                </Box>
              )}
              {grupet.length < 0 ? (
                <Box
                  p={2}
                  mb={5}
                  bgcolor={colors.redAccent[500]}
                  borderRadius={3}
                  textAlign={"center"}
                  fontSize={"17px"}
                  color={"white"}
                >
                  Nuk keni regjistruar semestrin
                </Box>
              ) : (
                ""
              )}
              {exists.length > 0 && (
                <Box
                  mt={2}
                  py={4}
                  px={2}
                  bgcolor={colors.greenAccent[600]}
                  textAlign={"center"}
                  fontSize={"16px"}
                  borderRadius={3}
                  color={"white"}
                >
                  Grupi është regjistruar me sukses!
                </Box>
              )}
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
                Regjistrimi i Grupit:
              </Box>
              <Box mt={2} px={2}>
                <Typography variant="h5" mb={2}>
                  Grupi:
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Grupi</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={grupi}
                    label="Grupi"
                    onChange={handleChange}
                  >
                    {grupet.map((grupi) => (
                      <MenuItem
                        key={grupi.id}
                        value={grupi.id}
                        sx={{ background: colors.primary[500] }}
                      >
                        {grupi.emri} - Vende te lira: {grupi.hapesira}
                      </MenuItem>
                    ))}
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
                    cursor: "pointer",
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
                      C'regjistro grupin
                    </Box>
                  </Box>
                </>
              )}
              {notification && <CreatedNotifications message={notification} />}
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
              Orari im:
            </Box>
            <TabelaOrarit orari={orari} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegjistroGrupin;
