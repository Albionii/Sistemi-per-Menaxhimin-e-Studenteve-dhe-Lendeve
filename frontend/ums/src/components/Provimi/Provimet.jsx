import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Dropdown, Button } from "flowbite-react";
import { Box } from "@mui/material";

const Provimet = () => {
  const [provimet, setProvimet] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTU4ODEzMTcsImV4cCI6MTcxNTg4OTk1NywiZW1haWwiOiJzdHVkZW50QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.atscXOQTqNJBRjBG-sLWrdp5BLuiKYGG7Hui_FyHMhA";

  useEffect(() => {
    fetchProvimet();
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

  const paraqitProvimin = (provimiId) => {
    if (provimiId) {
      axios
        .post(`http://localhost:8080/student/paraqit/${provimiId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProvimet([]);
          fetchProvimet();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No provimi selected");
    }
  };

  return (
    <div className="overflow-x-auto h-full">
      <Box sx={{ width: "100%", height: "100%", alignItems: "center" }}>
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
      </Box>
    </div>
  );
};

const TableRow = ({ provimi, paraqitProvimin }) => {
  const [placeholder, setPlaceholder] = useState("Zgjidh Provimin");
  const [selectedProvimiId, setSelectedProvimiId] = useState(null);

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
              className="z-40"
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
      <Table.Cell>
        {new Date(provimi.provimet[0].data).toLocaleString()}
      </Table.Cell>
      <Table.Cell>{provimi.provimet[0].ligjerata.lenda.ects}</Table.Cell>
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

export default Provimet;
