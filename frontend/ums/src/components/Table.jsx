import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const TableRow = ({ subject, lecturer, time, room, colors, hasBorder }) => (
  <tr
    style={{
      background: colors.primary[400],
      borderBottomColor: colors.primary[600],
      borderBottom: hasBorder ? colors.primary[600] + " 1px solid" : "none",
    }}
  >
    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap" sx={{height: "50px",}}>
      {subject}
    </th>
    <td className="px-6 py-4">{lecturer}</td>
    <td className="px-6 py-4">{time}</td>
    <td className="px-6 py-4">{room}</td>
  </tr>
);

const Table = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const albanianDays = [
    "E Diel",
    "E Hene",
    "E Marte",
    "E Merkure",
    "E Enjte",
    "E Premte",
    "E Shtune",
  ];

  const currentDate = new Date();

  const currentDayIndex = currentDate.getDay();

  const currentDay = albanianDays[currentDayIndex];

  const [orariLigjeratat, setOrariLigjerata] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/student/dita/${currentDay}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);
        setOrariLigjerata(response.data);
      })
      .catch((error) => console.error("Error fetching orari", error));
  }, []);

  return (
    <div className="relative overflow-x-auto h-full w-full rounded">
      <table className="w-full text-sm text-left rtl:text-right h-full">
        <thead
          className="text-xs uppercase"
          style={{ background: colors.primary[600] }}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              Ligjerata
            </th>
            <th scope="col" className="px-6 py-3">
              Ligjeruesi
            </th>
            <th scope="col" className="px-6 py-3">
              Ora
            </th>
            <th scope="col" className="px-6 py-3">
              Salla
            </th>
          </tr>
        </thead>
        <tbody>
          {orariLigjeratat.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-3 text-center" style={{fontSize: '18px', fontWeight: 'bold'}}>
                Nuk keni ligjerata për ditën e sotme
              </td>
            </tr>
          ) : (
            
            orariLigjeratat.map((orariLigjerata, index) => (
              
              <TableRow
                key={index}
                subject={orariLigjerata.ligjerata.lenda.emri}
                lecturer={
                  orariLigjerata.ligjerata.professor.user.firstName +
                  " " +
                  orariLigjerata.ligjerata.professor.user.lastName
                }
                time={orariLigjerata.ora}
                room={orariLigjerata.salla}
                colors={colors}
                hasBorder
              />
              
            ))
            
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default Table;
