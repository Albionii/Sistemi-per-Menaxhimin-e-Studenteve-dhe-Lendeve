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

const Provimet = ({ token }) => {
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
    try{

    }catch(error){
      console.log(error)
    }
  }

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
            sx={{ height: "400px", borderRadius: "20px", padding:"10px", overflowX:"auto", overflowY:"auto", background: colors.primary[600]}}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{textAlign: 'center'}}>Lenda</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Profesori</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Data</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>ECTS</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Operation</TableCell>
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
            sx={{ height: "400px", borderRadius: "20px", padding: "10px", overflowX:"auto", overflowY:"auto", background: colors.primary[600]}}
          >
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell sx={{textAlign: 'center'}}>Lenda</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Profesori</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Data Paraqitjes</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Nota</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Operation</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Refuzo</TableCell>
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

  const handleDropdownItemClick = (provimiId, emri, mbiemri) => {
    setSelectedProvimiId(provimiId);
    setPlaceholder(`${emri} ${mbiemri}`);
  };

  return (
    <TableRow>
      <TableCell sx={{textAlign: 'center'}}>{provimi.emriLendes}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>
        <Dropdown label={placeholder}>
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
              <Typography >
              {item.ligjerata.professor.user.firstName}{" "}
              {item.ligjerata.professor.user.lastName}
              </Typography>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </TableCell>
      <TableCell sx={{textAlign: 'center'}}>{provimi.provimet[0]?.data}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{provimi.provimet[0]?.ligjerata.lenda.ects}</TableCell>
      <TableCell >
        <Button
          disabled={selectedProvimiId === null}
          onClick={() => {
            paraqitProvimin(selectedProvimiId);
            setSelectedProvimiId(null);
            setPlaceholder("Zgjidh Provimin");
          }}
        >
          <Typography>Paraqit Provimin</Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
};

const PaRow = ({ item, anuloParaqitjen }) => {
  return (
    <TableRow>
      {console.log(item)}
      <TableCell sx={{textAlign: 'center'}}>{item.emriLendes}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>
        {item.provimi.ligjerata.professor.user.firstName}{" "}
        {item.provimi.ligjerata.professor.user.lastName}
      </TableCell>
      <TableCell sx={{textAlign: 'center'}}>{ dayjs(item.dataParaqitjes).format('YYYY-MM-DD/HH:mm:ss') || "null"}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{item.nota === 0 ? " " : item.nota}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>
        <Button onClick={() => anuloParaqitjen(item.id)}>
          Anulo Paraqitjen
        </Button>
      </TableCell>
      <TableCell>
        <Button disabled={item.nota === 0 || item.nota === 5 || item.nota === 10} onClick={() => refuzoNoten(item.id)}>
          Refuzo Noten
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Provimet;
