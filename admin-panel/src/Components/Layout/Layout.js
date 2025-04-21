import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
