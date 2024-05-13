import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Postimi from "./Postimi";
import Button from "@mui/material/Button";
import { Box, colors } from "@mui/material";
import PostimiCRUD from "./PostimiCRUD";
import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostimiContext from "./PostimiContext";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

const Postimet = ({ post }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isPosting, setIsPosting] = React.useState(false);
  const [selectedPostimi, setSelectedPostimi] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setIsPosting(!isPosting);
  };

  const goBack = () => {
    setIsPosting(!isPosting);
    navigate(-1);
  };
  const goBackToPostimet = () => {
    setSelectedPostimi(!selectedPostimi);
    navigate(-1);
  };

  const handleSelectedPostimi = () => {
    setSelectedPostimi(!selectedPostimi);
  };

  const emri = "Student";
  const data = "09/00/1293";
  const teksti =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor nec elit et sagittis. Integer vestibulum iaculis arcu nec sodales. Fusce ultricies a magna ut congue. Quisque imperdiet, libero nec semper congue, nisi arcu varius nunc, eget scelerisque risus quam et nisl. Duis diam urna, pellentesque ac lectus eget, varius elementum mi. Maecenas et lacinia sapien. Nulla facilisi. In quis dapibus justo, in ultrices erat. Vestibulum cursus ante sit amet orci vehicula, vitae bibendum sapien aliquet. Nulla lobortis nec turpis scelerisque blandit. Donec venenatis elit at orci placerat, a facilisis tortor blandit. Aliquam rutrum consequat sodales. Mauris odio ante, porta eu turpis ac, consequat volutpat sem. Sed gravida turpis ut blandit pellentesque. Maecenas mattis scelerisque rhoncus.";

  return (
    <Box sx={{}}>
      <Box
        sx={{
          bgColor: "white",
          width: "90%",

          display: "flex",
          justifyContent: "end",
        }}
      >
        {isPosting === false && selectedPostimi === false && (
          <Link to="posting">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleChange}
              sx={{ position: "absolute" }}
            >
              +
            </Button>
          </Link>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {(isPosting === true && selectedPostimi===false) && (
            <IconButton variant="contained" color="secondary" onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Routes>
            <Route path={"posting"} element={<PostimiCRUD />} />
          </Routes> */}
          {(isPosting === true && selectedPostimi===false) && (<PostimiCRUD />)}
        </Box>
      </Box>

      {isPosting === false &&
        selectedPostimi === false &&
        Array.from(Array(9)).map((_, index) => (
          <Link to="postimi" onClick={handleSelectedPostimi} key={index}>
            <Postimi Emri={"Altin"} data={data} teksti={teksti} />
          </Link>
        ))}
      <Box sx={{ height: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {selectedPostimi === true && (
            <IconButton
              variant="contained"
              color="secondary"
              onClick={goBackToPostimet}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            height: "",
          }}
        >
          {/* <Routes>
            <Route
              path="postimi"
              element={<Postimi Emri={"Altin"} data={data} teksti={teksti} />}
            />
          </Routes> */}
          {isPosting === false && selectedPostimi === true && (
            <Postimi Emri={"Altin"} data={data} teksti={teksti} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Postimet;
