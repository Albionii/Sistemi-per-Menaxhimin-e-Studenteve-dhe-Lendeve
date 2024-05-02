import React from "react";
import Home from "../pages/home.jsx";
import Services from "../pages/services.jsx";
import LogIn from "../pages/login.jsx";
import Topbar from "./global/Topbar.jsx"
import Sidebar from "./global/Sidebar.jsx"
import Provimet from "../components/Provimi/Provimet.jsx";
import Paraqitura from "../components/Provimi/Paraqitura.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Profili from "../pages/Profili.jsx";

import { Routes, Route } from "react-router-dom";

function loggedIn() {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/provimet" element={<Provimet />} />

          <Route path="/provimet/paraqitura" element={<Paraqitura />} />

          <Route path="/Profili" element={<Profili />} />

        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
