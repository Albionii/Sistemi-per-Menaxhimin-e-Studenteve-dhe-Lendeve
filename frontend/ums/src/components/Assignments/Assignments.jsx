import React from "react";
import Assignment from "./Assignment";
import { Grid, Box, IconButton, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Routes, Route, useNavigate } from "react-router-dom";

const Assignments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedAssignment, setSelectedAssignment] = React.useState(false);
  const Navigate = useNavigate();

  const handleSelected = () => {
    setSelectedAssignment(!selectedAssignment);
  };

  const goBack = () => {
    setSelectedAssignment(false);
    Navigate(-1);
  };

  console.log("Assignment" + selectedAssignment);
  return (
    <Box>
      {selectedAssignment === false && (
        <Box sx={{ width: "100%" }}>
          <Grid container>
            {Array.from(Array(9)).map((_, index) => (
              <Grid item xs={4} key={index}>
                <Link to="assignment" onClick={handleSelected}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: colors.gray[700], // Change the color on hover
                      },
                      border: "1px solid",
                    }}
                  >
                    <AssignmentIcon sx={{ width: "30%", height: "auto" }} />
                    <Typography>Assignmnet</Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {selectedAssignment === true && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton variant="contained" color="secondary" onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          {/* <Routes>
            <Route path="assignment" element={<Assignment />} />
          </Routes> */}
          <Assignment />
        </Box>
      )}
    </Box>
  );
};

export default Assignments;

