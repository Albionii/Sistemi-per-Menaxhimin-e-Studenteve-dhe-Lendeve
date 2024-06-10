import { useState, useEffect, Suspense } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "./Sidebar.css";
import { Avatar } from "@mui/material";

const Item = ({ title, to, icon, selected, setSelected, handleCollapse }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.gray[100],
      }}
      onClick={() => {
        setSelected(title);
        handleCollapse();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SubItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.gray[100],
        padding: "7px 0",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ user, isMobile, isSmallScreen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const role = user.role;
  const formattedRole =
    role && role.includes("_")
      ? role
          .split("_")[1]
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())
      : "";

  useEffect(() => {
    const handleResize = () => {
      const sidebarWidth = document.getElementById("sidebar").offsetWidth;
      const screenWidth = window.innerWidth;
      if (sidebarWidth >= screenWidth / 6) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(true);
  };

  return (
    <Box
      className={`box ${isCollapsed ? "collapsed" : ""}`}
      // style={isMobile&&{display:"none"}}
      sx={{
        "& .pro-sidebar-inner": {
          background: isSmallScreen? (isCollapsed?`${colors.primary[500]} !important`:`${colors.primary[400]} !important`):`${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        display:isMobile?"none":"inline-block"
      }}
    >
      <ProSidebar
        id="sidebar"
        collapsed={isCollapsed}
        className={`prosidebar ${isCollapsed ? "collapsed" : ""}`}
        style={{display: isMobile ?"none":"inline-block"}}
      >
        <Menu className={`menu ${isCollapsed ? "collapsed" : ""}`}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ color: colors.gray[100] }}
            className="menuitem"
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.gray[100]}>
                  UBT
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                  alt={user.firstName}
                  src={`http://localhost:8080/profile-pictures/${
                    user.profile
                  }?${new Date().getTime()}`}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {formattedRole}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {role === "ROLE_STUDENT" && (
              <Item
                title="Transkripta"
                to="/transkripta"
                icon={<SchoolOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                handleCollapse={handleCollapse}
              />
            )}
            {/* {role === "ROLE_STUDENT" && }*/}

            <Item
              title="Departmentet"
              to="/department"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />
            {role === "ROLE_STUDENT" && (
              <Item
                title="Enrolled"
                to="/enrolled"
                icon={<AddBoxOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                handleCollapse={handleCollapse}
              />
            )}

            <Item
              title="Profili"
              to="/profili"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {role === "ROLE_STUDENT" && (
              <Item
                title="Regjistro Semestrin"
                to="/regjistroSemestrin"
                icon={<LibraryBooksOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                handleCollapse={handleCollapse}
              />
            )}
            {role === "ROLE_STUDENT" && (
              <Item
                title="Regjistro Grupin"
                to="/regjistroGrupin"
                icon={<GroupsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                handleCollapse={handleCollapse}
              />
            )}
            <Item
              title="CRUD's"
              to="/cruds"
              icon={<EditCalendarOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            {role === "ROLE_STUDENT" && (
              <Item
                title="Paraqit Provimet"
                to="/provimet"
                icon={<QuizOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                handleCollapse={handleCollapse}
              />
            )}
            {/* <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleCollapse={handleCollapse}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    // </Box>
  );
};

export default Sidebar;
