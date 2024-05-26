import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import { Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Header from "../components/Header";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

// Function to generate random image URL
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  return `https://source.unsplash.com/random/1080x720?sig=${randomIndex}`;
};

const names = [
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20",
  "2018/19",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CourseCard = ({ name, imageUrl, departamentiId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [personName, setPersonName] = React.useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/semesters/${departamentiId}`)
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "8px",
        background: colors.primary[600],
      }}
      onClick={handleClick}
    >
      <CardActionArea component={Link} to={"/semestrat"}>
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
              }}
            >
              {name}
            </Typography>
          </Box>

          <FormControl sx={{ m: 1, width: 150, background: colors.primary[600] }}>
            <InputLabel id="demo-multiple-name-label" sx={{color: colors.gray[300]}}>Viti Akademik</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Viti Akademik" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  sx={{background: colors.primary[600]}}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Departmentat = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  // const departmentat = Array.from(Array(9)).map((_, index) => ({
  //   name: "Shkenca Kompjuterike",
  //   imageUrl: getRandomImage(),
  //   key: index,
  // }));

  const [departmentet, setDepartmentet] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:8080/departamenti")
      .then((response)=>{
        console.log(response.data)
        setDepartmentet(response.data)
    })
    .catch(error => {
      console.error("Error fetchin the departments: "+error);
    })
  }, [])

  return (
    <>
      <Box m={"40px"}>
        <Header title="DEPARTMENTET" subtitle={'Lista e departmenteve'}></Header>
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
            {departmentet.map((department) => (
              <Grid item xs={12} sm={6} md={4} key={department.key}>
                <CourseCard
                  key={department.id}
                  name={department.emri}
                  imageUrl={getRandomImage()}
                  departamentiId={department.id}
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
