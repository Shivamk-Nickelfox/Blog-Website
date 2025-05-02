// src/components/Layout/Layout.jsx
import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
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
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
