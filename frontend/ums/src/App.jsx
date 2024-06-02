import "./output.css";
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import About from './pages/about.jsx';
// import Signup from './pages/signup.jsx';
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";


import Authentication from "./pages/authentication.jsx";
import LoggedIn from "./components/loggedIn.jsx";
import { getToken,getFromRefreshToken, getTokenBeggining} from "./GetToken.js";
import { SignalCellularNoSimOutlined } from "@mui/icons-material";
import { isEmptyArray } from "formik";

function App() {
  const [theme, colorMode] = useMode();

  
  const[token,setToken] = useState(undefined);

  console.log(token);
  // console.log(getRole());


  // let isLoggedIn = document.cookie ? true : false;
  // // console.log(document.cookie);

  // if (isLoggedIn) {
  //   const documentSplited = document.cookie.split('=');
  //   let hasToken = false;
  //   for (let i = 0; i < documentSplited.length; i++) {
  //     try{
  //       if((documentSplited[i].startsWith("Token") && documentSplited[i++].length === 0)){
  //         isLoggedIn = false;
  //         hasToken = true;
  //       }
  //     }
  //     catch(error){
  //       console.log("Cookie Error" + error);
  //     }

  //     if(!hasToken){
  //       isLoggedIn = false;
  //     }
  //   }
  // }

  // console.log(typeof token);
  let logginStatus;
  if (typeof token === "undefined" || token.length === 0) {
    logginStatus = false;
  } else {
    logginStatus = true;
  }

  const [loggedIn, setLoggedIn] = useState(logginStatus);
  getTokenBeggining({setToken,setLoggedIn});



  // // const [loggedIn, setLoggedIn] = useState(document.cookie.split('=')[1].length !== 0);







  // const loggedIn = ;
  const changeLoggedInState = () => {
    setLoggedIn(!loggedIn);
  }
  // console.log(document.cookie);
  // console.log(loggedIn);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {loggedIn ? (
          <div className="app">
            <LoggedIn changeLoggedInState={changeLoggedInState}/>
          </div>
        ) : (
          <Authentication changeLoggedInState={changeLoggedInState} />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
