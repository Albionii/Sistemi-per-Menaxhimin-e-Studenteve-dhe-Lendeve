import { Box, Typography, Grid, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableSemestrat from "../components/TableSemestrat";
import axios from "axios"; // Import axios
import { getFromCookies } from "../getUserFromJWT";


const RegjistroSemestrin = () => {
  const [lokacioni, setLokacioni] = useState("");
  const [semester, setSemester] = useState({});
  const [nderrimiOrarit, setOrari] = useState("");
  const [semestriList, setSemestriList] = useState([]); // Use an array for semestri list
  const [semestrat, setSemestrat] = useState([]);
  const [userData, setUserData] = useState(null); // Use an array for semestrat

  getFromCookies({setUserData});

  console.log(userData);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  


  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const token = getCookieValue('Token');
        const response = await axios.get(`http://localhost:8080/student/semesters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSemestrat(response.data);
      } catch (error) {
        console.error("There was an error fetching the semesters!", error);
      }
    };

    fetchSemesters();
  }, [userData]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/semesters")
      .then(response => {
        setSemestriList(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the semesters!", error);
      });
  }, []);

  const handleLokacioniChange = (event) => {
    setLokacioni(event.target.value);
  };

  const handleSemestriChange = (event) => {
    setSemester(event.target.value); // Updated with the value from the select component
  };

  const handleOrariChange = (event) => {
    setOrari(event.target.value); // Updated with the value from the select component
  };

  const handleSubmit = () => {
    const token = getCookieValue('Token');
    const newSemester = { lokacioni, nderrimiOrarit, semester };
    console.log(newSemester); 
    console.log(semester);
    axios.post("http://localhost:8080/api/user/semester/register", newSemester, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the Authorization header
        'Content-Type': 'application/json' // Set content type to JSON
      }
    })
    .then(response => {
      setSemestrat([...semestrat, response.data]); // Update state with new semester
    })
    .catch(error => {
      console.error("There was an error registering the semester!", error);
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
            alignItems={'center'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Box>
              <Typography mb={{ xs: 12, sm: 6, md: 5 }} mt={{ xs: 12, md: 0, sm: 6 }} variant="h4" textAlign={'center'}>
                Afati per regjistrimin e semestrit eshte i hapur me datat:{" "}
              </Typography>
              <Box
                p={2}
                bgcolor={colors.greenAccent[500]}
                borderRadius={3}
                textAlign={'center'}
                fontSize={'17px'}
                color={'white'}
              >
                15/05/2024-28/05/2024
              </Box>
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
            <Box width={{ md: "50%", sm: '65%', sx: '75%' }}>
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
                    <MenuItem value="Prishtine" sx={{ background: colors.primary[500] }}>Prishtine</MenuItem>
                    <MenuItem value="Therande" sx={{ background: colors.primary[500] }}>Therande</MenuItem>
                    <MenuItem value="Prizren" sx={{ background: colors.primary[500] }}>Prizren</MenuItem>
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
                    label="Semestri"
                    onChange={handleSemestriChange}
                  >
                    {semestriList.map(semester => (
                      <MenuItem key={semester.id} value={semester} sx={{ background: colors.primary[500] }}>
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
                    <MenuItem value='Paradite' sx={{ background: colors.primary[500] }}>Paradite</MenuItem>
                    <MenuItem value='Pasdite' sx={{ background: colors.primary[500] }}>Pasdite</MenuItem>
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
                  onClick={handleSubmit} // Add onClick to handle submit
                >
                  Ruaj Ndryshimet
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={8}>
        <Grid item xs={12} md={12}>
          <Box p={2} textAlign={'center'} fontSize={'20px'} bgcolor={colors.primary[400]} borderRadius={3}>
            <Box p={2} borderBottom={'1px solid ' + colors.gray[600]}>
              Lista e regjistrimeve të semestrave
            </Box>
            <TableSemestrat semestrat={semestrat} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegjistroSemestrin;
