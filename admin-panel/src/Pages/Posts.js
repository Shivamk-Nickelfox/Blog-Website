import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostSlug, setNewPostSlug] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = () => {    
    navigate("/blog");
  }
  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleEdit = () => {
    alert(`Edit post with ID: ${selectedPostId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter((post) => post.id !== selectedPostId);
    setPosts(updatedPosts);
    handleMenuClose();
  };

  const handleAdd = () => {
    if (newPostTitle && newPostSlug) {
      const newPost = {
        id: Date.now(), // Unique ID
        title: newPostTitle,
        slug: newPostSlug,
      };
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostSlug("");
      setIsAdding(false); // Close the form
    }
  };

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      {isAdding && (
        <Box mb={2}>
          <TextField
            label="Title"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Slug"
            fullWidth
            value={newPostSlug}
            onChange={(e) => setNewPostSlug(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAdd}>
            Save Post
          </Button>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No posts available.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, post.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedPostId === post.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Posts;
