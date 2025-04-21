// src/components/Posts/postsStyles.js
import { styled } from "@mui/material/styles";
import { Box, Button, TableHead } from "@mui/material";

export const RootBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#f3f4f6",
}));
