import React from 'react'
import Home from '../pages/home.jsx'
import Services from '../pages/services.jsx';
import LogIn from '../pages/login.jsx';
import Nav from '../components/Nav';
import Provimet from '../components/Provimi/Provimet.jsx';
import Paraqitura from '../components/Provimi/Paraqitura.jsx';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

function loggedIn() {
  return (
    <Router>
      {/* <NavBar/> */}
      <Nav></Nav>

      <Routes>
        <Route exact path='/'
          element={<Home />}>
        </Route>

        <Route path="/services"
          element={<Services />}>
        </Route>

        <Route path="/LogIn"
          element={<LogIn />}>
        </Route>
{/* 
        <Route path="/signup"
          element={<Signup />}>
        </Route> */}

        <Route path="/provimet"
          element={<Provimet />} />

        <Route path="/provimet/paraqitura"
          element={<Paraqitura />} />

      </Routes>

    </Router>
  )
}

export default loggedIn