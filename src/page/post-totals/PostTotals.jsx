import React from "react";
import { Outlet } from "react-router-dom";

function PostTotals(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PostTotals;
