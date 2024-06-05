import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Box sx={{}}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
