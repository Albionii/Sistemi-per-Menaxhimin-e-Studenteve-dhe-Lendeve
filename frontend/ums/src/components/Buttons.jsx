import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const ResponsiveButtons = () => {

  const renderButtons = (text, color, Icon, link) => (
    <Grid item xs={12} sm={6} md={6}>
      <Link to={link}>
        <Button
          startIcon={<Icon />}
          variant="contained"
          style={{background: color}}
          sx={{ width: "100%", padding: "40px", margin: "10px 0" }}
        >
          {text}
        </Button>
        </Link>
      </Grid>
  )  
  return (
    <Grid container spacing={2} justifyContent="center" padding={3}>
      {renderButtons("Gjenero Transkripten", "#D40E14", DeleteIcon, '/transkripta')}
      {renderButtons("Paraqit Provimet", "#EC6601", DeleteIcon, '/provimet')}
      {renderButtons("Kerko Masazh nga Profesori", "#004F95", DeleteIcon, '/masazh')}
      {renderButtons("Tento me kuptu Shkelqimin", "#B70E77", DeleteIcon, '/kuptoShkelqen')}
    </Grid>
  );
};

export default ResponsiveButtons;
