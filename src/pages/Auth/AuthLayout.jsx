import React from "react";
import { Outlet } from "react-router";
import bgImage from "/background.png";

function AuthLayout() {
  return (
    <div className={`h-screen flex justify-center items-center bg-[url(${bgImage})] bg-center bg-cover`}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;