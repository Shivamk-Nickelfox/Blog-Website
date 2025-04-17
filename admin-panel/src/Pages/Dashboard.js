import { Box, Typography, Paper } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const PostsCard = ({ count }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: 200,
        backgroundColor: "#f5f3ff",
        borderRadius: 2,
      }}
    >
      <ArticleIcon fontSize="large" sx={{ color: "#6a1b9a" }} />
      <Box>
        <Typography variant="subtitle2" fontWeight="bold">
          Posts
        </Typography>
        <Typography variant="h6">{count}</Typography>
      </Box>
    </Paper>
  );
};

export default PostsCard;
