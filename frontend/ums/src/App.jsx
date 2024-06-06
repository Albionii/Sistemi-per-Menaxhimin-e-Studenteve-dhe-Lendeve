import "./output.css";
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import About from './pages/about.jsx';
// import Signup from './pages/signup.jsx';
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";


import Authentication from "./pages/authentication.jsx";
import LoggedIn from "./components/loggedIn.jsx";
import { getTokenBeggining } from "./GetToken.js";

import { OrbitProgress } from "react-loading-indicators";

import axios from "axios";


function App() {
  const [theme, colorMode] = useMode();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const changeLoggedInState = () => {
    setLoggedIn(!loggedIn);
  }


  useEffect(() => {
    const fetchToken = async () => {
      await getTokenBeggining({ setToken, setLoggedIn, setLoading });
    };


    fetchToken();
  }, []);

  // axios.interceptors.response.use(undefined, err => {
  //   let res = err.response;
  //   if ((res.status == 403 || res.status == 500) && res.config && !res.config.__isRetryRequest) {
  //     console.log("ERROR");
  //     alert("ERROR");
  //   }});
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center w-full h-full absolute bg-slate-600" style={{ display: loading ? "none" : "", zIndex: "100000", backgroundColor: "#141b2d" }}>
          <div style={{ width: "100%", height: "100%" }} className="flex items-center justify-center w-full h-full">
            <div style={{ display: loading ? "none" : "" }}>
              <OrbitProgress variant="track-disc" color="#006cff" size="medium" text="" textColor="" />
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {loggedIn ? (
          <div className="app">
            <LoggedIn changeLoggedInState={changeLoggedInState} />
          </div>
        ) : (
          <Authentication changeLoggedInState={changeLoggedInState} />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
