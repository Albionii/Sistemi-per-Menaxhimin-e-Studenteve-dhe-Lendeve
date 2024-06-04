import React, { useState, useEffect } from "react";
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
// import Profesori from "./TableTranskripta.jsx";
import CrudCategories from "../pages/CrudCategories.jsx";
import Transkripta from "../pages/Transkripta.jsx";
import Ligjeratat from "../pages/ligjeratat.jsx";
import Provimi from "./Provimi/Provimi.jsx";
import Postimi from "../pages/Postimi.jsx";
import SemestriCrud from "../CRUD-Template/SemesterCrud.jsx";
import Semestrat from "../pages/Semestrat.jsx";
import Departmentat from "../pages/Departmentat.jsx";
import RegjistroSemestrin from "../pages/RegjistroSemestrin.jsx";

import { getFromCookies } from '../getUserFromJWT.js';
import ProvimiCRUD from "../CRUD-at/Provimi.jsx";
import DepartamentiCrud from "../CRUD-at/DepartamentiCrud.jsx";
import ProfesorLenda from '../CRUD-at/ProfesorLenda.jsx';
import Profesoret from "../CRUD-at/Profesoret.jsx";
import Lenda from "../CRUD-at/Lenda.jsx";
import UserRole from "../CRUD-at/UserRole.jsx";
import ProvimetParaqitura from "../CRUD-at/ProvimetParaqitura.jsx";
import ProvimetNota from "./Provimi/ProvimetNota.jsx";
import RegjistroGrupin from "../pages/RegjistroGrupin.jsx";
import FakultetetCrud from "../CRUD-at/FakultetetCrud.jsx";
import Studentet from "../CRUD-at/Studentet.jsx";
import AltiniCrud from "../CRUD-at/SemestriCrud.jsx";
import NotoStudentin from "../CRUD-at/NotoStudentin.jsx";
import { OrbitProgress } from "react-loading-indicators";
import EnrolledSemesters from "./Enroll/EnrolledSemesters.jsx";
import EnrolledLigjerata from "./Enroll/EnrolledLigjeratat.jsx";
import Grupi from "../CRUD-at/Grupi.jsx"
import Orari from "../CRUD-at/OrariCrud.jsx"
import Lajmi from "../CRUD-at/LajmiCrud.jsx";
import OrariLigjerata from "../CRUD-at/OrariLigjerataCrud.jsx";
import { getToken } from "../GetToken.js";


function loggedIn({ changeLoggedInState}) {
  const token = getToken();
  console.log(token);
  const [sideBarInfo, setSideBarInfo] = useState(null);

  console.log("TOKENI TE LOGGED IN " + token);

  const [user, setUser] = useState({
    firstName: "",
    lastName: ""
  });

  const setUserData = (data) => {
    setLoading(true);
    setUser(data);
  }

  getFromCookies({ setUserData, changeLoggedInState });

  const [loading, setLoading] = useState(false);
  const fifteenMinutes = 15 * 60 * 1000;


  const getJwtFromRefresh = async () => {

    const response = await fetch('http://localhost:8080/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const jwt = await response.json();

    const expirationTime = new Date(Date.now() + fifteenMinutes);

    document.cookie = `Token=${encodeURIComponent(jwt.jwt)}; expires=${expirationTime.toUTCString()}`;

  }
  const MINUTE_MS = 15 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      getJwtFromRefresh();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  return (
    <>
      <div className="flex items-center justify-center w-full h-full absolute bg-slate-600" style={{ display: loading ? "none" : "", zIndex: "100000", backgroundColor: "#141b2d" }}>
        <div style={{ width: "100%", height: "100%" }} className="flex items-center justify-center w-full h-full">
          <div style={{ display: loading ? "none" : "" }}>
            <OrbitProgress variant="track-disc" color="#006cff" size="medium" text="" textColor="" />
          </div>
        </div>
      </div>
        <Sidebar user={user} />
        <main className="flex-1 transition">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home token={token} user={user.role}/>} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/ligjeratat/:semestriId" element={<Ligjeratat token={token} user={user.role}/>} />
            <Route path="/cruds" element={<CrudCategories role={user.role} />} />
            <Route path="/transkripta" element={<Transkripta token={token} />} />

          <Route path="/paraqitura" element={<Paraqitura token={token} />} />

            <Route path="/Profili" element={<Profili changeLoggedInState={changeLoggedInState} user={user} />} />
            <Route path="/postimi" element={<Postimi token={token}  user={user}/>} />




          {/* {user.role === "ROLE_ADMIN" ? <Route path="/profesorLenda" element={<ProfesorLenda />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/provimi" element={<ProvimiCRUD />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/profesoret" element={<Profesoret />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/studentet" element={<Studentet />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/lendet" element={<Lenda />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/DepartamentiCrud" element={<DepartamentiCrud />}></Route> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/FakultetiCrud" element={<FakultetetCrud />}></Route> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/userRole" element={<UserRole />} /> : null}

          {user.role === "ROLE_ADMIN" ? <Route path="/semestri" element={<AltiniCrud />} /> : null}

          {user.role === "ROLE_STUDENT" ? <Route path="/provimet" element={<Provimet token={token} />} /> : null}

          {user.role === "ROLE_PROFESSOR" ? <Route path="/notoStudentin" element={<NotoStudentin />} />: null}
 */}
          <Route path="/profesorLenda" element={<ProfesorLenda />} />




          <Route path="/provimet" element={<Provimet token={token} />} />

          <Route path="/notoStudentin" element={<NotoStudentin />} />

          <Route path="/provimi" element={<ProvimiCRUD />} />


          <Route path="/profesoret" element={<Profesoret />} />


          <Route path="/studentet" element={<Studentet />} />

          <Route path="/lendet" element={<Lenda />} />

          <Route path="/DepartamentiCrud" element={<DepartamentiCrud />}></Route>

          <Route path="/FakultetiCrud" element={<FakultetetCrud />}></Route>

          <Route path="/userRole" element={<UserRole />} />

          <Route path="/semestri" element={<AltiniCrud />} />


          <Route path="/menaxhoSemestrat" element={<SemestriCrud />} />

          <Route path="/semesters/:departamentiId" element={<Semestrat token={token} />} />
          <Route path="/department" element={<Departmentat />} />
          <Route path="/paraqitProvimin" element={<ProvimetParaqitura />} />
          <Route path="/refuzoNoten" element={<ProvimetNota />} />
          <Route path="/regjistroSemestrin" element={<RegjistroSemestrin />} />
          <Route path="/regjistroGrupin" element={<RegjistroGrupin />} />
          <Route path="/grupi" element={<Grupi />} />
          <Route path="/orari" element={<Orari />} />
          <Route path="/lajmi" element={<Lajmi />} />
          <Route path="/orariLigjerata" element={<OrariLigjerata />} />

            <Route path="/enrolled" element={<EnrolledLigjerata token={token} />} />






          <Route path="*" element={<Home />} />


        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
