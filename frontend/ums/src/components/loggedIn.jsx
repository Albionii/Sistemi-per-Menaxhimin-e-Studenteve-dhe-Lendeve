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
import CrudCategories from "../pages/CrudCategories.jsx";
import Transkripta from "../pages/Transkripta.jsx";

import Ligjerata from "../pages/ligjerata.jsx";
import Ligjeratat from "../pages/ligjeratat.jsx";


function loggedIn() {
// const [sideBarInfo, setSideBarInfo] = useState(null);


// const [user,setUser] = useState({
//   firstName: "Loading",
//   lastName: "Loading"
// });

// const setUserData = (data) =>{
//   setUser(data);
// }

// getFromCookies({setUserData});



  return (
    <>
      <Sidebar user={'Albin Kurti'}/>
      <main className="content">
        <Topbar />
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/provimet" element={<Provimet />} />
          <Route path="/profesoret" element={<Profesori />} />

          <Route path="/ligjeratat" element={<Ligjeratat />} />
          <Route path="/ligjeratat/:name//*" element={<Ligjerata />} />
          <Route path="/cruds" element={<CrudCategories />} />
          <Route path="/transkripta" element={<Transkripta />} />

          <Route path="/provimet/paraqitura" element={<Paraqitura />} />

          <Route path="/Profili" element={<Profili />} />

          <Route path="/MenaxhoUsers" element={<MenaxhoUsers />} />

          <Route path="*" element={<Home />} /> 


        </Routes>
      </main>
    </>
  );
}

export default loggedIn;
