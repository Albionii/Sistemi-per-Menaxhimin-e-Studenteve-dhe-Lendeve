import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
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
  professorId,
  loading,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/postimi", {
      state: { imageUrl, name, professor, id, isEnrolled, professorId },
    });
  };

  const handleEnroll = () => {
    enroll(id);
  };

  const handleUnEnroll = () => {
    unEnroll(id);
  };

  const isEnrolled = enrollData.some((course) => course.ligjerata.id === id);

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
            backgroundImage: `url(${imageUrl})`,
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
            overflow: "hidden",
          }}
        >
          <Box sx={{ width: "70%" }}>
            <Typography
              sx={{
                fontSize: { xs: "h4.fontSize", md: "h3.fontSize" },
                fontWeight: "bold",
                marginBottom: "0.5rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {professor}
            </Typography>
          </Box>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {isEnrolled ? (
                <Button
                  sx={{
                    position: "relative",
                    background: colors.redAccent[500],
                    color: "#fff",
                    "&:hover": { background: colors.redAccent[700] },
                    padding: "15px 30px",
                    zIndex: "5",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUnEnroll();
                  }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleEnroll();
                  }}
                >
                  Enroll
                </Button>
              )}
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Modified getRandomImage function to get consistent images
const getRandomImage = (index) => {
  return `https://picsum.photos/seed/${index+1}/1080/720`;
};

const EnrolledLigjerata = ({ token }) => {
  const [ligjerataData, setLigjerataData] = useState([]);
  const { semestriId } = useParams();
  const [enrolledData, setEnrolledData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLigjeratat = () => {
    axios
      .get(`http://localhost:8080/api/student/get/enrolled/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLigjerataData(response.data);
        getEnroll();
      })
      .catch((error) => {
        console.error("Error fetching the ligjerata: " + error);
      });
  };

  const getEnroll = () => {
    axios
      .get(`http://localhost:8080/api/student/get/enrollments/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEnrolledData(response.data);
        setLoading(false);
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
  }, []);

  return (
    <>
      <Box m={"40px"}>
        <Box
          sx={{ flexGrow: 1, paddingBottom: 5 }}
          overflow="auto"
          display="flex"
          justifyContent="center"
        >
          {ligjerataData.length === 0 ? (
            <Typography variant="h4" align="center" pt="35vh">
              You have not enrolled in any courses for this Semester!
            </Typography>
          ) : (
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              {ligjerataData.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={course.id} sx={{ padding: "16px" }}>
                  <CourseCard
                    name={course.lenda.emri}
                    professor={
                      course.professor.user.firstName +
                      " " +
                      course.professor.user.lastName
                    }
                    imageUrl={getRandomImage(index)}
                    id={course.id}
                    enroll={enroll}
                    unEnroll={unEnroll}
                    enrollData={enrolledData}
                    professorId={course.professor.user.id}
                    loading={loading}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EnrolledLigjerata;
