import React from 'react';
import '../output.css';
import { Avatar, Dropdown, Navbar, } from 'flowbite-react';
import {Link} from "react-router-dom";
import ProfilePicture from '../assets/IMG_1884.jpeg';



function navBar() {
  return (
    <Navbar fluid>
    <Navbar.Brand href="#">
      <img src="./assets/react.svg" className="mr-3 h-6 sm:h-9" alt="" />
      <Link to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-slate-300">University</span>
      </Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={ProfilePicture} rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Abdusamed Beqiri</span>
          <span className="block truncate text-sm font-bold mt-1">BeqiriAbdusamed@gmail.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Link to="/LogIn">
          <Dropdown.Item as="div">Sign out</Dropdown.Item>
        </Link>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link as="div">Home</Navbar.Link>
          </Link>
          <Link to="/signup">
            <Navbar.Link as="div">sign up</Navbar.Link>
          </Link>
          <Navbar.Link >SMIS</Navbar.Link>
          <Navbar.Link >Contact</Navbar.Link>
    </Navbar.Collapse>

  </Navbar>
  )
}

export default navBar