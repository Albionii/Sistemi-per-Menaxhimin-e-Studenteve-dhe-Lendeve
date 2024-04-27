import "./output.css";

// import About from './pages/about.jsx';
// import Signup from './pages/signup.jsx';
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Authentication from "./pages/authentication.jsx";
import LoggedIn from "./components/loggedIn.jsx";

function App() {
  const [theme, colorMode] = useMode();

  const loggedIn = true;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {loggedIn ? (
          <div className="app">
            <LoggedIn />
          </div>
        ) : (
          <Authentication />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
