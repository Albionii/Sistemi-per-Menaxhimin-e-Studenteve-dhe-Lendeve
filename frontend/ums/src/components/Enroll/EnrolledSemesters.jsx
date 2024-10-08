import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import SchoolIcon from "@mui/icons-material/School";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";

const SemestriItem = ({ semester, startDate, endDate, semestriId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/enrolled/ligjeratat/${semestriId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  return (
    <Grid item xs={12} sm={6} md={6} onClick={handleClick}>
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
          justifyContent="space-between"
          alignItems="center"
          color="#fff"
        >
          <Box width={"45%"}>
            <Typography
              color={colors.gray[100]}
              ml={1}
              variant="h2"
              fontWeight={"bold"}
            >
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
                mt={1}
              >
                <Typography color={colors.gray[100]}>
                  Data e perfundimit:
                </Typography>
                <Box p={2} bgcolor={colors.greenAccent[600]} borderRadius={3}>
                  <Typography>{formatDate(endDate)}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width={"50%"}>
            <Typography variant="h4" color={colors.gray[100]}>
              Provimet e kaluara:
            </Typography>
            <Box
              p={2}
              borderRadius={3}
              style={{ backgroundColor: colors.primary[500] }}
              mt={2}
            >
              <Typography
                variant="h1"
                fontWeight={"bold"}
                color={colors.gray[100]}
              >
                6/6
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
              }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <SchoolIcon sx={{ mr: 1, fontSize: "25px" }} />
                <Typography variant="h4" fontWeight={"bold"}>
                  Ligjeratat
                </Typography>
              </Box>
              <Box
                p={1}
                sx={{
                  background: "lightgray",
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

const EnrolledSemesters = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [semestrat, setSemestrat] = useState([]);
  const { departamentiId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/student/semesters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setSemestrat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the semester " + error);
      });
  }, []);

  return (
    <Box m={3}>
      <Box mt={4}>
        <Box
          borderBottom={`2px solid ${colors.gray[300]}`}
          width="100%"
          mt={2}
        />

        {semestrat.length === 0 ? (
          <Typography variant="h4" align="center" pt="40vh">
            You need to Register a semester to have access to your enrollments!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {semestrat.map((semestri) => (
              <SemestriItem
                key={semestri.semester.id}
                semester={semestri.semester.name}
                startDate={semestri.semester.startDate}
                endDate={semestri.semester.endDate}
                semestriId={semestri.semester.id}
              />
            ))}
          </Grid>
        )}

      </Box>
    </Box>
  );
};

export default EnrolledSemesters;
