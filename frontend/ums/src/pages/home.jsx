import React from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import Table from "../components/Table";
import PieChart from "../components/charts/Piechart";
import Calendar from "../components/Calendar";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="153px"
        gap="20px"
      >
        {/* ROW 1*/}
        <Box
          gridColumn="span 12"
          backgroundColor={colors.blueAccent[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          textAlign={"center"}
          padding={"0 175px 0 175px"}
        >
          <h1>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollet anim id est laborum."
          </h1>
        </Box>
        {/* ROW 2 */}
        <Box
          onClick
          gridColumn={"span 5"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Table />
        </Box>
        <Box
          gridColumn={"span 3"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Nota mesatare:</Typography>
              </Box>
              <Typography variant="h5" padding={'16px'}>9.2</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">ECTS:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>96</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Box bgcolor={colors.primary[600]} padding={"15px"}>
                <Typography variant="h4">Semestri:</Typography>
              </Box>
              <Typography variant="h5" padding={"16px"}>2</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          borderRadius={"7px"}
        >
          <Typography variant="h4" pt={"10px"} pl={"10px"}>
            Notat tuaja:
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            minWidth={"350px"}
          >
            <PieChart />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={"span 5"}
          gridRow={"span 2"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"7px"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexWrap="wrap"
            width={"90%"}
          >
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="success"
              style={{
                padding: "50px",
                margin: "15px",
                color: "white",
                background: "#D40E14",
              }}
            >
              Gjenero Transkripten
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              style={{
                padding: "50px",
                margin: "15px",
                color: "white",
                background: "#EC6601",
              }}
            >
              Gjenero Transkripten
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="primary"
              style={{
                padding: "50px",
                margin: "15px",
                color: "white",
                background: "#004F95",
              }}
            >
              Gjenero Transkripten
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="secondary"
              style={{
                padding: "50px",
                margin: "15px",
                color: "white",
                background: "#B70E77",
              }}
            >
              Gjenero Transkripten
            </Button>
          </Box>
        </Box>
        <Box
          gridColumn={"span 7"}
          gridRow={"span 2"}
          borderRadius={"7px"}
          padding={"15px 40px 15px 40px"}
          backgroundColor={colors.primary[400]}
        >
          <Calendar/>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
