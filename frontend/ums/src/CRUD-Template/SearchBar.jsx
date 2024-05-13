import axios from "axios"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function SearchBar(){

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const search = async (category) => {
    try {
      const fetchCategory = await axios.get(``); 
    }catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <label htmlFor="simple-search" className="sr-only">
        Kërko
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="text-sm rounded-lg block w-full pl-10 p-2"
          style={{background: colors.primary[400]}}
          placeholder="Search"
          required=""
        />
      </div>
    </>
  )
}