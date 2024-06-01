import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { getAllDepartamenti } from "../../APIRequests";
export const LajmiAddButton = ({
  setConfirmExit,
  renderBot,
  formDataJson,
  API,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlDepartment, errorDepartment] = getAllDepartamenti();

  const [urlCreate, errorCreate] = API.create();
  const [formData, setFormData] = useState(formDataJson);

  const [mesazhi, setMesazhi] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentat, setDepartmentet] = useState([]);

  useEffect(() => {
    getDepartmentet();
  }, []);

  const getDepartmentet = async () => {
    try {
      const fetchDepartmentet = await axios.get(urlDepartment);
      setDepartmentet(fetchDepartmentet.data);
    } catch (error) {
      API.errorAlert(errorDepartment);
      console.log(error);
    }
  };

  const handleClick = () => {
    setConfirmExit();
  };

  const handleMesazhi = (e) => {
    setMesazhi(e.target.value);
    setFormData({
      ...formData,
      mesazhi: e.target.value,
    });
  };

  const handleChangedDepartmentet = (e) => {
    setDepartment(e.target.value);
    setFormData({
      ...formData,
      departamenti: departmentat.find(
        (department) => department.id == e.target.value
      ),
    });
  };

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
        className="relativew-full rounded-lg shadow"
        style={{ background: colors.primary[500] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">Krijo Lajmin</h3>
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
          <div className="grid gap-4 mb-4 grid-cols-1">
            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="mesazhi"
                className="block text-left mb-2 text-sm font-medium"
              >
                Lajmi
              </label>
              <textarea
                id="mesazhi"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400], height: "150px" }} // Adjust the height as needed
                value={mesazhi}
                onInput={handleMesazhi}
                placeholder="Lajmi"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="departmenti"
                className="block text-left mb-2 text-sm font-medium"
              >
                Departmenti
              </label>
              <select
                id="departmenti"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={department}
                onChange={handleChangedDepartmentet}
              >
                <option value="">Selekto Departmentin</option>
                {departmentat.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.emri}
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
            Add Lajmi
          </button>
        </form>
      </div>
    </>
  );
};
export const LajmiEditButton = ({
  setConfirmExit,
  item,
  onLigjerataEdit,
  API,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [urlDepartment, errorDepartment] = getAllDepartamenti();

  const [urlUpdate, errorUpdate] = API.update();
  const [formData, setFormData] = useState(item);

  const [mesazhi, setMesazhi] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentet, setDepartmentet] = useState([]);

  useEffect(() => {
    getDepartmentet();
  }, []);

  const getDepartmentet = async () => {
    try {
      const fetchDepartmentet = await axios.get(urlDepartment);
      setDepartmentet(fetchDepartmentet.data);
    } catch (error) {
      API.errorAlert(errorDepartment);
      console.log(error);
    }
  };

  const handleMesazhi = (e) => {
    setMesazhi(e.target.value);
    setFormData({
      ...formData,
      mesazhi: e.target.value,
    });
  };

  const handleDepartmentet = (e) => {
    setDepartment(e.target.value);
    setFormData({
      ...formData,
      departamenti: e.target.value,
    });
  };

  const handleClick = () => {
    setConfirmExit();
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
        className="relativew-full rounded-lg shadow"
        style={{ background: colors.primary[500] }}
      >
        <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold">Edito Lajmin</h3>
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
          <div className="grid gap-4 mb-4 grid-cols-1">
            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Lajmi
              </label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={
                  mesazhi == "" && formData != null ? formData.mesazhi : mesazhi
                }
                onInput={handleMesazhi}
                placeholder="Emri Fakultetit"
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-left mb-2 text-sm font-medium"
              >
                Departmenti
              </label>
              <select
                className="border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                style={{ background: colors.primary[400] }}
                value={department}
                onChange={handleDepartmentet}
              >
                <option value="">
                  {formData != null ? formData.departamenti.emri : ""}
                </option>
                {departmentet.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.emri}
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
            Edit Lajmin
          </button>
        </form>
      </div>
    </>
  );
};