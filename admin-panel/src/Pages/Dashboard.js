import { Box, Typography, Paper } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const PostsCard = () => {
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const count = querySnapshot.size;
        setPostsCount(count);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
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
        <Typography variant="h6">{postsCount}</Typography>
      </Box>
    </Paper>
  );
};

export default PostsCard;
