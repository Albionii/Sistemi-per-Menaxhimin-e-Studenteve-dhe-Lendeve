import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const TableRow = ({ id, lenda, ects, nota, notaShkronje, colors, statusi, hasBorder }) => (
  <tr
    style={{
      background: colors.primary[400],
      borderBottomColor: colors.primary[600],
      borderBottom: hasBorder ?  colors.primary[600]+" 1px solid" : "none",
    }}
  >
    <td className="px-6 py-4">{id}</td>
    <td className="px-6 py-4">{lenda}</td>
    <td className="px-6 py-4">{ects}</td>
    <td className="px-6 py-4">{nota}</td>
    <td className="px-6 py-4">{notaShkronje}</td>
    <td className="px-6 py-4">{statusi}</td>
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
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Lenda
            </th>
            <th scope="col" className="px-6 py-3">
              ECTS
            </th>
            <th scope="col" className="px-6 py-3">
              Nota
            </th>
            <th scope="col" className="px-6 py-3">
              Nota Shkronje 
            </th>
            <th scope="col" className="px-6 py-3">
              Statusi 
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            id="1"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="5.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="2"
            lenda="Hyrje ne Shkenca Kompjuterike"
            ects="5.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="3"
            lenda="Shkenca Kompjuterike 1"
            ects="5.00"
            nota="10"
            notaShkronje='A'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="4"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="5.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="5"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="6.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="6"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="6.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
            <TableRow
            id="7"
            lenda="Shkenca Kompjuterike 1"
            ects="5.00"
            nota="10"
            notaShkronje='A'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="8"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="5.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="9"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="6.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
          <TableRow
            id="10"
            lenda="Bazat e Inxhinieries Elektrike"
            ects="6.00"
            nota="9"
            notaShkronje='B'
            statusi={'I rregullte'}
            colors={colors}
            hasBorder
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
