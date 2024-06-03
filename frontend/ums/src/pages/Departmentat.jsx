import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import { Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const fixedBackgroundColors = [
  '#FFB6C1', '#FFD700', '#ADD8E6', '#90EE90', '#FF69B4',
  '#FFA07A', '#20B2AA', '#87CEFA', '#778899'
];

const CourseCard = ({ name, departamentiId, index }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const backgroundColor = fixedBackgroundColors[index % fixedBackgroundColors.length];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/semesters/${departamentiId}`)
  }

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "8px",
        background: colors.primary[600],
      }}
      onClick={handleClick}
    >
      <CardActionArea component={Link} to={`/semesters/${departamentiId}`}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            background: backgroundColor,
            backgroundSize: "cover",
          }}
        />
        <CardContent
          sx={{
            padding: "20px",
            paddingTop: '30px',
            paddingBottom: '30px'
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "h4.fontSize", md: "h3.fontSize" },
                fontWeight: "bold",
              }}
            >
              {name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Departmentat = () => {
  const [departmentet, setDepartmentet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/departamenti")
      .then((response) => {
        setDepartmentet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the departments: " + error);
      });
  }, []);

  return (
    <>
      <Box m={"40px"}>
        <Header title="DEPARTMENTET" subtitle="Lista e departmenteve" />
        <Box
          sx={{ flexGrow: 1, paddingBottom: 5 }}
          overflow="auto"
          display="flex"
          justifyContent="center"
        >
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {departmentet.map((department, index) => (
              <Grid item xs={12} sm={6} md={4} key={department.key}>
                <CourseCard
                  key={department.id}
                  name={department.emri}
                  departamentiId={department.id}
                  index={index} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Departmentat;
