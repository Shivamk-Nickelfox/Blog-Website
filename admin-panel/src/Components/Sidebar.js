import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: "#fff",
        borderRight: "1px solid #ddd",
        height: "100%",
        pt: 2,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor: "#e0bbff",

              borderRadius: "12px",
              paddingY: 1,
              paddingX: 2,
              marginY: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon sx={{ minWidth: "unset", color: "black" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor: "#e0bbff",

              borderRadius: "12px",
              paddingY: 1,
              paddingX: 2,
              marginY: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            component={Link}
            to="/posts"
          >
            <ListItemIcon sx={{ minWidth: "unset", color: "black" }}>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Posts"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
