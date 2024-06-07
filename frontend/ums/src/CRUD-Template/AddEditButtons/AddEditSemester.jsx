import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { getAllDepartamenti, getAllFakulteti } from "../../APIRequests";


// Qiky funksioni i kthen prej Localdate nveq Date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AddEditSemester = ({
  setConfirmExit,
  renderBot,
  formDataJson,
  API,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlCreate, errorCreate] = API.create();
  const [urlGetDepartament, departamentiError] = getAllDepartamenti();
  const [formData, setFormData] = useState(formDataJson);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departamentet, setDepartamentet] = useState([]);
  const [departamenti, setDepartamenti] = useState(null);

  useEffect(() => {
    getDepartamentet();
  }, []);

  const getDepartamentet = async () => {
    try {
      const response = await axios.get(urlGetDepartament);
      setDepartamentet(response.data);
    } catch (error) {
      API.errorAlert(departamentiError);
      console.log(error);
    }
  };

  const handleClick = () => {
    setConfirmExit();
  };

  const handleName = (e) => {
    setName(e.target.value);
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    setFormData({
      ...formData,
      startDate: e.target.value,
    });
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setFormData({
      ...formData,
      endDate: e.target.value,
    });
  };


  const handleDepartamenti = (e) => {
    setDepartamenti(e.target.value);
    setFormData({
      ...formData,
      departamenti: departamentet.find((f) => f.id == e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData));
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
        className="relativew-full rounded-lg shadow"
        style={{ background: colors.primary[500] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">Create Semester</h3>
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
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Emri
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={name}
                onInput={handleName}
                placeholder="Emri Departamentit"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <div className="col-span-1">
                <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
                >
                  Data e Fillimit
                </label>
                <input
                  type="date"
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  style={{ background: colors.primary[400] }}
                  placeholder="Emaili"
                  value={startDate}
                  onInput={handleStartDate}
                  required
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <div className="col-span-1">
                <label
                  htmlFor="category"
                  className="block text-left mb-2 text-sm font-medium"
                >
                  Data e Mbarimit
                </label>
                <input
                  type="date"
                  className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  style={{ background: colors.primary[400] }}
                  value={endDate}
                  onInput={handleEndDate}
                  placeholder="Lokacioni"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Departamenti
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={departamenti}
                onChange={handleDepartamenti}
                required
              >
                {departamenti == null && (
                  <option value="">Selektoni Departamentin</option>
                )}
                {departamentet.map((departamenti) => (
                  <option key={departamenti.id} value={departamenti.id}>
                    {departamenti.emri}
                  </option>
                ))}
              </select>
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
            Krijo Semester
          </button>
        </form>
      </div>
    </>
  );
};

export const SemesterEditButton = ({
  setConfirmExit,
  item,
  onLigjerataEdit,
  API,
  token
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlUpdate, errorUpdate] = API.update();
  const [urlGetDepartamentet, departmentetError] = getAllDepartamenti();
  const [formData, setFormData] = useState(item);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departamentet, setDepartamentet] = useState([]);
  const [departamenti, setDepartamenti] = useState(null);

  useEffect(() => {
    getDepartamentet();
  }, []);

  const getDepartamentet = async () => {
    try {
      const response = await axios.get(urlGetDepartamentet, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDepartamentet(response.data);
    } catch (error) {
      API.errorAlert(departmentetError);
      console.log(error);
    }
  };

  const handleClick = () => {
    setConfirmExit();
  };

  const handleName = (e) => {
    setName(e.target.value);
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    setFormData({
      ...formData,
      startDate: e.target.value,
    });
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setFormData({
      ...formData,
      endDate: e.target.value,
    });
  };

  const handleDepartamenti = (e) => {
    setDepartamenti(e.target.value);
    setFormData({
      ...formData,
      departamenti: departamentet.find((f) => f.id == e.target.value),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(urlUpdate + item.id, formData, {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
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
        className="relativew-full rounded-lg shadow"
        style={{ background: colors.primary[500] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">Edit Semester</h3>
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
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Emri
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={name == "" && formData != null ? formData.name : name}
                onInput={handleName}
                placeholder="Emri Departamentit"
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                startDate
              </label>
              <input
                type="date"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                placeholder="Emaili"
                value={
                  startDate == "" && formData != null
                    ? formatDate(formData.startDate)
                    : startDate
                }
                onInput={handleStartDate}
              />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                endDate
              </label>
              <input
                type="date"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={
                  endDate == "" && formData != null ? formatDate(formData.endDate) : endDate
                }
                onInput={handleEndDate}
                placeholder="Lokacioni"
              />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Departamenti
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={departamenti}
                onChange={handleDepartamenti}
              >
                <option value="">
                  {departamenti == null && formData != null
                    ? formData.departamenti.emri
                    : departamenti}
                </option>
                {departamentet.map((departamenti) => (
                  <option key={departamenti.id} value={departamenti.id}>
                    {departamenti.emri}
                  </option>
                ))}
              </select>
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
            Edit Semester
          </button>
        </form>
      </div>
    </>
  );
};
