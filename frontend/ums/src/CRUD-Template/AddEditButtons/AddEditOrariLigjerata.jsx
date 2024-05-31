import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  getAllLendet,
  getAllLigjeratat,
  getAllOraret,
  getAllProfessors,
  getAllSemester,
} from "../../APIRequests";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
export const OrariLigjerataAddButton = ({
  setConfirmExit,
  renderBot,
  formDataJson,
  API,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [urlCreate, errorCreate] = API.create();
  const [urlLigjerata, errorLigjerata] = getAllLigjeratat();
  const [urlOrari, errorOrari] = getAllOraret();

  const handleClick = () => {
    setConfirmExit();
  };

  const [ligjeratat, setLigjeratat] = useState([]);
  const [ligjerata, setSelectedLigjerata] = useState("");

  const [oraret, setOraret] = useState([]);
  const [selectedOrari, setSelectedOrari] = useState("");
  const [dita, setSelectedDita] = useState("");
  const [salla, setSelectedSalla] = useState("");
  const [ora, setSelectedOra] = useState("");

  const ditet = [
    "E Hene",
    "E Marte",
    "E Merkure",
    "E Enjte",
    "E Premte",
    "E Shtune",
    "E Diele",
  ];

  const [formData, setFormData] = useState(formDataJson);

  useEffect(() => {
    getLigjeratat();
    getOraret();
  }, []);

  const getLigjeratat = async () => {
    try {
      const fetchLigjeratat = await axios.get(urlLigjerata);
      setLigjeratat(fetchLigjeratat.data);
    } catch (error) {
      API.errorAlert(errorLigjerata);
      console.log(error);
    }
  };

  const getOraret = async () => {
    try {
      const fetchOraret = await axios.get(urlOrari);
      setOraret(fetchOraret.data);
    } catch (error) {
      API.errorAlert(errorOrari);
      console.log(error);
    }
  };

  const handleChangedDita = (e) => {
    setSelectedDita(e.target.value);
    setFormData({
      ...formData,
      dita: e.target.value,
    });
  };

  const handleChangedOra = (e) => {
    setSelectedOra(e.target.value);
    setFormData({
      ...formData,
      ora: e.target.value,
    });
  };

  const handleChangedSalla = (e) => {
    setSelectedSalla(e.target.value);
    setFormData({
      ...formData,
      salla: e.target.value,
    });
  };

  const handleChangedLigjeratat = (e) => {
    setSelectedLigjerata(e.target.value);
    setFormData({
      ...formData,
      ligjerata: ligjeratat.find((ligjerata) => ligjerata.id == e.target.value),
    });
  };

  const handleChangedOraret = (e) => {
    setSelectedOrari(e.target.value);
    setFormData({
      ...formData,
      orari: oraret.find((orari) => orari.id == e.target.value),
    });
  };

  //   const handleChangedProfesoret = (e) => {
  //     setSelectedProfesori(e.target.value);
  //     setFormData({
  //       ...formData,
  //       professor : profesoret.find(profesori => profesori.id == e.target.value)
  //     })
  //   }

  //   const handleChangedSemestrat = (e) => {
  //     setSelectedSemestri(e.target.value);
  //     setFormData({
  //       ...formData,
  //       semester : semestrat.find(s => s.id == e.target.value)
  //     })
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlCreate, formData);
      renderBot();
    } catch (error) {
      API.errorAlert(errorCreate);
      console.error(error);
    }
    setConfirmExit();
  };

  return (
    <>
      <div
        className="relative w-full rounded-lg shadow"
        style={{ background: colors.primary[400] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-lg font-semibold">Krijo OrariLigjeraten</h3>
          <button
            type="button"
            className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            onClick={handleClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-5 text-center">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Orari
              </label>
              <select
                className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={selectedOrari}
                onChange={handleChangedOraret}
                required
              >
                <option value="">Selekto Orarin</option>
                {oraret.map((orari) => (
                  <option key={orari.id} value={orari.id}>
                    {orari.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium "
              >
                Ligjerata
              </label>
              <select
                id="ligjerata"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={ligjerata}
                onChange={handleChangedLigjeratat}
                required
              >
                <option value="">Selekto Ligjeraten</option>
                {ligjeratat.map((ligjerata) => (
                  <option key={ligjerata.id} value={ligjerata.id}>
                    {ligjerata.lenda.emri +
                      " - " +
                      ligjerata.professor.user.firstName +
                      " " +
                      ligjerata.professor.user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium "
              >
                Dita
              </label>
              <select
                id="lenda"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={dita}
                onChange={handleChangedDita}
                required
              >
                <option value="">Selekto Diten</option>
                {ditet.map((dita) => (
                  <option key={dita} value={dita}>
                    {dita}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Ora
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={ora == "" && formData != null ? formData.name : ora}
                onInput={handleChangedOra}
                placeholder="Ora"
              />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Salla
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={salla == "" && formData != null ? formData.name : salla}
                onInput={handleChangedSalla}
                placeholder="Salla"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add OrariLigjerata
          </button>
        </form>
      </div>
    </>
  );
};
export const OrariLigjerataEditButton = ({
  setConfirmExit,
  item,
  onLigjerataEdit,
  API,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  const [urlLigjerata, errorLigjerata] = getAllLigjeratat();
  const [urlOrari, errorOrari] = getAllOraret();

  const handleClick = () => {
    setConfirmExit();
  };

  const [ligjeratat, setLigjeratat] = useState([]);
  const [ligjerata, setSelectedLigjerata] = useState("");

  const [oraret, setOraret] = useState([]);
  const [selectedOrari, setSelectedOrari] = useState("");
  const [dita, setSelectedDita] = useState("");
  const [salla, setSelectedSalla] = useState("");
  const [ora, setSelectedOra] = useState("");

  const ditet = [
    "E Hene",
    "E Marte",
    "E Merkure",
    "E Enjte",
    "E Premte",
    "E Shtune",
    "E Diele",
  ];

  const [formData, setFormData] = useState(item);

  useEffect(() => {
    getLigjeratat();
    getOraret();
  }, []);

  const getLigjeratat = async () => {
    try {
      const fetchLigjeratat = await axios.get(urlLigjerata);
      setLigjeratat(fetchLigjeratat.data);
    } catch (error) {
      API.errorAlert(errorLigjerata);
      console.log(error);
    }
  };

  const getOraret = async () => {
    try {
      const fetchOraret = await axios.get(urlOrari);
      setOraret(fetchOraret.data);
    } catch (error) {
      API.errorAlert(errorOrari);
      console.log(error);
    }
  };

  const handleChangedDita = (e) => {
    setSelectedDita(e.target.value);
    setFormData({
      ...formData,
      dita: e.target.value,
    });
  };

  const handleChangedOra = (e) => {
    setSelectedOra(e.target.value);
    setFormData({
      ...formData,
      ora: e.target.value,
    });
  };

  const handleChangedSalla = (e) => {
    setSelectedSalla(e.target.value);
    setFormData({
      ...formData,
      salla: e.target.value,
    });
  };

  const handleChangedLigjeratat = (e) => {
    setSelectedLigjerata(e.target.value);
    setFormData({
      ...formData,
      ligjerata: ligjeratat.find((ligjerata) => ligjerata.id == e.target.value),
    });
  };

  const handleChangedOraret = (e) => {
    setSelectedOrari(e.target.value);
    setFormData({
      ...formData,
      orari: oraret.find((orari) => orari.id == e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(urlUpdate + item.id, formData);
      setConfirmExit();
      onLigjerataEdit();
    } catch (error) {
      API.errorAlert(errorUpdate);
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="relative w-full rounded-lg shadow"
        style={{ background: colors.primary[500] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-500">
          <h3 className="text-lg font-semibold">Edito OrariLigjeraten</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            onClick={handleClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-5 text-center">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Orari
              </label>
              <select
                className="border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={selectedOrari}
                onChange={handleChangedOraret}
                required
              >
                <option value="">{formData.orari.name}</option>
                {oraret.map((orari) => (
                  <option key={orari.id} value={orari.id}>
                    {orari.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium "
              >
                Ligjerata
              </label>
              <select
                id="ligjerata"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={ligjerata}
                onChange={handleChangedLigjeratat}
                required
              >
                <option value="">
                  {formData.ligjerata.lenda.emri +
                    " - " +
                    formData.ligjerata.professor.user.firstName +
                    " " +
                    formData.ligjerata.professor.user.lastName}
                </option>
                {ligjeratat.map((ligjerata) => (
                  <option key={ligjerata.id} value={ligjerata.id}>
                    {ligjerata.lenda.emri +
                      " - " +
                      ligjerata.professor.user.firstName +
                      " " +
                      ligjerata.professor.user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium "
              >
                Dita
              </label>
              <select
                id="lenda"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={dita}
                onChange={handleChangedDita}
                required
              >
                <option value="">{formData.dita}</option>
                {ditet.map((dita) => (
                  <option key={dita} value={dita}>
                    {dita}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Ora
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={ora == "" && formData != null ? formData.ora : ora}
                onInput={handleChangedOra}
                placeholder="Ora"
              />
            </div>
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Salla
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={salla == "" && formData != null ? formData.salla : salla}
                onInput={handleChangedSalla}
                placeholder="Salla"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Edit Ligjerata
          </button>
        </form>
      </div>
    </>
  );
};
