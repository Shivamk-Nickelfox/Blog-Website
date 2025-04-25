import React from "react";
import { useLocation, Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import {
  SidebarContainer,
  SidebarList,
  SidebarItemButton,  
  SidebarListItemIcon,
} from "./SidebarStyles";
import { ListItemText } from "@mui/material";

const Sidebar = () => {
  const location = useLocation();
  const isDashboardActive = location.pathname === "/dashboard";
  const isActive = location.pathname.startsWith("/posts");

  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarItemButton
          isActive={isDashboardActive}  
          component={Link}
          to="/dashboard"
        >
          <SidebarListItemIcon>
            <DashboardIcon />
          </SidebarListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          />
        </SidebarItemButton>

        <SidebarItemButton
          isActive={isActive}  
          component={Link}
          to="/posts"
        >
          <SidebarListItemIcon>
            <ArticleIcon />
          </SidebarListItemIcon>
          <ListItemText
            primary="Posts"
            primaryTypographyProps={{
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          />
        </SidebarItemButton>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
