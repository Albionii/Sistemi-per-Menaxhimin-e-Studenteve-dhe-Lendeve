import React from "react";
import { Box, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Material = ({ teksti, filenames }) => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "10%",
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography>Ligjerata</Typography>
        <hr width="93%" noshade />
      </Box>

      <Box sx={{ border: "1px solid", borderRadius: "15px", display: "flex" }}>
        <Box
          sx={{
            width: "30%",
            borderRadius: "15px",
          }}
        ></Box>
        <Box>
          <Box sx={{ padding: "10px" }}>
            <Typography>{teksti}</Typography>
          </Box>
          <Box sx={{ padding: "10px" }}>
            {/* {filenames.map((item, index)=> {
              <Typography key={index}>{item}</Typography>
            })} */}
            <PictureAsPdfIcon></PictureAsPdfIcon>
            <Typography>Hello.pdf</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Material;
