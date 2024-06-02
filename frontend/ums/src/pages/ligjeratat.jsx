import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import { Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CourseCard = ({
  name,
  professor,
  imageUrl,
  id,
  enroll,
  unEnroll,
  enrollData,
  index
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const fixedBackgroundColors = [
    '#FF204E', '#A0153E', '#5D0E41', '#00224D', '#6FDCE3',
    '#FFA07A', '#20B2AA', '#87CEFA', '#778899'
  ];

  const handleClick = () => {
    navigate("/postimi", { state: { imageUrl, name, professor, id } });
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    enroll(id);
  };

  const handleUnEnroll = (e) => {
    e.stopPropagation();
    unEnroll(id);
  };

  const background = fixedBackgroundColors[index % fixedBackgroundColors.length];

  const isEnrolled = enrollData && enrollData.some((course) => course.ligjerata && course.ligjerata.id === id);

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "8px",
        background: colors.primary[600],
        zIndex: 20,
      }}
    >
      <CardActionArea
        onClick={(e) => {
          if (e.target.tagName !== "BUTTON") {
            handleClick();
          }
        }}
      >
        <CardMedia
          component="div"
          sx={{
            height: 200,
            background: background,
            backgroundSize: "cover",
            zIndex: 21,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "h4.fontSize", md: "h3.fontSize" },
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {professor}
            </Typography>
          </Box>

          {isEnrolled ? (
            <Button
              sx={{
                position: "relative",
                background: 'red',
                color: "#fff",
                "&:hover": { background: colors.redAccent[700] },
                padding: "15px 30px",
                zIndex: "50",
              }}
              onClick={handleUnEnroll}
            >
              UnEnroll
            </Button>
          ) : (
            <Button
              sx={{
                position: "relative",
                background: colors.blueAccent[600],
                color: "#fff",
                "&:hover": { background: colors.blueAccent[700] },
                padding: "15px 30px",
                zIndex: "50",
              }}
              onClick={handleEnroll}
            >
              Enroll
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Ligjeratat = ({ token }) => {
  const [ligjerataData, setLigjerataData] = useState([]);
  const { semestriId } = useParams();
  const [enrolledData, setEnrolledData] = useState([]);

  const getLigjeratat = () => {
    axios
      .get(`http://localhost:8080/professorLenda/semester/${semestriId}`)
      .then((response) => {
        setLigjerataData(response.data);
        getEnroll();
      })
      .catch((error) => {
        console.error("Error fetching the ligjerata: " + error);
      });
  };

  const getEnroll = () => {
    axios
      .get(`http://localhost:8080/api/student/get/enrollments/${semestriId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEnrolledData(response.data);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  const enroll = (id) => {
    axios
      .post(`http://localhost:8080/api/student/enroll/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getEnroll();
      })
      .catch((error) => {
        console.error("Error:" + error);
      });
  };

  const unEnroll = (id) => {
    axios
      .delete(`http://localhost:8080/api/student/unenroll/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getLigjeratat();
        getEnroll();
      })
      .catch((error) => {
        console.error("Error:" + error);
      });
  };

  useEffect(() => {
    getLigjeratat();
  }, [semestriId]);

  return (
    <>
      <Box m={"40px"}>
        <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: "16px", mb: "20px" }}
          >
            <Link to="/department">Shkenca Kompjuterike</Link>
            <Link to={`/semesters/${semestriId}`}>Semestri 2</Link>
            <Link to={"/"}>Ligjeratat</Link>
          </Breadcrumbs>
        </div>
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
            {ligjerataData.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard
                  name={course.lenda.emri}
                  professor={
                    course.professor.user.firstName +
                    " " +
                    course.professor.user.lastName
                  } 
                  id={course.id}
                  enroll={enroll}
                  unEnroll={unEnroll}
                  enrollData={enrolledData}
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

export default Ligjeratat;
