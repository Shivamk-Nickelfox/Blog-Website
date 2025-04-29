import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const PostsCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User from local storage:", user);
        if (!user) {
          console.error("User not found in local storage");
          return;
        }
        // Filter posts by authorId if needed
        const filteredPosts = querySnapshot.docs.filter(
          (doc) => doc.data().authorId === user.uid
        );
        const count = filteredPosts.length;
        const posts = filteredPosts.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
        console.log("Filtered posts:", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "2rem" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          justifyContent: "center",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {post.thumbnailURL && (
                <Box
                  component="img"
                  src={post.thumbnailURL}
                  alt="Blog thumbnail"
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />
              )}
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(0, 100) + "...",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PostsCard;
