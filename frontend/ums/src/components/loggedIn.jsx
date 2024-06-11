import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/home.jsx"
import Topbar from "./global/Topbar.jsx"
import { getFromCookies } from '../getUserFromJWT.js';
import { OrbitProgress } from "react-loading-indicators";
import { getToken } from "../GetToken.js";
import { useTheme } from '@mui/material';
import { tokens } from "../theme.js";
import RedirectByRole from "./RedirectByRole.jsx";


const Provimet = lazy(() => import('./Provimi/Provimet.jsx'));
const Paraqitura = lazy(() => import('./Provimi/Paraqitura.jsx'));
const Dashboard = lazy(() => import('../pages/dashboard.jsx'));
const Profili = lazy(() => import('../pages/Profili.jsx'));
const CrudCategories = lazy(() => import('../pages/CrudCategories.jsx'));
const Transkripta = lazy(() => import('../pages/Transkripta.jsx'));
const Ligjeratat = lazy(() => import('../pages/ligjeratat.jsx'));
const Postimi = lazy(() => import('../pages/Postimi.jsx'));
const SemestriCrud = lazy(() => import('../CRUD-Template/SemesterCrud.jsx'));
const Semestrat = lazy(() => import('../pages/Semestrat.jsx'));
const Departmentat = lazy(() => import('../pages/Departmentat.jsx'));
const RegjistroSemestrin = lazy(() => import('../pages/RegjistroSemestrin.jsx'));

const ProvimiCRUD = lazy(() => import('../CRUD-at/Provimi.jsx'));
const DepartamentiCrud = lazy(() => import('../CRUD-at/DepartamentiCrud.jsx'));
const ProfesorLenda = lazy(() => import('../CRUD-at/ProfesorLenda.jsx'));
const Profesoret = lazy(() => import('../CRUD-at/Profesoret.jsx'));
const Lenda = lazy(() => import('../CRUD-at/Lenda.jsx'));
const UserRole = lazy(() => import('../CRUD-at/UserRole.jsx'));
const ProvimetParaqitura = lazy(() => import('../CRUD-at/ProvimetParaqitura.jsx'));
const ProvimetNota = lazy(() => import('./Provimi/ProvimetNota.jsx'));
const RegjistroGrupin = lazy(() => import('../pages/RegjistroGrupin.jsx'));
const FakultetetCrud = lazy(() => import('../CRUD-at/FakultetetCrud.jsx'));
const Studentet = lazy(() => import('../CRUD-at/Studentet.jsx'));
const AltiniCrud = lazy(() => import('../CRUD-at/SemestriCrud.jsx'));
const NotoStudentin = lazy(() => import('../CRUD-at/NotoStudentin.jsx'));
const EnrolledLigjerata = lazy(() => import('./Enroll/EnrolledLigjeratat.jsx'));
const Grupi = lazy(() => import('../CRUD-at/Grupi.jsx'));
const Orari = lazy(() => import('../CRUD-at/OrariCrud.jsx'));
const Lajmi = lazy(() => import('../CRUD-at/LajmiCrud.jsx'));
const OrariLigjerata = lazy(() => import('../CRUD-at/OrariLigjerataCrud.jsx'));
const AfatiCrud = lazy(() => import('../CRUD-at/AfatiCrud.jsx'));
const ScreenSideBar = lazy(() => import('./global/ScreenSideBar.jsx'));



function loggedIn({ changeLoggedInState }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const token = getToken();
  const [token, setToken] = useState(getToken())
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
    })
    const jwt = await response.json();

    const expirationTime = new Date(Date.now() + fifteenMinutes);

    document.cookie = `Token=${encodeURIComponent(jwt.jwt)}; expires=${expirationTime.toUTCString()}`;
    setToken(getToken())
  }
  const MINUTE_MS = 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      getJwtFromRefresh();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  //#141b2d
  if (!loading) {
    return (
      <>
        <div className="flex items-center justify-center w-full h-full absolute " style={{ zIndex: "100000", background: colors.primary[500] }}>
          <div style={{ width: "100%", height: "100%" }} className="flex items-center justify-center w-full h-full">
            <div style={{ display: loading ? "none" : "", position:"absolute"}}>
              <OrbitProgress variant="track-disc" color="#006cff" size="medium" text="" textColor="" />
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <ScreenSideBar user={user} isSmallScreen={false} />
      <main className="flex-1 transition">
        <Topbar user={user} />
        <Suspense>
          <Routes>
            {user.role !== "ROLE_ADMIN" ? <Route path="/" element={<Home />} /> : <Route path="/" element={<CrudCategories roli={user.role} />} />}

            {/* VEQ PER ADMIN */}
            {user.role === "ROLE_ADMIN" ? <Route path="/profesorLenda" element={<ProfesorLenda token={token} />} /> : null}
            {/* <Route path="/provimi" element={<ProvimiCRUD token={token} />} />
            <Route path="/profesoret" element={<Profesoret token={token} />} />
            <Route path="/lendet" element={<Lenda token={token} />} />
            <Route path="/studentet" element={<Studentet token={token} />} />
            <Route path="/DepartamentiCrud" element={<DepartamentiCrud token={token} />}></Route>
            <Route path="/FakultetiCrud" element={<FakultetetCrud token={token} />}></Route>
            <Route path="/userRole" element={<UserRole token={token} />} />
            <Route path="/semestri" element={<AltiniCrud token={token} />} />
            <Route path="/grupi" element={<Grupi token={token} />} />
            <Route path="/orari" element={<Orari token={token} />} />
            <Route path="/lajmi" element={<Lajmi token={token} />} />
            <Route path="/orariLigjerata" element={<OrariLigjerata token={token} />} />
            <Route path="/afati" element={<AfatiCrud token={token} />} /> */}
            {user.role === "ROLE_ADMIN" ? <Route path="/provimi" element={<ProvimiCRUD token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/profesoret" element={<Profesoret token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/lendet" element={<Lenda token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/studentet" element={<Studentet token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/DepartamentiCrud" element={<DepartamentiCrud token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/FakultetiCrud" element={<FakultetetCrud token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/userRole" element={<UserRole token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/semestri" element={<AltiniCrud token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/grupi" element={<Grupi token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/orari" element={<Orari token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/lajmi" element={<Lajmi token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/orariLigjerata" element={<OrariLigjerata token={token} />} /> : null}
            {user.role === "ROLE_ADMIN" ? <Route path="/afati" element={<AfatiCrud token={token} />} /> : null}








            {/* VEQ PER STUDENT */}
            {/* <Route path="/paraqitura" element={<Paraqitura token={token} />} />
            <Route path="/regjistroSemestrin" element={<RegjistroSemestrin token={token} />} />
            <Route path="/regjistroGrupin" element={<RegjistroGrupin token={token} />} />
            <Route path="/transkripta" element={<Transkripta token={token} />} />
            <Route path="/provimet" element={<Provimet token={token} />} />
            <Route path="/refuzoNoten" element={<ProvimetNota />} />
            <Route path="/enrolled" element={<EnrolledLigjerata token={token} />} /> */}
            {user.role === "ROLE_STUDENT" ? <Route path="/paraqitura" element={<Paraqitura token={token} />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/regjistroSemestrin" element={<RegjistroSemestrin token={token} />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/regjistroGrupin" element={<RegjistroGrupin token={token} />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/transkripta" element={<Transkripta token={token} />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/provimet" element={<Provimet token={token} />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/refuzoNoten" element={<ProvimetNota />} /> : null}
            {user.role === "ROLE_STUDENT" ? <Route path="/enrolled" element={<EnrolledLigjerata token={token} />} /> : null}





            {/* VEQ PER  PROFESOR*/}
            {/* <Route path="/notoStudentin" element={<NotoStudentin token={token} />} /> */}
            {user.role === "ROLE_PROFESSOR" ? <Route path="/notoStudentin" element={<NotoStudentin token={token} />} /> : null}


            {/* PER KREJT */}
            <Route path="/department" element={<Departmentat />} />
            <Route path="/cruds" element={<CrudCategories roli={user.role} />} />
            <Route path="/Profili" element={<Profili changeLoggedInState={changeLoggedInState} setUserData={setUserData} user={user} />} />
            <Route path="/postimi" element={<Postimi token={token} user={user} />} />

            {/* ??  NA KALLXOJN DJEMT*/}
            <Route path="/menaxhoSemestrat" element={<SemestriCrud />} />
            <Route path="/ligjeratat/:semestriId" element={<Ligjeratat token={token} user={user.role} />} />
            <Route path="/paraqitProvimin" element={<ProvimetParaqitura />} />
            <Route path="/semesters/:departamentiId" element={<Semestrat token={token} user={user} />} />

            {/* ENDING */}




            {/* {user.role !== "ROLE_ADMIN" ? <Route path="*" element={<Home />} /> : <Route path="*" element={<CrudCategories roli={user.role} />} />} */}
            <Route path="*" element={<RedirectByRole role={user.role}></RedirectByRole>}/>



          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default loggedIn;
