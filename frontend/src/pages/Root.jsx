import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "../../components/Footer/Footer";
import { ScrollRestoration } from "react-router-dom";


const Root = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <ScrollRestoration/>
    </>
  );
};

export default Root;