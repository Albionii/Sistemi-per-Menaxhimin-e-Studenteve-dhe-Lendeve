
"use client";

import { Sidebar } from "flowbite-react";
import { Avat } from "./Avatar";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { FaFile } from "react-icons/fa";
import { BiSolidFilePlus } from "react-icons/bi";
import { HiMiniBookOpen } from "react-icons/hi2";
import { ImFolderOpen } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Provimet from "./Provimi/Provimet";
import { Link } from "react-router-dom";



export default function Nav() {
  const navigate = useNavigate();
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="h-screen fixed">
      <Sidebar.Logo href="#" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQA7rSroxsdTTefwdaVB0lK7HFszwnQAeAvlX1SNdGw&s" imgAlt="Flowbite logo">
        UBT
      </Sidebar.Logo>
      <Avat />
      <Sidebar.Items className="mt-3">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiMiniBookOpen} label="Ligjeratat">
            <Sidebar.Item href="#">Semestri 1</Sidebar.Item>
            <Sidebar.Item href="#">Semestri 2</Sidebar.Item>
            <Sidebar.Item href="#">Semestri 3</Sidebar.Item>
            <Sidebar.Item href="#">Semestri 4</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={FaFile} label="Provimet">
            <Sidebar.Item onClick={() => navigate('/provimet')} href="" icon={BiSolidFilePlus}>Paraqit Provimet</Sidebar.Item>
            <Sidebar.Item onClick={() => navigate("/provimet/paraqitura")} href="" icon={ImFolderOpen}>Provimet e Paraqitura</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item href="#" icon={HiViewBoards}>
            Isa + Hasha = Esat Pasha
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>

          <Link to="LogIn">
            <Sidebar.Item icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
          </Link>
          <Link to="signup">
          <Sidebar.Item href="signup" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
