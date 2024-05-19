import React from "react";
import { useTheme } from "@mui/system"; // Changed import
import { tokens } from "../theme";
import { Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

// Function to generate random image URL
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  return `https://source.unsplash.com/random/1080x720?sig=${randomIndex}`;
};

const CourseCard = ({ name, professor, imageUrl }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "8px",
        background: colors.primary[600],
      }}
    >
      <CardActionArea component={Link} to={'/postimi'}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
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
          <Button
            sx={{
              background: colors.blueAccent[600],
              color: "#fff",
              "&:hover": { background: colors.blueAccent[700] },
              padding: '15px 30px'
            }}
            component={Link}
            to={name}
          >
            Enroll
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ligjeratat = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const name = "matematika";
  const courses = Array.from(Array(9)).map((_, index) => ({
    name: "Matematik",
    professor: "Ragip Profesori",
    imageUrl: getRandomImage(),
    key: index,
  }));

  return (
    <>
      <Box m={"40px"}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: "16px", mb: "20px" }}
          >
            <Link to="/">Shkenca Kompjuterike</Link>
            <Link to={"/"}>Semestri 2</Link>
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
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.key}>
                <CourseCard
                  name={course.name}
                  professor={course.professor}
                  imageUrl={course.imageUrl}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ligjeratat;
