import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "flowbite-react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Paraqitura = ({ token }) => {
  const [provimet, setProvimet] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchProvimet();
  }, []);

  const fetchProvimet = () => {
    axios
      .get("http://localhost:8080/student", config)
      .then((response) => {
        setProvimet(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const anuloParaqitjen = (id) => {
    axios
      .delete(`http://localhost:8080/student/anulo/${id}`, config)
      .then((response) => {
        fetchProvimet();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: colors.primary[500] }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Lenda</TableCell>
            <TableCell>Profesori</TableCell>
            <TableCell>Data Paraqitjes</TableCell>
            <TableCell>Nota</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {provimet.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.emriLendes}</TableCell>
              <TableCell>
                {item.provimi.ligjerata.professor.user.firstName}{" "}
                {item.provimi.ligjerata.professor.user.lastName}
              </TableCell>
              <TableCell>{item.dataVendosjes || "null"}</TableCell>
              <TableCell>{item.nota === 0 ? " " : item.nota}</TableCell>
              <TableCell>
                <Button onClick={() => anuloParaqitjen(item.id)}>
                  Anulo Paraqitjen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Paraqitura;
