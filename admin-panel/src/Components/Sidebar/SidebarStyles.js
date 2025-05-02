// src/components/Sidebar/Sidebar.styled.js
import { styled } from "@mui/material/styles";
import { Box, List, ListItemButton, ListItemIcon } from "@mui/material";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  height: "100%",
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
}));

export const SidebarList = styled(List)(({ theme }) => ({
  padding: 0,
}));

export const SidebarItemButton = styled(ListItemButton)(
  ({ theme, isActive }) => ({
    backgroundColor: isActive ? theme.palette.action.selected : "transparent",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    borderRadius: theme.shape.borderRadius * 1.5,
    paddingY: theme.spacing(1),
    paddingX: theme.spacing(2),
    marginY: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  })
);

export const SidebarListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "unset",
  color: theme.palette.text.primary,
}));
