import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const TableRow = ({ subject, lecturer, time, room, colors, hasBorder }) => (
  <tr
    style={{
      background: colors.primary[400],
      borderBottomColor: colors.primary[600],
      borderBottom: hasBorder ?  colors.primary[600]+" 1px solid" : "none",
    }}
  >
    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
      {subject}
    </th>
    <td className="px-6 py-4">{lecturer}</td>
    <td className="px-6 py-4">{time}</td>
    <td className="px-6 py-4">{room}</td>
  </tr>
);

const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          <TableRow
            subject="Hyrje ne Shkenca Kompjuterike"
            lecturer="Blerim Zylfiu"
            time="09:00-10:30"
            room="D132"
            colors={colors}
            hasBorder
          />
          <TableRow
            subject="Bazat e Inxhinieries Elektrike"
            lecturer="Bertan Karahoda"
            time="10:40-12:10"
            room="D134"
            colors={colors}
            hasBorder
          />
          <TableRow
            subject="AOK"
            lecturer="Valdrin Haxhiu"
            time="12:40-14:10"
            room="D116"
            colors={colors}
            hasBorder
          />
          <TableRow
            subject="Gjuhe Angleze per Inxhinieri"
            lecturer="George Washington"
            time="14:20-15:30"
            room="D140"
            colors={colors}
            hasBorder={false}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
