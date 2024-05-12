import React, {useState} from "react";
import Home from "../pages/home.jsx"
import Services from "../pages/services.jsx";
import LogIn from "../pages/login.jsx";
import Topbar from "./global/Topbar.jsx"
import Sidebar from "./global/Sidebar.jsx"
import Provimet from "./Provimi/Provimet.jsx";
import Paraqitura from "./Provimi/Paraqitura.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Profili from "../pages/Profili.jsx";
import CRUD from "../CRUD-Template/Crud.jsx";
import MenaxhoUsers from '../usersCrud.jsx';
import { Routes, Route } from "react-router-dom";
import Profesori from "../pages/Profesori.jsx";
import SampleCrud from "../SampleCrud.jsx";
import {getFromCookies} from '../getUserFromJWT.js';

function loggedIn({changeLoggedInState}) {
// const [sideBarInfo, setSideBarInfo] = useState(null);


const [user,setUser] = useState({
  firstName: "Loading",
  lastName: "Loading"
});

const setUserData = (data) =>{
  setUser(data);
}

getFromCookies({setUserData});



  return (
    <>
      <Sidebar user={user}/>
      <main className="content">
        <Topbar />
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/provimet" element={<Provimet />} />
          <Route path="/profesoret" element={<Profesori />} />
          <Route path="/Ligjeratat" element={<SampleCrud />} />

          <Route path="/provimet/paraqitura" element={<Paraqitura />} />

          <Route path="/Profili" element={<Profili  changeLoggedInState={changeLoggedInState} user={user} />} />

          <Route path="/MenaxhoUsers" element={<MenaxhoUsers />} />

          <Route path="*" element={<Home />} /> 


        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
