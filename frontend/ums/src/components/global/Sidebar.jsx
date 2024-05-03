import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.gray[100],
      }}
      onClick={() => setSelected(title)}
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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

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

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
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
      }}
    >
      <ProSidebar id="sidebar" collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.gray[100],
            }}
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
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`data:image/jpeg;base64,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`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Albin Kurti
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Prime Minister
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <SubMenu
              style={{
                color: colors.gray[100],
              }}
              iconShape="square"
              icon={<SchoolOutlinedIcon />}
              title={"ManageTeam"}
            >
              <SubItem
                title="Menaxho Profesoret"
                to="/profesoret"
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Menaxho Studentet"
                to="/team"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Lectures"
              to="/ligjeratat"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
