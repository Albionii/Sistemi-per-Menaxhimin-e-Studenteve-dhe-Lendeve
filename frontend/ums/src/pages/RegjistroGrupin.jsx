import { Box, Typography, Grid, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TabelaOrarit from "../components/TabelaOrarit";
import axios from "axios";

const RegjistroGrupin = () => {
  const [grupi, setGrupi] = useState(null);
  const [grupet, setGrupet] = useState([]);
  const [orari, setOrari] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios
      .get("http://localhost:8080/grupi")
      .then((response) => {
        console.log("Response data:", response.data);
        setGrupet(response.data);
      })
      .catch((error) => console.error("Error fetching groups", error));
  }, []);

  const handleChange = (event) => {
    const selectedGroupId = event.target.value;
    setGrupi(selectedGroupId);

    axios
        .get(`http://localhost:8080/orariLigjerata/${selectedGroupId}`)
        .then((response) => {
            console.log("Response data:", response.data);
            setOrari(response.data);
        })
        .catch((error) => {
            console.error("Error fetching orari:", error);
            // Handle error: You can display an error message to the user or perform other actions as needed
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
              <Box
                p={2}
                bgcolor={colors.greenAccent[500]}
                borderRadius={3}
                textAlign={"center"}
                fontSize={"17px"}
                color={"white"}
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
                          {grupi.emri}
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
                  }}
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
          <Box
            p={2}
            textAlign={"center"}
            fontSize={"20px"}
            bgcolor={colors.primary[400]}
            borderRadius={3}
          >
            <Box p={2} borderBottom={"1px solid " + colors.gray[600]}>
              Orari im: G1 {grupi ? `G${grupi}` : "Select a group"}
            </Box>
            <TabelaOrarit orari={orari} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegjistroGrupin;
