import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import SchoolIcon from "@mui/icons-material/School";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";

const SemestriItem = ({ semester, startDate, endDate, semestriId, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallOrExtraSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [provimet, setProvimet] = useState(0);
  const [lendet, setLendet] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/student/totalProvimet/${semestriId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setProvimet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the total Provimet " + error);
      });
  }, [semestriId, token]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/professorLenda/lendet/${semestriId}`)
      .then((response) => {
        console.log(response.data);
        setLendet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the total Provimet " + error);
      });
  }, [semestriId]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ligjeratat/${semestriId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} onClick={handleClick}>
      <Box
        bgcolor={colors.primary[400]}
        p={2}
        textAlign="center"
        borderRadius={5}
        mt={3}
        boxShadow="0px 2px 3px rgba(0, 0, 0, 0.2)"
      >
        <Box
          paddingLeft={2}
          paddingRight={2}
          display="flex"
          flexDirection={isSmallOrExtraSmallScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          color="#fff"
        >
          <Box width={isSmallOrExtraSmallScreen ? "100%" : "45%"} mb={isSmallOrExtraSmallScreen ? 2 : 0}>
            <Typography color={colors.gray[100]} ml={1} variant="h2" fontWeight={"bold"}>
              {semester}
            </Typography>
            <Box
              mt={2}
              borderRadius={3}
              padding={2}
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={isSmallOrExtraSmallScreen ? "column" : "row"}
                mb={isSmallOrExtraSmallScreen ? 1 : 2}
              >
                <Typography color={colors.gray[100]}>Data e nisjes:</Typography>
                <Box p={2} bgcolor={colors.greenAccent[600]} borderRadius={3}>
                  <Typography>{formatDate(startDate)}</Typography>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={isSmallOrExtraSmallScreen ? "column" : "row"}
              >
                <Typography color={colors.gray[100]}>Data e perfundimit:</Typography>
                <Box p={2} bgcolor={colors.greenAccent[600]} borderRadius={3}>
                  <Typography>{formatDate(endDate)}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width={isSmallOrExtraSmallScreen ? "100%" : "50%"}>
            <Typography variant="h4" color={colors.gray[100]}>Provimet e kaluara:</Typography>
            <Box
              p={2}
              borderRadius={3}
              style={{ backgroundColor: colors.primary[500] }}
              mt={2}
            >
              <Typography variant="h1" fontWeight={"bold"} color={colors.gray[100]}>
                {provimet}/{lendet}
              </Typography>
            </Box>
            <Box
              mt={2}
              display={"flex"}
              justifyContent={"space-around"}
              p={2}
              borderRadius={3}
              alignItems="center"
              bgcolor={colors.blueAccent[600]}
              sx={{
                "&:hover": {
                  backgroundColor: colors.blueAccent[400],
                },
                cursor: 'pointer'
              }}
            >
              <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
                <SchoolIcon sx={{ mr: 1, fontSize: "25px" }} />
                <Typography variant="h4" fontWeight={"bold"}>
                  Ligjeratat
                </Typography>
              </Box>
              <Box
                p={1}
                sx={{
                  background: 'lightgray',
                  borderRadius: 5,
                  color: colors.blueAccent[600],
                }}
              >
                <EastIcon sx={{ fontSize: "25px" }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const Semestrat = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [semestrat, setSemestrat] = useState([]);
  const { departamentiId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/semester/${departamentiId}`)
      .then((response) => {
        console.log(response.data);
        setSemestrat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the semester " + error);
      });
  }, [departamentiId]);

  return (
    <Box m={3}>
      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ fontSize: "16px", mb: "20px" }}
        >
          <Link to="/department">Shkenca Kompjuterike </Link>
          <Link to="/department">Semestrat </Link>
        </Breadcrumbs>
      </div>
      <Box mt={4}>
        <Typography variant="h2">Viti i I-re</Typography>
        <Box
          borderBottom={`2px solid ${colors.gray[300]}`}
          width="100%"
          mt={2}
        />
        <Grid container spacing={3}
        sx={{
          "@media (max-width: 1350px)": {
            gridColumn: "span 12",
          },
          "@media (max-width: 1000px)": {
            gridColumn: "span 12",
          },
        }}>
          {semestrat.map((semestri) => (
            <SemestriItem
              key={semestri.id}
              semester={semestri.name}
              startDate={semestri.startDate}
              endDate={semestri.endDate}
              semestriId={semestri.id}
              token={token}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Semestrat;
