import React from "react";
import { Outlet } from "react-router-dom";

function TotalUser(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default TotalUser;
