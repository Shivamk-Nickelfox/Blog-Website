import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  
} from "@mui/material";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "200px",
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
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
    backgroundColor: isActive ? "#f0f0f0" : "transparent",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    borderRadius: "12px",
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
  color: "black",
}));
