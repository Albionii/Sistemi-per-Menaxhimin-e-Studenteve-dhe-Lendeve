import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Header from "../Header"
import LiveClock from "../LiveClock";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Cookies from 'js-cookie';
import Sidebar from "./Sidebar";
import ScreenSideBar from "./ScreenSideBar";

const Topbar = ({user}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const changeMode = () => {
    colorMode.toggleColorMode();
    Cookies.set('theme', theme.palette.mode === "dark"? "light" : "dark", { expires: 1000 });

  }

  return (
    <Box display="flex" justifyContent="space-between" pt={2} pr={2} pl={2} pb={1}>
      {/* SEARCH BAR */}
      <ScreenSideBar user={user} isSmallScreen={true}/>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        pl={4}
        pr={5}
        pt={1}
        pb={1}
        borderRadius="3px"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <AccessTimeIcon sx={{mr: 1}}/>
        <LiveClock></LiveClock>
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={changeMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <Link to="/Profili">
          <IconButton >
            <PersonOutlinedIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Topbar;
