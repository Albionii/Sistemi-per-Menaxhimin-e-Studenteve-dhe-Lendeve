import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { Table, Dropdown, Button } from "flowbite-react";

const Provimet = ({token}) => {
  const [provimet, setProvimet] = useState([]);
  const [paraqitjet, setParaqitjet] = useState([]);


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchProvimet();
    fetchParaqitjet();
  }, []);

  const fetchProvimet = () => {


    axios
      .get("http://localhost:8080/student/provimet/", {
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

  const paraqitProvimin = (selectedProvimiId) => {
    if (selectedProvimiId) {
      axios
        .post(
          `http://localhost:8080/student/paraqit/${selectedProvimiId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  const fetchParaqitjet = () => {
    axios
      .get("http://localhost:8080/student", {
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

  const anuloParaqitjen = (id) => {
    axios
      .delete(`http://localhost:8080/student/anulo/${id}`, config)
      .then((response) => {
        fetchParaqitjet();
        fetchProvimet();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <Box sx={{flexGrow:1, display:"flex", justifyContent:"center", width:"100%", height:"100%", overflowX:"auto", padding:"30px"}}>
      <Grid container spacing={12} sx={{display:"flex", width:"100%", justifyContent:"center"}}>
        <Grid item  columns={{ xs:12, md:12}}>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Lenda</Table.HeadCell>
              <Table.HeadCell>Profesori</Table.HeadCell>
              <Table.HeadCell>Data</Table.HeadCell>
              <Table.HeadCell>ECTS</Table.HeadCell>
              <Table.HeadCell>Operation</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {provimet.map((provimi, index) => (
                <TableRow
                  key={index}
                  provimi={provimi}
                  paraqitProvimin={paraqitProvimin}
                />
              ))}
            </Table.Body>
          </Table>
          </div>
        </Grid>
        <Grid item  columns={{ xs: 12, md: 12 }}>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Lenda</Table.HeadCell>
              <Table.HeadCell>Profesori</Table.HeadCell>
              <Table.HeadCell>Data Paraqitjes</Table.HeadCell>
              <Table.HeadCell>Nota</Table.HeadCell>
              <Table.HeadCell>Operation</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paraqitjet.map((item, index) => (
                <ParaqituraTableRow
                  key={index}
                  item={item}
                  anuloParaqitjen={anuloParaqitjen}
                />
              ))}
            </Table.Body>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

const TableRow = ({ provimi, paraqitProvimin }) => {
  const [selectedProvimiId, setSelectedProvimiId] = useState(null);
  const [placeholder, setPlaceholder] = useState("Zgjidh Provimin");

  const handleDropdownItemClick = (provimiId, emri, mbiemri) => {
    setSelectedProvimiId(provimiId);
    setPlaceholder(`${emri} ${mbiemri}`);
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {provimi.emriLendes}
      </Table.Cell>

      <Table.Cell>
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
              {item.ligjerata.professor.user.firstName}{" "}
              {item.ligjerata.professor.user.lastName}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </Table.Cell>
      <Table.Cell>Laptop</Table.Cell>
      <Table.Cell>Hello</Table.Cell>
      <Table.Cell>
        <Button
          disabled={selectedProvimiId === null}
          onClick={() => paraqitProvimin(selectedProvimiId)}
        >
          Paraqit Provimin
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
const ParaqituraTableRow = ({ item, anuloParaqitjen }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {item.emriLendes}
      </Table.Cell>

      <Table.Cell>
        {item.provimi.ligjerata.professor.user.firstName}{" "}
        {item.provimi.ligjerata.professor.user.lastName}
      </Table.Cell>
      <Table.Cell>
        {item.dataVendosjes === null ? "null" : item.dataVendosjes}
      </Table.Cell>
      <Table.Cell>{item.nota === 0 ? " " : item.nota}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => anuloParaqitjen(item.id)}>
          Anulo Paraqitjen
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};


const Provimi = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Provimet />
    </Box>
  );
};

export default Provimi;
