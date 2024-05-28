import React from "react";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { tokens } from "../theme";
import SchoolIcon from "@mui/icons-material/School";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GroupsIcon from "@mui/icons-material/Groups";

const CrudCategories = ({roli}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderCategory = (
    title,
    labels,
    links,
    color,
    outlinecolor,
    IconComponent
  ) => (
    <Box mt={4}>
      <Typography variant="h2">{title}</Typography>
      <Box borderBottom={`2px solid ${colors.gray[300]}`} width="100%" mt={2} />
      <Grid container spacing={3}>
        {links.map((link, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Link to={link} style={{ textDecoration: "none", width: "100%" }}>
              <Box
                bgcolor={color}
                p={4}
                textAlign="center"
                borderRadius={5}
                mt={3}
                border={outlinecolor + " 1.5px solid"}
                sx={{
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: outlinecolor,
                  },
                }}
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.2)"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="#fff"
                >
                  <IconComponent sx={{ fontSize: 28 }} />
                  <Typography ml={1}>{labels[index]}</Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
   //KODI PER CONDITIONAL RENDERIN TE CRUDAVE E IMPLEMENTOJM MA VON MASI TE KRYHET KREJT 

  // function getByRole() {
  //   const roli = JSON.stringify(role.role).replaceAll("\"",''); 
  //   if (roli === "ROLE_STUDENT") {
  //      return renderCategory(
  //       "Student",
  //       ["Paraqitni Provimin", "Student 2", "Student 3", "Student 4"],
  //       ["/provimet", "/student2", "/student3", "/student4"],
  //       "#EC6601",
  //       "#bf5200",

  //       GroupsIcon
  //     );
  //   }
  //   if(roli === "ROLE_PROFESSOR"){
  //     return renderCategory(
  //       "Profesori",
  //       [
  //         "Profesori 1",
  //         "Profesori 2",
  //         "Profesori 3",
  //         "Profesori 4",
  //         "Profesori 5",
  //         "Profesori 6",
  //         "Profesori 7",
  //       ],
  //       [
  //         "/Ligjeratat",
  //         "/profesori2",
  //         "/profesori3",
  //         "/profesori4",
  //         "/profesori5",
  //         "/profesori6",
  //         "/profesori7",
  //       ],
  //       "#D40E14",
  //       "#ab0c11",
  //       SchoolIcon
  //     )
  //   }
  //   if(roli === "ROLE_ADMIN"){
  //     return renderCategory(
  //       "Administrator",
  //       ["Ligjeratat", "Provimet", "Profesoret", "Studentet", "Lëndet", "Departamenti", "Fakulteti", "UserRoles"],
  //       ["/profesorLenda", "/provimi", "/profesoret", "/studentet", "/lendet", "/DepartamentiCrud", "/FakultetiCrud", "/userRole"],
  //       "#004F95",
  //       "#00396b",
  //       SupervisorAccountIcon
  //     )

  //   }
  // }

  return (
    <Box m={3}>
      <Header title="CRUDS" subtitle="Manage Cruds" />
      <Box m={4}>
        {renderCategory(
          "Profesori",
          [
            "Notimi Studenteve",
            "Profesori 2",
            "Profesori 3",
            "Profesori 4",
            "Profesori 5",
            "Profesori 6",
            "Profesori 7",
          ],
          [
            "/notoStudentin",
            "/profesori2",
            "/profesori3",
            "/profesori4",
            "/profesori5",
            "/profesori6",
            "/profesori7",
          ],
          "#D40E14",
          "#ab0c11",
          SchoolIcon
        )}
        {renderCategory(
          "Student",
          ["Paraqitni Provimin", "Student 2", "Student 3", "Student 4"],
          ["/provimet", "/student2", "/student3", "/student4"],
          "#EC6601",
          "#bf5200",

          GroupsIcon
        )}
        {renderCategory(
          "Administrator",
          ["Ligjeratat", "Provimet", "Profesoret", "Studentet", "Lëndet","Departamenti","Fakulteti","UserRoles", "Semestri"],
          ["/profesorLenda", "/provimi", "/profesoret", "/studentet", "/lendet","/DepartamentiCrud","/FakultetiCrud","/userRole", "/semestri"],
          "#004F95",
          "#00396b",
          SupervisorAccountIcon
        )}
        
    
      </Box>
    </Box>
  );
};

export default CrudCategories;
