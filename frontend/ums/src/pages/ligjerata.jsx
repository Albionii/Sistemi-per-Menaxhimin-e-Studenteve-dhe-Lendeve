import React from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Box, Icon, Typography } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import Postimet from "../components/Postimi/Postimet";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Routes, Route } from "react-router-dom";
import Materiali from "../components/Materiali/Materiali";
import Assignments from "../components/Assignments/Assignments";

const ligjerata = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeLink, setActiveLink] = useState(false);
  const Navigate = useNavigate();

  const handleNavLinkClick = () => {
    setActiveLink(!activeLink);

  };
  const goBack = () => {
    setActiveLink(false);
    Navigate(-1);

  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingTop: "10px",
          height: "100vh",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          margin: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            width: "80vw",
            height: "20vh",
            border: "2px solid",
            borderRadius: "20px",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "30vh",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                position: "absolute",
                bottom: 20,
                left: 20,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: colors.redAccent[400],
                    width: { xs: 50, sm: 80, sl: 100 },
                    height: { xs: 50, sm: 80, sl: 100 },
                  }}
                  src="foto.jpg"
                />
                <Box>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: 18, sm: 30 } }}
                  >
                    Matematik
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: 12, sm: 14 } }}
                    color="text.secondary"
                  >
                    Ragip Profesori
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Fab
                  variant="extended"
                  sx={{
                    backgroundColor: colors.redAccent[500],
                    "&:hover": {
                      backgroundColor: colors.redAccent[700], // Change the color on hover
                    },
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      padding: "3px",
                      fontSize: { xs: 10, sm: 15 },
                      color: "white",
                    }}
                  >
                    UnEnroll
                  </Typography>
                </Fab>
              </Box>
            </Box>
          </Box>
        </Box>
        {activeLink === true && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "90%",
              maxHeight: "100px",
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              onClick={goBack}
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          </Box>
        )}

        {activeLink === false && (
          <Box
            sx={{
              height: "50%",
              width: { sm: "80vw", xs: "100vw" },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-around ",
              gap: "30px",
              height: "60vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                width: "30%",
                height: "100%",
                gap: "30px",
              }}
            >
              <Link to="materiali">
                <Button
                  sx={{ width: "100%" }}
                  onClick={handleNavLinkClick}
                  variant="contained"
                  color="secondary"
                >
                  Shiko Materialin
                </Button>
              </Link>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  bgcolor: [colors.primary[700]],
                  borderRadius: "10px",
                }}
              >
                <Box sx={{width:"100%", height:"100%", }}>
                  <Assignments />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                height: "100%",
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    padding: "10px",
                    height: "100%",
                    overflowY: "auto",
                  }}
                >
                  <Postimet />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {activeLink === true && (
          <Box
            sx={{
              width: "80vw",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <Routes>
              <Route path="materiali" element={<Materiali />}></Route>
            </Routes>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ligjerata;


