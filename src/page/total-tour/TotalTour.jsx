import React from "react";
import { Outlet } from "react-router-dom";

function TotalTour(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default TotalTour;
