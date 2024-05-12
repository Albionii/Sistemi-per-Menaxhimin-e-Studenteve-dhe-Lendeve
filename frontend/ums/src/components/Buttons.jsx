import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const ResponsiveButtons = () => {

  const renderButtons = (text, color, Icon) => (
    <Grid item xs={12} sm={6} md={6}>
        <Button
          startIcon={<Icon />}
          variant="contained"
          style={{background: color}}
          sx={{ width: "100%", padding: "40px", margin: "10px 0" }}
        >
          {text}
        </Button>
      </Grid>
  )  
  return (
    <Grid container spacing={2} justifyContent="center" padding={3}>
      {renderButtons("Gjenero Transkripten", "#D40E14", DeleteIcon)}
      {renderButtons("Paraqit Provimet", "#EC6601", DeleteIcon)}
      {renderButtons("Kerko Masazh nga Profesori", "#004F95", DeleteIcon)}
      {renderButtons("Tento me kuptu Shkelqimin", "#B70E77", DeleteIcon)}
    </Grid>
  );
};

export default ResponsiveButtons;
