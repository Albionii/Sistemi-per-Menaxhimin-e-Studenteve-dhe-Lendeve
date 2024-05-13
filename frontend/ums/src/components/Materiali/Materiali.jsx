import React from "react";
import Material from "./Material";
import { Box } from "@mui/material";

const Materiali = () => {
  const teksti =
    " sapien aliquet. Nulla lobortis nec turpis scelerisque blandit. Donec venenatis elit at orci placerat, a facilisis tortor blandit. Aliquam rutrum consequat sodales. Mauris odio ante, porta eu turpis ac, consequat volutpat sem. Sed gravida turpis ut blandit pellentesque. Maecenas mattis scelerisque rhoncus.";

  return (
    <Box sx={{display:"flex",flexDirection:"column",  alignItems:"center", gap:"20px", }}>
      {
        Array.from(Array(9)).map((_, index) => (
          <Material teksti={teksti} />
        ))}
    </Box>
  );
};

export default Materiali;
