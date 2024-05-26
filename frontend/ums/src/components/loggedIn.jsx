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
import { Routes, Route } from "react-router-dom";
import Profesori from "./TableTranskripta.jsx";
import CrudCategories from "../pages/CrudCategories.jsx";
import Transkripta from "../pages/Transkripta.jsx";
import Ligjeratat from "../pages/ligjeratat.jsx";
import Provimi from "./Provimi/Provimi.jsx";
import Postimi from "../pages/Postimi.jsx";
import SemestriCrud from "../CRUD-Template/SemesterCrud.jsx";
import Semestrat from "../pages/Semestrat.jsx";
import Departmentat from "../pages/Departmentat.jsx";
import RegjistroSemestrin from "../pages/RegjistroSemestrin.jsx";

import {getFromCookies} from '../getUserFromJWT.js';
import ProvimiCRUD from "../CRUD-at/Provimi.jsx";
import DepartamentiCrud from "../CRUD-at/DepartamentiCrud.jsx";
import ProfesorLenda from '../CRUD-at/ProfesorLenda.jsx';
import Profesoret from "../CRUD-at/Profesoret.jsx";
import Lenda from "../CRUD-at/Lenda.jsx";
import RegjistroGrupin from "../pages/RegjistroGrupin.jsx";
import FakultetetCrud from "../CRUD-at/FakultetetCrud.jsx";


function loggedIn({changeLoggedInState,token}) {
const [sideBarInfo, setSideBarInfo] = useState(null);


const [user,setUser] = useState({
  firstName: "",
  lastName: ""
});

const setUserData = (data) =>{
  setUser(data);
}

getFromCookies({setUserData,changeLoggedInState});



  return (
    <>
      <Sidebar user={user}/>
      <main className="content">
        <Topbar />
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/provimet" element={<Provimet />} />

          <Route path="/ligjeratat/:semestriId" element={<Ligjeratat />} />
          <Route path="/cruds" element={<CrudCategories />} />
          <Route path="/transkripta" element={<Transkripta />} />

          <Route path="/paraqitura" element={<Paraqitura />} />

          <Route path="/Profili" element={<Profili changeLoggedInState={changeLoggedInState} user={user}/>} />
          <Route path="/postimi" element={<Postimi token={token}/>} />

          <Route path="/profesorLenda" element={<ProfesorLenda/>} />
          <Route path="/provimi" element={<ProvimiCRUD/>} />
          <Route path="/profesoret" element={<Profesoret/>} />
          <Route path="/lendet" element={<Lenda/>} />
          <Route path="/menaxhoSemestrat" element={<SemestriCrud />} />
          <Route path="/semesters/:departamentiId" element={<Semestrat />} />
          <Route path="/department" element={<Departmentat />} />
          <Route path="/DepartamentiCrud" element={<DepartamentiCrud/>}></Route>
          <Route path="/FakultetiCrud" element={<FakultetetCrud/>}></Route>
          <Route path="/regjistroSemestrin" element={<RegjistroSemestrin />} />
          <Route path="/regjistroGrupin" element={<RegjistroGrupin />} />

          



          <Route path="*" element={<Home />} /> 


        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
