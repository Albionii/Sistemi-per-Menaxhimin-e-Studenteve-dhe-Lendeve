import { createLenda, createLigjerata,createDepartamenti, createProvimi, createFakulteti, createSemester, createGrupi, createOrari, createLajmi, createOrariLigjerata, createAfati } from "../APIRequests";
import React, { lazy, Suspense } from "react";

const LazyLendaAddButton = lazy(() => import("./AddEditButtons/AddEditLenda").then(module => ({ default: module.lendaAddButton })));
const LazyLigjerataAddButton = lazy(() => import("./AddEditButtons/AddEditLigjerata").then(module => ({ default: module.ligjerataAddButton })));
const LazyProvimiAddButton = lazy(() => import("./AddEditButtons/AddEditProvimet").then(module => ({ default: module.provimiAddButton })));
const LazyDepartamentiAddButton = lazy(() => import("./AddEditButtons/AddEditDepartamenti").then(module => ({ default: module.departamentiAddButton })));
const LazyFakultetiAddButton = lazy(() => import("./AddEditButtons/AddEditFakulteti").then(module => ({ default: module.fakultetiAddButton })));
const LazyAddEditSemester = lazy(() => import("./AddEditButtons/AddEditSemester").then(module => ({ default: module.AddEditSemester })));
const LazyGrupiAddButton = lazy(() => import("./AddEditButtons/AddEditGrupi").then(module => ({ default: module.GrupiAddButton })));
const LazyOrariAddButton = lazy(() => import("./AddEditButtons/AddEditOrari").then(module => ({ default: module.OrariAddButton })));
const LazyLajmiAddButton = lazy(() => import("./AddEditButtons/AddEditLajmi").then(module => ({ default: module.LajmiAddButton })));
const LazyOrariLigjerataAddButton = lazy(() => import("./AddEditButtons/AddEditOrariLigjerata").then(module => ({ default: module.OrariLigjerataAddButton })));
const LazyAfatiAddButton = lazy(() => import("./AddEditButtons/AddEditAfati").then(module => ({ default: module.AfatiAddButton })));

const SuspenseFallback = () => <div>Loading...</div>;

const AddButton = ({ setConfirmExit, renderBot, formDataJson, API, token }) => {
  let prompt = { setConfirmExit, renderBot, formDataJson, API, token };

  const whichAdd = () => {
    switch (API.create()[0]) {
      case createProvimi()[0]:
        return <LazyProvimiAddButton {...prompt} />;
      case createLigjerata()[0]:
        return <LazyLigjerataAddButton {...prompt} />;
      case createLenda()[0]:
        return <LazyLendaAddButton {...prompt} />;
      case createDepartamenti()[0]:
        return <LazyDepartamentiAddButton {...prompt} />;
      case createFakulteti()[0]:
        return <LazyFakultetiAddButton {...prompt} />;
      case createSemester()[0]:
        return <LazyAddEditSemester {...prompt} />;
      case createGrupi()[0]:
        return <LazyGrupiAddButton {...prompt} />;
      case createOrari()[0]:
        return <LazyOrariAddButton {...prompt} />;
      case createLajmi()[0]:
        return <LazyLajmiAddButton {...prompt} />;
      case createOrariLigjerata()[0]:
        return <LazyOrariLigjerataAddButton {...prompt} />;
      case createAfati()[0]:
        return <LazyAfatiAddButton {...prompt} />;
      default:
        return API.errorAlert("Nuk ekziston add butoni per kete CRUD ose nuk e keni shtuar ne AddButton.jsx");
    }
  };

  return (
    <Suspense fallback={<SuspenseFallback />}>
      {whichAdd()}
    </Suspense>
  );
};

export default AddButton;
