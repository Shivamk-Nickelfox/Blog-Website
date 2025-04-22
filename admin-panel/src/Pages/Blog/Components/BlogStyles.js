import { styled } from "@mui/material/styles";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";

export const EditorContainer = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "auto",
  marginTop: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

export const BlogTitleInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ToolbarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const EditorContentBox = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 4,
  minHeight: "300px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const PublishButton = styled(Button)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));
