import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ResponsiveButtons = () => {
  const renderButtons = (text, color, link, hover) => (
    <Grid item xs={12} sm={6} md={6}>
      <Link to={link} style={{ textDecoration: "none" }}>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor={color}
          minHeight="60px"
          padding="50px 20px" 
          borderRadius="5px"
          textAlign="center"
          lineHeight="1.2"
          color="#FFF"
          cursor="pointer"
          fontSize="13px"
          sx={{
            "&:hover": {
              bgcolor: hover, // Change background color on hover
            }
          }}
        >
          {text}
        </Box>
      </Link>
    </Grid>
  );

  return (
    <Grid container spacing={2} justifyContent="center" p={2}>
      {renderButtons("GJENERO TRANSKRIPTEN", "#D40E14", "/transkripta", "#B40C11")}
      {renderButtons("PARAQIT PROVIMET", "#EC6601",  "/provimet", "#CA5701")}
      {renderButtons("SHIKO LIGJERATAT", "#004F95",  "/ligjeratat/1", "#003D73")}
      {renderButtons("REGJISTRO SEMESTRIN", "#B70E77", "/regjistroSemestrin", "#970C62")}
    </Grid>
  );
};

export default ResponsiveButtons;
