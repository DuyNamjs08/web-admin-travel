import React from "react";
import { Outlet } from "react-router-dom";

function Doctor(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Doctor;
