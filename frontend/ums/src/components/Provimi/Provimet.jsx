import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dropdown, Button } from "flowbite-react";
import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { tokens } from "../../theme";
import dayjs from "dayjs";
import { ClassNames } from "@emotion/react";

const Provimet = ({ token }) => {
  console.log("TOKEN " +  JSON.stringify(token));
  const [provimet, setProvimet] = useState([]);
  const [paraqitjet, setParaqitjet] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchProvimet();
    fetchParaqitjet();
  }, []);

  const fetchProvimet = () => {
    axios
      .get("http://localhost:8080/student/get/provimet/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProvimet(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchParaqitjet = () => {
    axios
      .get("http://localhost:8080/student/provimetParaqitura", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParaqitjet(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refuzoNoten = (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const paraqitProvimin = (provimiId) => {
    if (provimiId) {
      axios
        .post(`http://localhost:8080/student/paraqit/${provimiId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          fetchProvimet();
          fetchParaqitjet();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No provimi selected");
    }
  };

  const anuloParaqitjen = (id) => {
    axios
      .delete(`http://localhost:8080/student/anulo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        fetchProvimet();
        fetchParaqitjet();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            padding: "20px",
            flex: "1",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Lista e Provimeve
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "20px",
              padding: "10px",
              overflowX: "auto",
              overflowY: "auto",
              background: colors.primary[600],
              "@media (max-width: 600px)": {
                height: "300px",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Lenda</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Profesori</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Data</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>ECTS</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {provimet.map((provimi, index) => (
                  <TableRou
                    key={index}
                    provimi={provimi}
                    paraqitProvimin={paraqitProvimin}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "20px",
            flex: "1",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Lista e Paraqitjeve
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "20px",
              padding: "10px",
              overflowX: "auto",
              overflowY: "auto",
              background: colors.primary[600],
              "@media (max-width: 600px)": {
                height: "300px",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Lenda</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Profesori</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Data Paraqitjes</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Nota</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Operation</TableCell>
                  <TableCell sx={{textAlign: 'center', borderColor: colors.gray[600]}}>Refuzo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paraqitjet.map((paraqitja, index) => (
                  <PaRow
                    key={index}
                    item={paraqitja}
                    anuloParaqitjen={anuloParaqitjen}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

const TableRou = ({ provimi, paraqitProvimin }) => {
  const [placeholder, setPlaceholder] = useState("Zgjidh Provimin");
  const [selectedProvimiId, setSelectedProvimiId] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDropdownItemClick = (provimiId, emri, mbiemri) => {
    setSelectedProvimiId(provimiId);
    setPlaceholder(`${emri} ${mbiemri}`);
  };

  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>{provimi.emriLendes}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Dropdown
            size="xs"
            label={
              <Typography fontSize={{ xs: "10px", sm: "12px" }}>
                {placeholder}
              </Typography>
            }
          >
            {provimi.provimet.map((item, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() =>
                  handleDropdownItemClick(
                    item.id,
                    item.ligjerata.professor.user.firstName,
                    item.ligjerata.professor.user.lastName
                  )
                }
              >
                <Typography
                  sx={{ fontSize: { xs: "10px", md: "12px" } }}
                >
                  {item.ligjerata.professor.user.firstName}{" "}
                  {item.ligjerata.professor.user.lastName}
                </Typography>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {provimi.provimet[0]?.data}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {provimi.provimet[0]?.ligjerata.lenda.ects}
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="xs"
            disabled={selectedProvimiId === null}
            onClick={() => {
              paraqitProvimin(selectedProvimiId);
              setSelectedProvimiId(null);
              setPlaceholder("Zgjidh Provimin");
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", md: "12px" },
              }}
            >
              Paraqit Provimin
            </Typography>
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const PaRow = ({ item, anuloParaqitjen }) => {
  return (
    <TableRow>
      {console.log(item)}
      <TableCell sx={{ textAlign: "center" }}>{item.emriLendes}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.provimi.ligjerata.professor.user.firstName}{" "}
        {item.provimi.ligjerata.professor.user.lastName}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {dayjs(item.dataParaqitjes).format("YYYY-MM-DD/HH:mm:ss") || "null"}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.nota === 0 ? " " : item.nota}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Box sx={{display:"flex", flexDirection:{sm:"row", xs:"column"}, justifyContent:{sm:"space-around", xs:"space-between"}, gap:"10px"}}>
        <Button size="" onClick={() => anuloParaqitjen(item.id)}>
          <Typography
            sx={{
              fontSize: { xs: "10px",  md: "12px" },
              textAlign:"center",
              paddingTop:"5px"
            }}
          >
            Anulo Paraqitjen
          </Typography>
        </Button>
        <Button
          size="xs"
          disabled={item.nota === 0 || item.nota === 5 || item.nota === 10}
          onClick={() => refuzoNoten(item.id)}
        >
          <Typography
            sx={{
              fontSize: { xs: "10px",  md: "12px" },
              textAlign:"center",
              padding:"2px"
            }}
          >
            Refuzo Noten
          </Typography>
        </Button>
        </Box>
      </TableCell>
  
    </TableRow>
  );
};

export default Provimet;
