
"use client";

import { Sidebar } from "flowbite-react";
import { Avat } from "./Avatar";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { HiMiniBookOpen } from "react-icons/hi2";

export default function Nav() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="h-screen">
      <Sidebar.Logo href="#" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQA7rSroxsdTTefwdaVB0lK7HFszwnQAeAvlX1SNdGw&s" imgAlt="Flowbite logo">
        UBT
      </Sidebar.Logo>
      <Avat/>
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
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Isa + Hasha = Esat Pasha
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          
          
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
