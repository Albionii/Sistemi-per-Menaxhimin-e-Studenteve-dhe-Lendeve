import React from "react";
import Home from "../pages/home.jsx"
import Services from "../pages/services.jsx";
import LogIn from "../pages/login.jsx";
import Topbar from "./global/Topbar.jsx"
import Sidebar from "./global/Sidebar.jsx"
import Provimet from "../components/Provimi/Provimet.jsx";
import Paraqitura from "../components/Provimi/Paraqitura.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Profili from "../pages/Profili.jsx";
import CRUD from "../CRUD-Template/Crud.jsx";
import MenaxhoUsers from '../usersCrud.jsx';
import { Routes, Route } from "react-router-dom";
import Profesori from "../pages/Profesori.jsx";
import SampleCrud from "../SampleCrud.jsx";
import CrudCategories from "../pages/CrudCategories.jsx";

function loggedIn() {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/provimet" element={<Provimet />} />
          <Route path="/profesoret" element={<Profesori />} />
          <Route path="/ligjeratat" element={<SampleCrud />} />
          <Route path="/cruds" element={<CrudCategories />} />


          <Route path="/provimet/paraqitura" element={<Paraqitura />} />

          <Route path="/Profili" element={<Profili />} />

          <Route path="/MenaxhoUsers" element={<MenaxhoUsers />} />


        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
